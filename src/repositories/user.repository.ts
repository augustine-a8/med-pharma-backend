import { verifyToken } from "../lib/util/jwt.util";
import { UserModel } from "../models/user.model";

const UserRepository = {
  getUser: async (token: string) => {
    try {
      const payload = verifyToken(token);
      const user = await UserModel.findOne({
        _id: payload.id,
        email: payload.email,
        name: payload.name,
      });

      return user;
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

export { UserRepository };
