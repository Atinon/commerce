import { Request, Response } from "express";
import {
  loginUserSchema,
  registerUserSchema,
} from "../schemas/user/auth.schema.js";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";
import { User } from "@prisma/client";

function sanitizeUser(user: User) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function registerUser(req: Request, res: Response) {
  const data = registerUserSchema.parse(req.body);
  const user = await registerUserService(data);
  const safeUser = sanitizeUser(user);
  res.status(201).json(safeUser);
}

export async function loginUser(req: Request, res: Response) {
  const data = loginUserSchema.parse(req.body);
  const user = await loginUserService(data);
  req.session.userId = user.id;
  const safeUser = sanitizeUser(user);
  res.status(200).json(safeUser);
}

export async function logoutUser(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) throw new Error("Failed to destroy session."); // can change
  });
  res.clearCookie("connect.sid");
  res.status(200).json({ message: "Successfully logged out." });
}
