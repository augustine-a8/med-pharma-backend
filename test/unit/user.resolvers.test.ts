import mongoose from "mongoose";

import { userResolver } from "../../src/schema/resolvers/user.resolver";

describe("User Resolvers Test Suite", () => {
  beforeAll(async () => {
    const uri = process.env.DATABASE_URL as string;
    await mongoose.connect(uri);
  }, 30000);

  afterAll(async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
    await mongoose.disconnect();
  }, 30000);

  it("should return token on successful user registration", async () => {
    const email = "test@email.com";
    const name = "Test User";
    const password = "test password";

    const res = await userResolver.Mutation.register(null, {
      email,
      name,
      password,
    });
    expect(res).toHaveProperty("token");
  });
});
