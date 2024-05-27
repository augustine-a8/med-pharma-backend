import { Router } from "express";
import bcrypt from "bcryptjs";

import { UserModel } from "../models/user.model";
import {
  generateInvitationCode,
  verifyInvitationCode,
} from "../services/invitationCode.service";
import { generateToken } from "../lib/util/jwt.util";

const router = Router();

router.post("/register", async (req, res) => {
  const { code, name, email, password } = req.body;

  const validCode = await verifyInvitationCode(code);
  if (!validCode) {
    return res.status(401).json({
      message: "Invalid or expired invitation code",
    });
  }

  const consultationOfficer = new UserModel({
    name,
    email,
    password: bcrypt.hashSync(password, 12),
    role: "ConsultationOfficer",
  });

  const saved = await consultationOfficer.save();

  const token = generateToken(saved.id, saved.name, saved.email);

  return res
    .status(200)
    .json({ token, message: "Admin registered successfully" });
});

router.get("/invitation-code", async (req, res) => {
  const code = await generateInvitationCode();

  return res.status(200).json({ code });
});

export { router as adminRouter };
