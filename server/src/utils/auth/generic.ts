import { Request } from "express";
import type { User } from "@prisma/client";
import { UnauthorizedError, BadRequestError } from "#errors/errors.js";

export function assertLoggedIn(req: Request) {
  if (!req.session.userId) {
    throw new UnauthorizedError("You must be logged in to access this route.");
  }
}

export function assertLoggedOut(req: Request) {
  if (req.session.userId) {
    throw new BadRequestError("You are already logged in.");
  }
}

export function sanitizeUser(user: User) {
  const { password, ...safeUser } = user;
  return safeUser;
}
