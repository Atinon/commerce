import { Router } from "express";
import webRouter from "./web/index.js";
import apiRouter from "./api/index.js";

const router = Router();

router.use("/", webRouter);
router.use("/api", apiRouter);

export default router;
