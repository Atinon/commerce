import { Router } from "express";
import { getProducts, createProduct } from "../controllers/index.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post("/create", createProduct);

export default productRouter;
