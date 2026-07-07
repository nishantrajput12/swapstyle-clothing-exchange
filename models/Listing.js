import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: String, required: true },
  condition: { type: String, required: true },
  estimatedValue: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, default: '' },
  images: [{ type: String }],
  tags: [{ type: String }],
  available: { type: Boolean, default: true },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] },
}, { timestamps: true });

export default mongoose.models.Listing || mongoose.model('Listing', listingSchema);
