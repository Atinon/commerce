import { Request, Response } from "express";
import {
  createProductSchema,
  productParamsSchema,
  updateProductSchema,
} from "#schemas/product.schema.js";
import {
  getProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "#services";
import { sanitizeProduct } from "#utils/product/generic.js";

const DEFAULT_COUNT = 10;
const MAX_COUNT = 100;

export async function getProducts(req: Request, res: Response) {
  const count = Math.min(Number(req.query.count) || DEFAULT_COUNT, MAX_COUNT);
  const products = await getProductsService({ count: count });
  const safeProducts = products.map(sanitizeProduct);
  res.status(200).json(safeProducts);
}

export async function createProduct(req: Request, res: Response) {
  const data = createProductSchema.parse(req.body);
  const product = await createProductService(data);
  const safeProduct = sanitizeProduct(product);
  res.status(201).json(safeProduct);
}

export async function updateProduct(req: Request, res: Response) {
  const params = productParamsSchema.parse(req.params);
  const data = updateProductSchema.parse(req.body);
  const updatedProduct = await updateProductService(params, data);
  const safeUpdatedProduct = sanitizeProduct(updatedProduct);
  res.status(200).json(safeUpdatedProduct);
}

export async function deleteProduct(req: Request, res: Response) {
  const params = productParamsSchema.parse(req.params);
  await deleteProductService(params);
  res.status(204).send();
}
