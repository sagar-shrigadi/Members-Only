import { Router } from "express";
import { getMessageForm } from "../controllers/message/getForm.js";
import { postMessageForm } from "../controllers/message/postForm.js";
import { postDeleteMsg } from "../controllers/message/postDeleteMsg.js";

export const messageRouter = Router({ mergeParams: true });

messageRouter.get("/new", getMessageForm);
messageRouter.post("/new", postMessageForm);

// delete message post req
// only available for admin
messageRouter.post("/:id/delete", postDeleteMsg);
