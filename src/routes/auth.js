import { Router } from "express";
import { cadastrarUsuario, login } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", cadastrarUsuario);
authRouter.post("/login", login);

export default authRouter;
