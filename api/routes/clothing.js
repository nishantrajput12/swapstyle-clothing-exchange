import { Router } from 'express';
import jwt from 'jsonwebtoken';
import sql from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

router.get('/filters/options', async (req, res) => {
  try {
    const types = await sql`SELECT DISTINCT type FROM clothing_items WHERE status = 'available' ORDER BY type`;
    const brands = await sql`SELECT DISTINCT brand FROM clothing_items WHERE status = 'available' ORDER BY brand`;
    const sizes = await sql`SELECT DISTINCT size FROM clothing_items WHERE status = 'available' ORDER BY size`;
    const conditions = await sql`SELECT DISTINCT condition FROM clothing_items WHERE status = 'available' ORDER BY condition`;
    const locations = await sql`SELECT DISTINCT location FROM clothing_items WHERE status = 'available' ORDER BY location`;
    res.json({ types: types.map(t => t.type), brands: brands.map(b => b.brand), sizes: sizes.map(s => s.size), conditions: conditions.map(c => c.condition), locations: locations.map(l => l.location) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { type, brand, size, condition, location, min_value, max_value, search, user_id } = req.query;

    let query = `SELECT ci.*, u.username as owner_username, u.location as owner_location FROM clothing_items ci JOIN users u ON ci.user_id = u.id WHERE 1=1`;
    const params = [];
    let pc = 0;

    if (type) { pc++; query += ` AND ci.type = $${pc}`; params.push(type); }
    if (brand) { pc++; query += ` AND ci.brand = $${pc}`; params.push(brand); }
    if (size) { pc++; query += ` AND ci.size = $${pc}`; params.push(size); }
    if (condition) { pc++; query += ` AND ci.condition = $${pc}`; params.push(condition); }
    if (location) { pc++; query += ` AND ci.location = $${pc}`; params.push(location); }
    if (min_value) { pc++; query += ` AND ci.estimated_value >= $${pc}`; params.push(parseInt(min_value)); }
    if (max_value) { pc++; query += ` AND ci.estimated_value <= $${pc}`; params.push(parseInt(max_value)); }
    if (search) { pc++; query += ` AND (ci.title ILIKE $${pc} OR ci.description ILIKE $${pc} OR ci.brand ILIKE $${pc})`; params.push(`%${search}%`); }

    if (user_id) {
      pc++;
      if (user_id === 'me') {
        const authHeader = req.headers.authorization || '';
        const tok = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (tok) {
          try {
            const decoded = jwt.verify(tok, process.env.JWT_SECRET || 'clothing-swap-secret-2024');
            query += ` AND ci.user_id = $${pc}`;
            params.push(decoded.id);
          } catch (e) {
            return res.status(401).json({ error: 'Invalid token' });
          }
        } else {
          return res.json([]);
        }
      } else {
        query += ` AND ci.user_id = $${pc}`;
        params.push(parseInt(user_id));
      }
    } else {
      pc++; query += ` AND ci.status = 'available'`;
    }

    query += ` ORDER BY ci.created_at DESC`;
    const items = params.length > 0 ? await sql.unsafe(query, params) : await sql.unsafe(query);
    res.json(items);
  } catch (e) {
    console.error('Error fetching clothing:', e);
    res.status(500).json({ error: 'Failed to fetch clothing items' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const items = await sql`
      SELECT ci.*, u.username as owner_username, u.location as owner_location, u.id as owner_id, u.phone as owner_phone
      FROM clothing_items ci JOIN users u ON ci.user_id = u.id WHERE ci.id = ${id}
    `;
    if (!items[0]) return res.status(404).json({ error: 'Item not found' });
    res.json(items[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch clothing item' });
  }
});

router.post('/', authRequired, async (req, res) => {
  try {
    const { title, type, brand, size, condition, description, estimated_value, location, image_url } = req.body;
    if (!title || !type || !brand || !size || !condition || !estimated_value || !location) {
      return res.status(400).json({ error: 'title, type, brand, size, condition, estimated_value, and location are required' });
    }
    const result = await sql`
      INSERT INTO clothing_items (user_id, title, type, brand, size, condition, description, estimated_value, location, image_url)
      VALUES (${req.user.id}, ${title}, ${type}, ${brand}, ${size}, ${condition}, ${description || null}, ${estimated_value}, ${location}, ${image_url || null})
      RETURNING *
    `;
    res.status(201).json(result[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create clothing item' });
  }
});

router.put('/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, brand, size, condition, description, estimated_value, location, image_url, status } = req.body;
    const owned = await sql`SELECT * FROM clothing_items WHERE id = ${id} AND user_id = ${req.user.id}`;
    if (!owned[0]) return res.status(404).json({ error: 'Item not found or unauthorized' });

    const result = await sql`
      UPDATE clothing_items SET
        title = COALESCE(${title}, title), type = COALESCE(${type}, type), brand = COALESCE(${brand}, brand),
        size = COALESCE(${size}, size), condition = COALESCE(${condition}, condition),
        description = COALESCE(${description}, description), estimated_value = COALESCE(${estimated_value}, estimated_value),
        location = COALESCE(${location}, location), image_url = COALESCE(${image_url}, image_url),
        status = COALESCE(${status}, status), updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;
    res.json(result[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to update clothing item' });
  }
});

router.delete('/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const owned = await sql`SELECT * FROM clothing_items WHERE id = ${id} AND user_id = ${req.user.id}`;
    if (!owned[0]) return res.status(404).json({ error: 'Item not found or unauthorized' });
    await sql`DELETE FROM clothing_items WHERE id = ${id}`;
    res.json({ message: 'Item deleted successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to delete clothing item' });
  }
});

export default router;
