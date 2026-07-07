import { Router } from 'express';
import sql from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.get('/:swapId', authRequired, async (req, res) => {
  try {
    const { swapId } = req.params;
    const swapIdInt = parseInt(swapId);
    
    if (isNaN(swapIdInt)) {
      return res.status(400).json({ error: 'Invalid swap ID' });
    }
    
    // Verify user has access to this swap
    const swapResult = await sql`SELECT * FROM swap_requests WHERE id = ${swapIdInt}`;
    if (!swapResult || swapResult.length === 0) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    
    const swap = swapResult[0];
    if (swap.sender_id !== req.user.id && swap.receiver_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const messages = await sql`
      SELECT m.*, u.username as sender_username 
      FROM messages m 
      JOIN users u ON m.sender_id = u.id
      WHERE m.swap_id = ${swapIdInt} 
      ORDER BY m.created_at ASC
    `;
    
    res.json(messages || []);
  } catch (e) {
    console.error('Messages GET error:', e);
    res.status(500).json({ error: 'Failed to fetch messages: ' + e.message });
  }
});

router.post('/:swapId', authRequired, async (req, res) => {
  try {
    const { swapId } = req.params;
    const swapIdInt = parseInt(swapId);
    const { message } = req.body;
    
    if (isNaN(swapIdInt)) {
      return res.status(400).json({ error: 'Invalid swap ID' });
    }
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Verify swap exists and user has access
    const swapResult = await sql`SELECT * FROM swap_requests WHERE id = ${swapIdInt}`;
    if (!swapResult || swapResult.length === 0) {
      return res.status(404).json({ error: 'Swap not found' });
    }
    
    const swap = swapResult[0];
    if (swap.sender_id !== req.user.id && swap.receiver_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const result = await sql`
      INSERT INTO messages (swap_id, sender_id, message) 
      VALUES (${swapIdInt}, ${req.user.id}, ${message}) 
      RETURNING *
    `;
    
    if (!result || result.length === 0) {
      return res.status(500).json({ error: 'Failed to create message' });
    }
    
    res.status(201).json(result[0]);
  } catch (e) {
    console.error('Messages POST error:', e);
    res.status(500).json({ error: 'Failed to send message: ' + e.message });
  }
});

export default router;
