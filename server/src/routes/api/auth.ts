import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "#controllers";
import { requireLoggedOut, requireLoggedIn } from "#middlewares";

const authRouter = Router();

authRouter.post("/register", requireLoggedOut, registerUser);
authRouter.post("/login", requireLoggedOut, loginUser);
authRouter.post("/logout", requireLoggedIn, logoutUser);

export default authRouter;
