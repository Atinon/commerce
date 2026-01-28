import { prisma } from "../config/index.js";

interface GetUsersOptions {
  count: number;
}

export async function getUsersService(options: GetUsersOptions) {
  return prisma.user.findMany({
    take: options.count,
  });
}
