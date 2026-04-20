import { Router } from "express";
import { getIndex } from "../controllers/index.js";

export const indexRouter = Router({ mergeParams: true });

indexRouter.get("/", getIndex);
