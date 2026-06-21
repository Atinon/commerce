import { Router } from "express";
import { requireAdmin, requireLoggedIn } from "#middlewares";
import adminRouter from "./admin.js";
import authRouter from "./auth.js";
import productRouter from "./product.js";
import accountRouter from "./account.js";

const apiRouter = Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/admin", requireAdmin, adminRouter);
apiRouter.use("/account", requireLoggedIn, accountRouter);

export default apiRouter;
