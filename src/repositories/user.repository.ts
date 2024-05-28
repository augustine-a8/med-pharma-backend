import { UserRole } from "../lib/types/model";
import { UserModel } from "../models/user.model";

const UserRepository = {
  createUser: async (email: string, name: string, password: string) => {
    const user = new UserModel({
      email,
      name,
      password,
      role: "Patient",
    });

    const savedUser = await user.save();

    return savedUser;
  },
  getUserById: async (id: string) => {
    const user = await UserModel.findOne({ _id: id });

    return user;
  },
  getUserByName: async (name: string) => {
    const user = await UserModel.findOne({ name });

    return user;
  },
  getUsersByRole: async (role: UserRole) => {
    const users = await UserModel.find({ role });

    return users;
  },
  deleteUser: async (id: string) => {
    const res = await UserModel.deleteOne({
      _id: id,
    });

    return res.acknowledged;
  },
};

export { UserRepository };
