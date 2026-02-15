import "express-session";
import { UserRole } from "../schemas/auth.schema.ts";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    userRole?: UserRole;
  }
}
