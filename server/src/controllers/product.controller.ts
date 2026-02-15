import { Request, Response } from "express";
import {
  getProductsService,
  createProductService,
  deleteProductService,
  updateProductService,
} from "../services/product.service.js";
import {
  createProductSchema,
  productParamsSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";

const DEFAULT_COUNT = 10;
const MAX_COUNT = 100;

export async function getProducts(req: Request, res: Response) {
  const count = Math.min(Number(req.query.count) || DEFAULT_COUNT, MAX_COUNT);
  const products = await getProductsService({ count: count });
  res.status(200).json(products);
}

export async function createProduct(req: Request, res: Response) {
  const data = createProductSchema.parse(req.body);
  const product = await createProductService(data);
  res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const params = productParamsSchema.parse(req.params);
  const data = updateProductSchema.parse(req.body);
  const updatedProduct = await updateProductService(params, data);
  res.status(200).json(updatedProduct);
}

export async function deleteProduct(req: Request, res: Response) {
  const params = productParamsSchema.parse(req.params);
  await deleteProductService(params);
  res.status(204).send();
}
