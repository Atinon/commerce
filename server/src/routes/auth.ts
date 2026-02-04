import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/index.js";
import { requireLoggedIn, requireLoggedOut } from "../middlewares/index.js";

const authRouter = Router();

authRouter.post("/register", requireLoggedOut, registerUser);
authRouter.post("/login", requireLoggedOut, loginUser);
authRouter.get("/logout", requireLoggedIn, logoutUser);

export default authRouter;
