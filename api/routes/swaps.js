import { Router } from 'express';
import sql from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.get('/stats/summary', authRequired, async (req, res) => {
  try {
    const sent = await sql`SELECT COUNT(*)::int as count FROM swap_requests WHERE sender_id = ${req.user.id}`;
    const received = await sql`SELECT COUNT(*)::int as count FROM swap_requests WHERE receiver_id = ${req.user.id}`;
    const accepted = await sql`SELECT COUNT(*)::int as count FROM swap_requests WHERE (sender_id = ${req.user.id} OR receiver_id = ${req.user.id}) AND status = 'accepted'`;
    const completed = await sql`SELECT COUNT(*)::int as count FROM swap_requests WHERE (sender_id = ${req.user.id} OR receiver_id = ${req.user.id}) AND status = 'completed'`;
    res.json({ sent: sent[0].count, received: received[0].count, accepted: accepted[0].count, completed: completed[0].count });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch swap statistics' });
  }
});

router.get('/', authRequired, async (req, res) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT sr.*, sender.username as sender_username, sender.location as sender_location,
        receiver.username as receiver_username, receiver.location as receiver_location,
        sender_item.title as sender_item_title, sender_item.image_url as sender_item_image, sender_item.estimated_value as sender_item_value,
        receiver_item.title as receiver_item_title, receiver_item.image_url as receiver_item_image, receiver_item.estimated_value as receiver_item_value
      FROM swap_requests sr
      JOIN users sender ON sr.sender_id = sender.id
      JOIN users receiver ON sr.receiver_id = receiver.id
      JOIN clothing_items sender_item ON sr.sender_item_id = sender_item.id
      JOIN clothing_items receiver_item ON sr.receiver_item_id = receiver_item.id
      WHERE sr.sender_id = ${req.user.id} OR sr.receiver_id = ${req.user.id}
    `;
    if (status) query += ` AND sr.status = '${status}'`;
    query += ` ORDER BY sr.created_at DESC`;
    const requests = await sql.unsafe(query);
    res.json(requests);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch swap requests' });
  }
});

router.get('/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await sql`
      SELECT sr.*, sender.username as sender_username, sender.location as sender_location,
        receiver.username as receiver_username, receiver.location as receiver_location,
        sender_item.title as sender_item_title, sender_item.image_url as sender_item_image, sender_item.estimated_value as sender_item_value,
        sender_item.type as sender_item_type, sender_item.brand as sender_item_brand, sender_item.size as sender_item_size, sender_item.condition as sender_item_condition,
        receiver_item.title as receiver_item_title, receiver_item.image_url as receiver_item_image, receiver_item.estimated_value as receiver_item_value,
        receiver_item.type as receiver_item_type, receiver_item.brand as receiver_item_brand, receiver_item.size as receiver_item_size, receiver_item.condition as receiver_item_condition
      FROM swap_requests sr
      JOIN users sender ON sr.sender_id = sender.id
      JOIN users receiver ON sr.receiver_id = receiver.id
      JOIN clothing_items sender_item ON sr.sender_item_id = sender_item.id
      JOIN clothing_items receiver_item ON sr.receiver_item_id = receiver_item.id
      WHERE sr.id = ${id}
    `;
    if (!rows[0]) return res.status(404).json({ error: 'Swap request not found' });
    if (rows[0].sender_id !== req.user.id && rows[0].receiver_id !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch swap request' });
  }
});

router.post('/', authRequired, async (req, res) => {
  try {
    const { receiver_id, sender_item_id, receiver_item_id, message } = req.body;
    if (!receiver_id || !sender_item_id || !receiver_item_id) {
      return res.status(400).json({ error: 'receiver_id, sender_item_id, and receiver_item_id are required' });
    }

    const ri = await sql`SELECT * FROM clothing_items WHERE id = ${receiver_item_id} AND user_id = ${receiver_id}`;
    if (!ri[0]) return res.status(400).json({ error: 'Receiver item does not belong to the specified user' });

    const si = await sql`SELECT * FROM clothing_items WHERE id = ${sender_item_id} AND user_id = ${req.user.id}`;
    if (!si[0]) return res.status(400).json({ error: 'Sender item does not belong to you' });

    if (si[0].status !== 'available' || ri[0].status !== 'available') return res.status(400).json({ error: 'One or both items are not available' });

    const dup = await sql`
      SELECT id FROM swap_requests WHERE sender_id = ${req.user.id} AND receiver_id = ${receiver_id} AND sender_item_id = ${sender_item_id} AND receiver_item_id = ${receiver_item_id} AND status = 'pending'
    `;
    if (dup.length > 0) return res.status(400).json({ error: 'A pending swap request already exists for these items' });

    const result = await sql`
      INSERT INTO swap_requests (sender_id, receiver_id, sender_item_id, receiver_item_id, message)
      VALUES (${req.user.id}, ${receiver_id}, ${sender_item_id}, ${receiver_item_id}, ${message || null})
      RETURNING *
    `;
    res.status(201).json(result[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create swap request' });
  }
});

router.put('/:id/status', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['accepted', 'rejected', 'completed'].includes(status)) return res.status(400).json({ error: 'Invalid status' });

    const rows = await sql`SELECT * FROM swap_requests WHERE id = ${id} AND receiver_id = ${req.user.id}`;
    if (!rows[0]) return res.status(404).json({ error: 'Swap request not found or unauthorized' });

    const result = await sql`UPDATE swap_requests SET status = ${status}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id} RETURNING *`;

    if (status === 'accepted' || status === 'completed') {
      const r = result[0];
      await sql`UPDATE clothing_items SET status = 'swapped', updated_at = CURRENT_TIMESTAMP WHERE id = ${r.sender_item_id} OR id = ${r.receiver_item_id}`;
    }

    res.json(result[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to update swap request' });
  }
});

export default router;
