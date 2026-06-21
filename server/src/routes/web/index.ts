import { Router } from "express";
import rootRouter from "./root.js";

const webRouter = Router();

webRouter.use("/", rootRouter);

export default webRouter;
