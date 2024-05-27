import { UserRole } from "./model";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export { User };
