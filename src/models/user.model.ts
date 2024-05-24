import { Schema, model } from "mongoose";

import { IUserModel } from "../lib/types/model";

const userSchema = new Schema<IUserModel>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Patient", "ConsultationOfficer"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUserModel>("User", userSchema);

export { UserModel };
