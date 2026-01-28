import { prisma } from "../config/index.js";
import { CreateProductInput } from "../schemas/product/index.js";

interface GetProductsOptions {
  count: number;
}

export async function getProductsService(options: GetProductsOptions) {
  return prisma.product.findMany({
    take: options.count,
  });
}

export async function createProductService(data: CreateProductInput) {
  return prisma.product.create({ data });
}
