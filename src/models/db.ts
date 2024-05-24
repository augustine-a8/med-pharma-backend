import mongoose from "mongoose";

async function connectDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl === undefined) {
    throw new Error("Database host not set");
  }
  await mongoose.connect(databaseUrl);
}

export { connectDb };
