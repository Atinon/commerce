import { Router } from "express";
import { requireAdmin, requireLoggedIn } from "#middlewares";
import adminRouter from "./admin.js";
import authRouter from "./auth.js";
import productRouter from "./product.js";
import accountRouter from "./account.js";

const apiRouter = Router();

apiRouter.get("/", () => {});
apiRouter.use("/products", productRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/admin", requireAdmin, adminRouter);
apiRouter.use("/account", requireLoggedIn, accountRouter);

apiRouter.get("/debug-session", (req, res) => {
  res.json({
    sessionId: req.sessionID,
    session: req.session,
  });
});

export default apiRouter;
