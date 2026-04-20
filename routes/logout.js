import { Router } from "express";
import { getLogout } from "../controllers/index.js";

export const logoutRouter = Router();

logoutRouter.get("/", getLogout);
