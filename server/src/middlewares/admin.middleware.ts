import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/errors.js";
import { assertLoggedIn } from "../utils/auth/generic.js";

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  assertLoggedIn(req);
  if (req.session.userRole !== "ADMIN") {
    throw new ForbiddenError("Admin access required for this route.");
  }
  next();
}
