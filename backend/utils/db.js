import mongoose from 'mongoose';

export async function connectDB() {
  let uri = process.env.MONGODB_URI;
  let dbName = process.env.MONGODB_DB || undefined;
  if (!uri) {
    // Fallback to local MongoDB
    uri = 'mongodb://127.0.0.1:27017';
    dbName = dbName || 'grantmind';
    console.warn('[DB] MONGODB_URI not set. Falling back to local MongoDB at', uri, 'dbName =', dbName);
  }
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri, { dbName });
  console.log('[DB] MongoDB connected:', uri, 'dbName =', dbName || '(default)');
}
