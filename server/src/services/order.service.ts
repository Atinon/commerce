import { prisma } from "#config";

interface GetOrdersOptions {
  count: number;
}

export async function getOrdersService(options: GetOrdersOptions) {
  return prisma.order.findMany({
    take: options.count,
  });
}
