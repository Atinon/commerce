import { prisma } from "#config";
import { RegisterUserInput } from "#schemas/auth.schema.js";
import { hashPassword } from "#utils/auth/password.js";

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
