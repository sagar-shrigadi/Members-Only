import { body, matchedData, validationResult } from "express-validator";
import { emptyMsgErr } from "../index.js";
import { insertMessage } from "../../config/db/queries/notes.js";

const messageFormValidation = [
  body("messageTitle")
    .trim()
    .notEmpty()
    .withMessage(`Title field ${emptyMsgErr}`)
    .isLength({ max: 70 })
    .withMessage(`Title must be under 70 characters.`),
  body("messageContent")
    .trim()
    .notEmpty()
    .withMessage(`Message Content field ${emptyMsgErr}`)
    .isLength({ min: 3 })
    .withMessage(`Message Content field must have minumum 3 characters.`),
];
export const postMessageForm = [
  messageFormValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("messageForm", { errors: errors.array() });
    }
    const { messageTitle, messageContent } = matchedData(req);
    const date = new Date();
    const userId = req.user.id;
    await insertMessage(messageTitle, messageContent, date, userId);
    res.redirect(`/user/${userId}`);
  },
];
