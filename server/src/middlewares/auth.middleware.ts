import { Request, Response, NextFunction } from "express";
import { assertLoggedIn, assertLoggedOut } from "../utils/auth/generic.js";

export function requireLoggedOut(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  assertLoggedOut(req);
  next();
}

export function requireLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  assertLoggedIn(req);
  next();
}
