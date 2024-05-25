import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { UserRepository } from "../../src/repositories/user.repository";

describe("User Repository Test Suite", () => {
  beforeEach(async () => {
    const uri = process.env.DATABASE_URL as string;
    await mongoose.connect(uri);
  }, 30000);

  afterEach(async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
    await mongoose.disconnect();
  }, 30000);

  it("should return User document from mongo", async () => {
    const email = "";
    const name = "";
    const res = await mongoose.connection
      .collection("users")
      .insertOne({ email, name, password: "", role: "Patient" });

    const id = res.insertedId;
    const jwtSecret = process.env.JWT_SECRET!;
    const token = jwt.sign({ id: id.toString(), email, name }, jwtSecret);

    const user = await UserRepository.getUser(token);
    expect(user).toBeDefined();
  });
});
