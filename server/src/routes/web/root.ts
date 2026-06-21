import { Router } from "express";

const rootRouter = Router();

rootRouter.get("/", async (_req, res) => {
  res.render("home");
});

rootRouter.get("/docs", async (_req, res) => {
  res.render("docs");
});

export default rootRouter;
