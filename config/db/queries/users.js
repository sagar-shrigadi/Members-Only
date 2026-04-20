import { pool } from "../pool.js";
import bcrypt from "bcryptjs";

export const getUserByUsername = async (username) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return rows[0];
};

export const getUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0];
};

export const insertUser = async (firstname, lastname, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    `
    INSERT INTO users (firstname, lastname, username, password)
    VALUES ($1, $2, $3, $4)`,
    [firstname, lastname, username, hashedPassword],
  );
};
