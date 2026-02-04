import { Router } from "express";
import rootRouter from "./root.js";
import productRouter from "./product.js";
import authRouter from "./auth.js";

const router = Router();

router.use("/", rootRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);

export default router;
