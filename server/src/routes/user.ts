import { Router } from "express";
import {
  changeAccountPassword,
  editAccount,
  getAccount,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAccount);
userRouter.post("/edit", editAccount);
userRouter.post("/change-password", changeAccountPassword);

export default userRouter;
