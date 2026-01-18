import { Router } from "express";
import rootRouter from "./root.js";

const router = Router();

router.use("/", rootRouter);

export default router;
