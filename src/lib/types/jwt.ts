import { JwtPayload } from "jsonwebtoken";

interface IJwtPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
}

export { IJwtPayload };
