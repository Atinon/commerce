import { Request, Response } from "express";
import { registerUserSchema, USER_ROLES } from "../schemas/auth.schema.js";
import { registerUserService } from "../services/auth.service.js";
import { sanitizeUser } from "../utils/auth/generic.js";
import { userParamsSchema } from "../schemas/user.schema.js";
import { deleteUserService } from "../services/user.service.js";

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
