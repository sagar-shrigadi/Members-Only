import { Router } from "express";
import { registerUser } from "../controllers/index.js";

export const registerRouter = Router();

registerRouter.post("/", registerUser);
