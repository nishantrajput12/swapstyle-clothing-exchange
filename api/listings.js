import connectDB from '../lib/db.js';
import Listing from '../models/Listing.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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
      const { userId, category, available } = req.query;
      const filter = {};
      if (userId) filter.userId = userId;
      if (category) filter.category = category;
      if (available !== undefined) filter.available = available === 'true';
      const listings = await Listing.find(filter).sort({ createdAt: -1 });
      return res.status(200).json(listings.map(l => ({ ...l.toObject(), id: l._id })));
    }

    if (req.method === 'POST') {
      const listing = await Listing.create(req.body);
      return res.status(201).json({ ...listing.toObject(), id: listing._id });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const listing = await Listing.findByIdAndUpdate(id, updates, { new: true });
      return res.status(200).json({ ...listing.toObject(), id: listing._id });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Listing.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
