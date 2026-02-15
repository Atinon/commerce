import { prisma } from "../config/index.js";
import {
  CreateProductInput,
  ProductParamsSchema,
  UpdateProductInput,
} from "../schemas/product.schema.js";

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

export async function updateProductService(
  params: ProductParamsSchema,
  data: UpdateProductInput,
) {
  return prisma.product.update({
    where: params,
    data: data,
  });
}

export async function deleteProductService(params: ProductParamsSchema) {
  return prisma.product.delete({
    where: params,
  });
}
