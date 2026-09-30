import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cracker_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error: any) {
    console.warn(`[Database] Warning: Could not connect to primary MongoDB at ${uri}. (${error.message})`);
    
    // In dev or local if no external MongoDB is running, use in-memory MongoDB
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.log('[Database] Starting in-memory MongoMemoryServer as fallback...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const memUri = mongod.getUri();
        await mongoose.connect(memUri);
        isConnected = true;
        console.log(`[Database] In-memory MongoDB running at: ${memUri}`);
        return;
      } catch (memError: any) {
        console.error('[Database] Failed to launch in-memory MongoDB:', memError.message);
      }
    }
    
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
};
