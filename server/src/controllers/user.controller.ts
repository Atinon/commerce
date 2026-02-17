import { Request, Response } from "express";
import { registerUserSchema, USER_ROLES } from "../schemas/auth.schema.js";
import { registerUserService } from "../services/auth.service.js";
import { sanitizeUser } from "../utils/auth/generic.js";
import {
  changeAccountPasswordSchema,
  editUserSchema,
  userParamsSchema,
} from "../schemas/user.schema.js";
import {
  changeAccountPasswordService,
  deleteUserService,
  editUserService,
  getSingleUserService,
} from "../services/user.service.js";

export async function createAdminUser(req: Request, res: Response) {
  const data = registerUserSchema.parse(req.body);
  const user = await registerUserService(data, USER_ROLES.ADMIN);
  const safeUser = sanitizeUser(user);
  res.status(201).json(safeUser);
}

export async function deleteUserAdmin(req: Request, res: Response) {
  const params = userParamsSchema.parse(req.params);
  await deleteUserService(params);
  res.status(204).send();
}

// requireLoggedIn middleware ensures the id's below are not undefined. might fix type assertion later.
export async function getAccount(req: Request, res: Response) {
  const user = await getSingleUserService({ id: req.session.userId! });
  const safeUser = sanitizeUser(user!); // a bit hacky, should fix
  res.status(200).json(safeUser);
}

export async function editAccount(req: Request, res: Response) {
  const data = editUserSchema.parse(req.body);
  const updatedUser = await editUserService({ id: req.session.userId! }, data);
  const safeUser = sanitizeUser(updatedUser);
  res.status(200).json(safeUser);
}

export async function changeAccountPassword(req: Request, res: Response) {
  const data = changeAccountPasswordSchema.parse(req.body);
  await changeAccountPasswordService({ id: req.session.userId! }, data);
  res.status(200).send();
}
