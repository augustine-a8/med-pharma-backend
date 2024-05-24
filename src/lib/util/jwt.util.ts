import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

function generateToken(id: string, name: string, email: string) {
  if (jwtSecret === undefined) {
    throw new Error("JWT secret not provided");
  }

  const token = jwt.sign({ name, email, id }, jwtSecret);

  return token;
}

function verifyToken(token: string) {
  if (jwtSecret === undefined) {
    throw new Error("JWT secret not provided");
  }

  const payload = jwt.verify(token, jwtSecret);

  return payload;
}

export { generateToken, verifyToken };
