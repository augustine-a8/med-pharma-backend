import { GraphQLError } from "graphql";

import { verifyToken } from "../lib/util/jwt.util";

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

export { checkAuth };
