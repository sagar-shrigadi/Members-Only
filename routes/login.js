import { Router } from "express";
import { getLogin, loginUser } from "../controllers/index.js";
import passport from "passport";

export const loginRouter = Router();

loginRouter.get("/", getLogin);
loginRouter.post(
  "/",
  // login validation
  loginUser,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);
