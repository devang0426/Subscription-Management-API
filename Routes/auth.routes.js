import { Router } from "express";
import { signup } from "../controllers/auth.controllers.js";
import { signin } from "../controllers/auth.controllers.js";
import { signout } from "../controllers/auth.controllers.js";


const authRouter = Router();
// api/v1/auth/signup
authRouter.post("/sign-up", signup);
authRouter.post("/sign-in",  signin);
authRouter.post("/sign-out", signout);

export default authRouter;
