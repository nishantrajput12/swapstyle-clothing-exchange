import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not configured - using local storage fallback');
} else {
  console.log('MongoDB connection string detected, will attempt connection...');
}

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (!MONGODB_URI) return null;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
