import { Router } from "express";
import { getProducts } from "#controllers";

const productRouter = Router();

productRouter.get("/", getProducts);

export default productRouter;
