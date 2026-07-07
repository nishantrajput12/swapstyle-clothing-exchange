import connectDB from '../lib/db.js';
import Swap from '../models/Swap.js';
import Listing from '../models/Listing.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
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
      const { userId } = req.query;
      const filter = userId ? { $or: [{ senderId: userId }, { receiverId: userId }] } : {};
      const swaps = await Swap.find(filter).sort({ createdAt: -1 });
      return res.status(200).json(swaps.map(s => ({ ...s.toObject(), id: s._id })));
    }

    if (req.method === 'POST') {
      const swap = await Swap.create(req.body);
      return res.status(201).json({ ...swap.toObject(), id: swap._id });
    }

    if (req.method === 'PUT') {
      const { id, status } = req.body;
      const swap = await Swap.findByIdAndUpdate(id, { status }, { new: true });
      if (status === 'accepted' && swap) {
        await Listing.findByIdAndUpdate(swap.senderListingId, { available: false });
        await Listing.findByIdAndUpdate(swap.receiverListingId, { available: false });
      }
      return res.status(200).json({ ...swap.toObject(), id: swap._id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
