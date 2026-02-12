import "express-session";
import { UserRole } from "../schemas/user/auth.schema.ts";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    userRole?: UserRole;
  }
}
