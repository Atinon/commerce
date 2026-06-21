import { Router } from "express";
import rootRouter from "./root.js";

const webRouter = Router();

webRouter.get("/", rootRouter);

export default webRouter;
