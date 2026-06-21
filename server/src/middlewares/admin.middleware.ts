import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "#errors/errors.js";
import { USER_ROLES } from "#schemas/auth.schema.js";
import { assertLoggedIn } from "#utils/auth/generic.js";

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  assertLoggedIn(req);
  if (req.session.userRole !== USER_ROLES.ADMIN) {
    throw new ForbiddenError("Admin access required for this route.");
  }
  next();
}
