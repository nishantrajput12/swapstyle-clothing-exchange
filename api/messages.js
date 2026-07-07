import connectDB from '../lib/db.js';
import Message from '../models/Message.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connectDB();
  } catch (e) {
    return res.status(500).json({ error: 'Database connection failed' });
  }

  try {
    if (req.method === 'GET') {
      const { user1, user2 } = req.query;
      const messages = await Message.find({
        $or: [
          { senderId: user1, receiverId: user2 },
          { senderId: user2, receiverId: user1 }
        ]
      }).sort({ timestamp: 1 });
      return res.status(200).json(messages.map(m => ({ ...m.toObject(), id: m._id })));
    }

    if (req.method === 'POST') {
      const message = await Message.create(req.body);
      return res.status(201).json({ ...message.toObject(), id: message._id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
