import { body, matchedData, validationResult } from "express-validator";
import { updateUserStatus } from "../../config/db/queries/users.js";

const validatePasscode = [
  body("passcode").trim().notEmpty().withMessage(`Passcode must not be empty!`),
];
export const postUpgradeForm = [
  validatePasscode,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("upgradeForm", { errors: errors.array() });
    }
    const { passcode } = matchedData(req);
    if (passcode === process.env.UPGRADE_STATUS_PASS) {
      await updateUserStatus(req.user.id);
    } else {
      res.redirect("/upgrade-status", { errors: "Incorrect Passcode!" });
    }
    res.redirect("/");
  },
];
