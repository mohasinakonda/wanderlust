import mongoose from "mongoose";
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  throw new Error("MONGODB_URI is not defined");
}
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  }
}
export const connectDB = async () => {
  try {
    if (cached.conn) return
    if (!cached.promise) {
      cached.process = mongoose.connect(MONGO_URI).then(mongoose => mongoose)
    }
    cached.conn = await cached.promise

    return cached.conn;
  } catch (error) {

    throw error;
  }
};