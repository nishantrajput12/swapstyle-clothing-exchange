import { Router } from 'express';
import bcrypt from 'bcryptjs';
import sql from '../db.js';
import { signToken } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, full_name, location, phone, bio } = req.body;
    if (!username || !email || !password || !full_name || !location) {
      return res.status(400).json({ error: 'username, email, password, full_name, and location are required' });
    }

    const existing = await sql`
      SELECT id FROM users WHERE username = ${username} OR email = ${email}
    `;
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const result = await sql`
      INSERT INTO users (username, email, password_hash, full_name, location, phone, bio)
      VALUES (${username}, ${email}, ${hash}, ${full_name}, ${location}, ${phone || null}, ${bio || null})
      RETURNING id, username, email, full_name, location, phone, bio, created_at
    `;

    const user = result[0];
    const token = signToken({ id: user.id, username: user.username, is_admin: false });

    res.status(201).json({
      token,
      user: { id: user.id, username: user.username, email: user.email, full_name: user.full_name, location: user.location, phone: user.phone, bio: user.bio }
    });
  } catch (e) {
    console.error('Register error:', e);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password required' });
    }

    const users = await sql`
      SELECT * FROM users WHERE username = ${username} OR email = ${username}
    `;
    const user = users[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken({ id: user.id, username: user.username, is_admin: user.is_admin });

    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, full_name: user.full_name, location: user.location, phone: user.phone, bio: user.bio }
    });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const jwt = await import('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clothing-swap-secret-2024');

    const users = await sql`
      SELECT id, username, email, full_name, location, phone, bio, profile_image, is_admin, created_at
      FROM users WHERE id = ${decoded.id}
    `;
    if (!users[0]) return res.status(404).json({ error: 'User not found' });

    res.json(users[0]);
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
