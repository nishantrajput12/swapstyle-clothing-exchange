import { Router } from 'express';
import sql from '../db.js';
import { authRequired, adminRequired } from '../middleware/auth.js';

const router = Router();

router.get('/users', adminRequired, async (req, res) => {
  try {
    const users = await sql`SELECT id, username, email, full_name, location, is_admin, created_at FROM users ORDER BY created_at DESC`;
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/listings', adminRequired, async (req, res) => {
  try {
    const items = await sql`
      SELECT ci.*, u.username as owner_username FROM clothing_items ci JOIN users u ON ci.user_id = u.id ORDER BY ci.created_at DESC
    `;
    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

router.get('/swaps', adminRequired, async (req, res) => {
  try {
    const swaps = await sql`
      SELECT sr.*, sender.username as sender_username, receiver.username as receiver_username,
        si.title as sender_item_title, ri.title as receiver_item_title
      FROM swap_requests sr
      JOIN users sender ON sr.sender_id = sender.id
      JOIN users receiver ON sr.receiver_id = receiver.id
      JOIN clothing_items si ON sr.sender_item_id = si.id
      JOIN clothing_items ri ON sr.receiver_item_id = ri.id
      ORDER BY sr.created_at DESC
    `;
    res.json(swaps);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch swaps' });
  }
});

router.get('/stats', adminRequired, async (req, res) => {
  try {
    const users = await sql`SELECT COUNT(*)::int as count FROM users`;
    const listings = await sql`SELECT COUNT(*)::int as count FROM clothing_items`;
    const swaps = await sql`SELECT COUNT(*)::int as count FROM swap_requests`;
    const completed = await sql`SELECT COUNT(*)::int as count FROM swap_requests WHERE status = 'completed'`;
    res.json({ users: users[0].count, listings: listings[0].count, swaps: swaps[0].count, completed: completed[0].count });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.delete('/listings/:id', adminRequired, async (req, res) => {
  try {
    const { id } = req.params;
    await sql`DELETE FROM clothing_items WHERE id = ${id}`;
    res.json({ message: 'Listing deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});

router.put('/listings/:id/status', adminRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await sql`UPDATE clothing_items SET status = ${status}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
    res.json({ message: 'Status updated' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

export default router;
