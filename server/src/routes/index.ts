import { Router } from "express";
import rootRouter from "./root.js";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import adminRouter from "./admin.js";
import userRouter from "./user.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import { requireLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/", rootRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/admin", requireAdmin, adminRouter);
router.use("/account", requireLoggedIn, userRouter);

export default router;
