import { UserModel } from "../models/user.model";

const UserRepository = {
  getUserById: async (id: string) => {
    const user = await UserModel.findOne({ _id: id });

    return user;
  },
  getUserByName: async (name: string) => {
    const user = await UserModel.findOne({ name });

    return user;
  },
  deleteUser: async (id: string) => {
    const res = await UserModel.deleteOne({
      _id: id,
    });

    return res.acknowledged;
  },
};

export { UserRepository };
