import { Router } from "express";
import { getRegister, registerUser } from "../controllers/index.js";

export const registerRouter = Router();

registerRouter.post("/", registerUser);
registerRouter.get("/", getRegister);
