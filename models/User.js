import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, default: '' },
  bio: { type: String, default: '' },
  isAdmin: { type: Boolean, default: false },
  joinDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  avatar: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
