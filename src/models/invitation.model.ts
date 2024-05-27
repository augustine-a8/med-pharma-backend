import { Schema, model } from "mongoose";

import { IInvitationCode } from "../lib/types/model";

const invitationCodeSchema = new Schema<IInvitationCode>(
  {
    code: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const InvitationCodeModel = model("InvitationCode", invitationCodeSchema);

export { InvitationCodeModel };
