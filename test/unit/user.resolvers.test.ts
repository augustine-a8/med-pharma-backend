import mongoose from "mongoose";

import { userResolver } from "../../src/schema/resolvers/user.resolver";

describe("User Resolvers Test Suite", () => {
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
    expect(res.token).toBeDefined();
  });

  it("should throw User already exists error when registering already registered user", async () => {
    const email = "test@email.com";
    const name = "Test User";
    const password = "test password";

    await userResolver.Mutation.register(null, {
      email,
      name,
      password,
    });

    await expect(
      userResolver.Mutation.register(null, { email, name, password })
    ).rejects.toThrow("User already exists");
  });

  it("should return user token on successful login", async () => {
    const email = "test@email.com";
    const name = "Test User";
    const password = "test password";

    await userResolver.Mutation.register(null, {
      email,
      name,
      password,
    });

    const res = await userResolver.Mutation.login(null, { email, password });
    expect(res).toHaveProperty("token");
  });

  it("should throw Password provided is incorrect error when wrong password is provided at login", async () => {
    const email = "test@email.com";
    const name = "Test User";
    const password = "test password";

    await userResolver.Mutation.register(null, {
      email,
      name,
      password,
    });

    await expect(
      userResolver.Mutation.login(null, {
        email,
        password: "not test password",
      })
    ).rejects.toThrow("Password provided is incorrect");
  });

  it("should throw User not found error when wrong email is provided at login", async () => {
    const email = "test@email.com";
    const name = "Test User";
    const password = "test password";

    await userResolver.Mutation.register(null, {
      email,
      name,
      password,
    });

    await expect(
      userResolver.Mutation.login(null, {
        email: "nottest@email.com",
        password,
      })
    ).rejects.toThrow("User not found");
  });

  it("should return user details", async () => {
    const email = "test@email.com";
    const name = "Test User";
    const password = "test password";

    const res1 = await userResolver.Mutation.register(null, {
      email,
      name,
      password,
    });

    const res = await userResolver.Query.getUser(null, null, {
      token: res1.token,
    });
    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("email");
    expect(res).toHaveProperty("name");
    expect(res).toHaveProperty("role");
    expect(res.id).toBeDefined();
    expect(res.email).toBeDefined();
    expect(res.name).toBeDefined();
    expect(res.role).toBeDefined();
  });

  it("should throw User is not authenticated error when token is not provided on getUser", async () => {
    const email = "test@email.com";
    const name = "Test User";
    const password = "test password";

    await userResolver.Mutation.register(null, {
      email,
      name,
      password,
    });

    await expect(
      userResolver.Query.getUser(null, null, { token: "" })
    ).rejects.toThrow("User is not authenticated");
  });
});
