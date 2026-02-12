import { Request, Response } from "express";
import { registerUserSchema } from "../schemas/user/auth.schema.js";
import { registerUserService } from "../services/auth.service.js";
import { sanitizeUser } from "../utils/auth/generic.js";

export async function createAdminUser(req: Request, res: Response) {
  const data = registerUserSchema.parse(req.body);
  const user = await registerUserService(data, "ADMIN");
  const safeUser = sanitizeUser(user);
  res.status(201).json(safeUser);
}
