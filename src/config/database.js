import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let bucket;

export const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const db = mongoose.connection;

  bucket = new GridFSBucket(db.db, {
    bucketName: "audios",
  });

  console.log("MongoDB conectado");

  return db;
};

export const getBucket = () => bucket;
