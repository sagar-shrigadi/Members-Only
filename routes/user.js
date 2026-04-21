import { Router } from "express";
import { getUserProfile } from "../controllers/user/getUserProfile.js";

export const userRouter = Router({ mergeParams: true });

userRouter.get("/:id", getUserProfile);
