import { deleteSelectedMsg } from "../../config/db/queries/notes.js";

export const postDeleteMsg = async (req, res) => {
  const { id } = req.params;
  await deleteSelectedMsg(Number(id));
  res.redirect("/");
};
