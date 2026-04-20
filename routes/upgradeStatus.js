import { Router } from "express";
import { getUpgradeForm } from "../controllers/upgradeStatusForm/getUpgradeStatusForm.js";
import { postUpgradeForm } from "../controllers/upgradeStatusForm/postUpgradeStatusForm.js";

export const upgradeStatusRouter = Router();

upgradeStatusRouter.get("/", getUpgradeForm);
upgradeStatusRouter.post("/", postUpgradeForm);
