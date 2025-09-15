/* eslint-env node */
/// <reference types="node" />
import mongoose from "mongoose";

let connection: typeof mongoose | null = null;

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  if (connection) {
    return connection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(uri);
  connection = mongoose;
  return mongoose;
};
