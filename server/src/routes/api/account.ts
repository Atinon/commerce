import { Router } from "express";
import { getAccount, editAccount, changeAccountPassword } from "#controllers";

const accountRouter = Router();

accountRouter.get("/", getAccount);
accountRouter.patch("/", editAccount);
accountRouter.patch("/password", changeAccountPassword);

export default accountRouter;
