import { GraphQLError } from "graphql";
import bcyrpt from "bcryptjs";

import { UserModel } from "../../models/user.model";
import { generateToken } from "../../lib/util/jwt.util";
import { UserRepository } from "../../repositories/user.repository";

const userResolver = {
  Query: {
    getUser: async (_: any, __: any, context: { token: string }) => {
      if (context.token === "") {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      const user = await UserRepository.getUser(context.token);
      if (!user) {
        throw new GraphQLError("User does not exist", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    },
  },
  Mutation: {
    register: async (
      _: any,
      {
        email,
        name,
        password,
      }: { email: string; name: string; password: string }
    ) => {
      const existingUser = await UserModel.find({ $or: [{ email }, { name }] });

      if (existingUser.length > 0) {
        throw new GraphQLError("User already exists", {
          extensions: {
            code: "CONFLICT",
          },
        });
      }

      const user = new UserModel({
        email,
        name,
        password: bcyrpt.hashSync(password, 12),
        role: "Patient",
      });

      const savedUser = await user.save();

      let token: string = "";
      try {
        token = generateToken(savedUser.id, savedUser.name, savedUser.email);
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`, {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      return {
        token,
      };
    },
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const existingUser = await UserModel.findOne({ email });

      if (!existingUser) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }

      if (!bcyrpt.compareSync(password, existingUser.password)) {
        throw new GraphQLError("Password provided is incorrect", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      let token: string = "";
      try {
        token = generateToken(
          existingUser.id,
          existingUser.name,
          existingUser.email
        );
      } catch (error) {
        throw new GraphQLError(`Error: ${error}`, {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }

      return {
        token,
      };
    },
  },
};

export { userResolver };
