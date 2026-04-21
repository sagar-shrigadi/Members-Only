import { Router } from "express";
import { getMessageForm } from "../controllers/messageForm/getForm.js";
import { postMessageForm } from "../controllers/messageForm/postForm.js";

export const messageRouter = Router({ mergeParams: true });

messageRouter.get("/new", getMessageForm);
messageRouter.post("/new", postMessageForm);
