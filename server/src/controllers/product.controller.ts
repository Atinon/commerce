import { Request, Response } from "express";
import {
  getProductsService,
  createProductService,
} from "../services/product.service.js";
import { createProductSchema } from "../schemas/product/index.js";

const DEFAULT_COUNT = 10;
const MAX_COUNT = 100;

export async function getProducts(req: Request, res: Response) {
  const count = Math.min(Number(req.query.count) || DEFAULT_COUNT, MAX_COUNT);
  const products = await getProductsService({ count: count });
  res.status(200).json(products);
}

export async function createProduct(req: Request, res: Response) {
  const data = createProductSchema.parse(req.body);
  const product = createProductService(data);
  res.status(201).json(product);
}
