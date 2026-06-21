import { prisma } from "#config";
import {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} from "#errors/errors.js";
import {
  UserParamsSchema,
  EditUserSchema,
  ChangeAccountPasswordSchema,
} from "#schemas/user.schema.js";
import { comparePassword, hashPassword } from "#utils/auth/password.js";

type GetUsersOptions = {
  count: number;
};

type GetSingleUserParams = { id: number } | { email: string };

export async function getUsersService(options: GetUsersOptions) {
  return prisma.user.findMany({
    take: options.count,
  });
}

export async function getSingleUserService(params: GetSingleUserParams) {
  return prisma.user.findUnique({
    where: params,
  });
}

// Can change to soft delete if needed
export async function deleteUserService(params: UserParamsSchema) {
  return prisma.user.delete({
    where: params,
  });
}

export async function editUserService(
  params: UserParamsSchema,
  data: EditUserSchema,
) {
  return prisma.user.update({
    where: params,
    data: data,
  });
}

export async function changeAccountPasswordService(
  params: UserParamsSchema,
  data: ChangeAccountPasswordSchema,
) {
  const user = await prisma.user.findUnique({
    where: params,
    select: { password: true },
  });

  if (!user) throw new NotFoundError("User not found.");

  const passwordMatch = await comparePassword(
    data.currentPassword,
    user.password,
  );

  if (!passwordMatch)
    throw new UnauthorizedError("Current password is incorrect.");

  const samePassword = await comparePassword(data.newPassword, user.password);

  if (samePassword)
    throw new BadRequestError(
      "New password must be different from current password.",
    );

  const hashedPassword = await hashPassword(data.newPassword);

  return prisma.user.update({
    where: params,
    data: { password: hashedPassword },
  });
}
