import { prisma } from "../config/index.js";

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
