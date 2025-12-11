import mongoose from "mongoose";
const mongodb_url = process.env.MONGODB_URL;

if (!mongodb_url) {
  throw new Error("Mongodb url not found");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectTODatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongodb_url as string)
      .then(() => mongoose.connection);
  }

  try {
    const conn = await cached.promise
    return conn
  } catch (error) {
    console.log(error)
  }
}
