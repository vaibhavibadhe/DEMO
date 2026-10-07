// config/db.js - MongoDB connection with graceful fallback
import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_clinic';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    isMongoConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.log(`[Database] MongoDB connection bypassed (${error.message}). Using resilient in-memory data store.`);
    return false;
  }
};

export const getDBStatus = () => isMongoConnected;
