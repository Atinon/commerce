import { prisma } from "../config/index.js";
import { UserParamsSchema } from "../schemas/user.schema.js";

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
