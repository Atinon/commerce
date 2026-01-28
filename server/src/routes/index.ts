import { Router } from "express";
import rootRouter from "./root.js";
import productRouter from "./product.js";

const router = Router();

router.use("/", rootRouter);
router.use("/products", productRouter);

export default router;
