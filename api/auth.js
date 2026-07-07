import connectDB from '../lib/db.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'swapstyle-dev-secret-key';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    await connectDB();
  } catch (e) {
    return res.status(500).json({ error: 'Database connection failed. Set MONGODB_URI in Vercel env vars.' });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { action, email, password, name, location } = req.body;

  try {
    if (action === 'register') {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ error: 'Email already registered' });
      const user = await User.create({ name, email, password, location });
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
      const { password: _, ...safeUser } = user.toObject();
      return res.status(201).json({ token, user: { ...safeUser, id: user._id } });
    }

    if (action === 'login') {
      const user = await User.findOne({ email, password });
      if (!user) return res.status(401).json({ error: 'Invalid email or password' });
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
      const { password: _, ...safeUser } = user.toObject();
      return res.status(200).json({ token, user: { ...safeUser, id: user._id } });
    }

    return res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
