import mongoose from 'mongoose';

const swapSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  senderListingId: { type: String, required: true },
  receiverListingId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  message: { type: String, default: '' },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] },
}, { timestamps: true });

export default mongoose.models.Swap || mongoose.model('Swap', swapSchema);
