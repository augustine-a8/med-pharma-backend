import crypto from "crypto";

import { InvitationCodeModel } from "../models/invitation.model";

async function generateInvitationCode() {
  const code = crypto.randomBytes(16).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const invitation = new InvitationCodeModel({
    code,
    expiresAt,
    used: false,
  });

  await invitation.save();

  return code;
}

async function verifyInvitationCode(code: string) {
  const invitationCode = await InvitationCodeModel.findOne({ code });
  if (!invitationCode) {
    return false;
  }
  if (invitationCode.used) {
    return false;
  }
  if (invitationCode.expiresAt < new Date(Date.now())) {
    return false;
  }

  invitationCode.used = true;
  await invitationCode.save();
  return true;
}

export { generateInvitationCode, verifyInvitationCode };
