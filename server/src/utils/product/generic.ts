import { prisma } from "#config";
import { NotFoundError } from "#errors/errors.js";
import { ProductParamsSchema } from "#schemas/product.schema.js";
import { Product } from "@prisma/client";

export async function assertActiveProduct(params: ProductParamsSchema) {
  const product = await prisma.product.findUnique({
    where: params,
    select: { deletedAt: true },
  });

  if (!product || product.deletedAt) {
    throw new NotFoundError("Product not found.");
  }
}

export function sanitizeProduct(product: Product) {
  const { deletedAt, ...safeProduct } = product;
  return safeProduct;
}
