import { Router } from 'express';
import sql from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.get('/nearby', authRequired, async (req, res) => {
  try {
    const users = await sql`SELECT location FROM users WHERE id = ${req.user.id}`;
    if (!users[0] || !users[0].location) return res.json([]);
    const loc = users[0].location;
    const items = await sql`
      SELECT ci.*, u.username as owner_username, u.location as owner_location
      FROM clothing_items ci JOIN users u ON ci.user_id = u.id
      WHERE ci.status = 'available' AND u.location = ${loc} AND ci.user_id != ${req.user.id}
      ORDER BY ci.created_at DESC LIMIT 20
    `;
    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch nearby items' });
  }
});

router.get('/suggestions', authRequired, async (req, res) => {
  try {
    const myItems = await sql`SELECT type, size, condition FROM clothing_items WHERE user_id = ${req.user.id} AND status = 'available'`;
    if (myItems.length === 0) return res.json([]);
    const types = [...new Set(myItems.map(i => i.type))];
    const sizes = [...new Set(myItems.map(i => i.size))];
    const suggestions = await sql`
      SELECT ci.*, u.username as owner_username, u.location as owner_location
      FROM clothing_items ci JOIN users u ON ci.user_id = u.id
      WHERE ci.status = 'available' AND ci.user_id != ${req.user.id} AND (ci.type = ANY(${types}) OR ci.size = ANY(${sizes}))
      ORDER BY ci.created_at DESC LIMIT 10
    `;
    res.json(suggestions);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

export default router;
