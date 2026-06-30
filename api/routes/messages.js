import { Router } from 'express';
import sql from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.get('/:swapId', authRequired, async (req, res) => {
  try {
    const { swapId } = req.params;
    const msgs = await sql`
      SELECT m.*, u.username as sender_username FROM messages m JOIN users u ON m.sender_id = u.id
      WHERE m.swap_id = ${swapId} ORDER BY m.created_at ASC
    `;
    res.json(msgs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.post('/:swapId', authRequired, async (req, res) => {
  try {
    const { swapId } = req.params;
    const { message } = req.body;
    if (!message || !message.trim()) return res.status(400).json({ error: 'Message is required' });

    const swap = await sql`SELECT * FROM swap_requests WHERE id = ${swapId}`;
    if (!swap[0]) return res.status(404).json({ error: 'Swap not found' });
    if (swap[0].sender_id !== req.user.id && swap[0].receiver_id !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    const result = await sql`
      INSERT INTO messages (swap_id, sender_id, message) VALUES (${swapId}, ${req.user.id}, ${message}) RETURNING *
    `;
    res.status(201).json(result[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
