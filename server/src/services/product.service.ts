import { prisma } from "#config";
import {
  CreateProductInput,
  ProductParamsSchema,
  UpdateProductInput,
} from "#schemas/product.schema.js";
import { assertActiveProduct } from "#utils/product/generic.js";

interface GetProductsOptions {
  count: number;
}

export async function getProductsService(options: GetProductsOptions) {
  return prisma.product.findMany({
    where: { deletedAt: null },
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
  await assertActiveProduct(params);
  return prisma.product.update({
    where: params,
    data: data,
  });
}

export async function deleteProductService(params: ProductParamsSchema) {
  await assertActiveProduct(params);
  return prisma.product.update({
    where: params,
    data: { deletedAt: new Date() },
  });
}
