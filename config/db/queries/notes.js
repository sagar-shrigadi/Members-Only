import { pool } from "../pool.js";
export const insertMessage = async (title, content, date, userId) => {
  await pool.query(
    `
    INSERT INTO messages (title, message_content, created_at, user_id)
    VALUES ($1, $2, $3, $4)
    `,
    [title, content, date, userId],
  );
};

export const getAllMsgByUser = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT users.id, firstname, lastname, membership_status AS status, messages.id, title, message_content, created_at 
    FROM users INNER JOIN messages ON users.id = messages.user_id
    WHERE users.id = $1`,
    [id],
  );
  return rows;
};

export const getAllMsg = async () => {
  const { rows } = await pool.query(`
    SELECT users.id, firstname, lastname, membership_status AS status, messages.id, title, message_content, created_at, messages.user_id 
    FROM users INNER JOIN messages ON users.id = messages.user_id`);
  return rows;
};
