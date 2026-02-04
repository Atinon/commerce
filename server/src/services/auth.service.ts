import { prisma } from "../config/index.js";
import { UnauthorizedError } from "../errors/errors.js";
import type {
  RegisterUserInput,
  LoginUserInput,
} from "../schemas/user/auth.schema.js";
import {
  hashPassword,
  comparePassword,
  fallbackHash,
} from "../utils/auth/password.js";
import { getSingleUserService } from "./user.service.js";

export async function registerUserService(data: RegisterUserInput) {
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: "USER", // default
    },
  });
}

export async function loginUserService(data: LoginUserInput) {
  const user = await getSingleUserService({ email: data.email });
  const hashToCompare = user ? user.password : fallbackHash;
  const passwordsMatch = await comparePassword(data.password, hashToCompare);

  if (!user || !passwordsMatch) {
    throw new UnauthorizedError("Invalid email or password.");
  }
  return user;
}
