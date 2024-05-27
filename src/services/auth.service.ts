import { GraphQLError } from "graphql";

import { verifyToken } from "../lib/util/jwt.util";
import { UserModel } from "../models/user.model";

function checkAuth(token: string) {
  if (token === "") {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHORIZED",
      },
    });
  }

  const payload = verifyToken(token);

  return {
    id: payload.id,
    name: payload.name,
    email: payload.email,
  };
}

async function verifyConsultationOfficerRole(payload: {
  id: string;
  name: string;
  email: string;
}) {
  const user = await UserModel.findOne({
    _id: payload.id,
    name: payload.name,
    email: payload.email,
  });

  return user?.role === "ConsultationOfficer";
}

export { checkAuth, verifyConsultationOfficerRole };
