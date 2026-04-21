import { pool } from "../pool.js";
export const insertMessage = async (title, content, date, userId) => {
  await pool.query(
    `
        INSERT INTO messages (title, message_content, created_at, user_id)
        VALUES ($1, $2, $3, $4)`,
    [title, content, date, userId],
  );
};
