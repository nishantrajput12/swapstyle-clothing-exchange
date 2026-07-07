import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: String, default: () => new Date().toISOString() },
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model('Message', messageSchema);
