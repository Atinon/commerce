import { Request, Response, NextFunction } from "express";
import { BadRequestError, UnauthorizedError } from "../errors/errors.js";

export function requireLoggedOut(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (req.session.userId) {
    throw new BadRequestError("You are already logged in.");
  }
  next();
}

export function requireLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.session.userId) {
    throw new UnauthorizedError("You must be logged in to access this route.");
  }
  next();
}
