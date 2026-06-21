import { Router } from "express";

const rootRouter = Router();

rootRouter.get("/", async (_req, res) => {
  res.render("home", {
    message: "Welcome! Work in progress...",
  });
});

export default rootRouter;
