import { getAllMsgByUser } from "../../config/db/queries/notes.js";

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  const userMsg = await getAllMsgByUser(Number(id));
  res.render("selectedUser", { userMsg });
};
