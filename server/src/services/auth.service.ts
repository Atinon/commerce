import { prisma } from "#config";
import { UnauthorizedError } from "#errors/errors.js";
import {
  RegisterUserInput,
  UserRole,
  USER_ROLES,
  LoginUserInput,
} from "#schemas/auth.schema.js";
import {
  hashPassword,
  fallbackHash,
  comparePassword,
} from "#utils/auth/password.js";
import { getSingleUserService } from "./user.service.js";

export async function registerUserService(
  data: RegisterUserInput,
  role?: UserRole,
) {
  const hashedPassword = await hashPassword(data.password);
  return prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: role ?? USER_ROLES.USER,
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
