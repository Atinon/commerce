import { prisma } from "../../src/config/index.js";
import type { RegisterUserInput } from "../../src/schemas/auth.schema.js";
import { hashPassword } from "../../src/utils/auth/password.js";

export function makeRegisterData(
  overrides: Partial<RegisterUserInput> = {},
): RegisterUserInput {
  const uniqueId = crypto.randomUUID();
  return {
    email: `${uniqueId}@email.com`,
    password: "Valid123",
    passwordConfirm: "Valid123",
    ...overrides,
  };
}

export async function registerUser(
  registerData: Omit<RegisterUserInput, "passwordConfirm">,
) {
  return prisma.user.create({
    data: {
      email: registerData.email,
      password: await hashPassword(registerData.password),
    },
  });
}
