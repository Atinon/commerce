import { Router } from "express";
import { getProducts } from "../controllers/index.js";

const productRouter = Router();

productRouter.get("/", getProducts);

export default productRouter;
