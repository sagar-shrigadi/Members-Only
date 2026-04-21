import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname VARCHAR ( 50 ) NOT NULL,
    lastname VARCHAR ( 50 ) NOT NULL,
    username VARCHAR ( 255 ) NOT NULL UNIQUE,
    password VARCHAR ( 255 ) NOT NULL,
    membership_status VARCHAR(50) NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 100 ) NOT NULL,
    message_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL REFERENCES users(id)
);

ALTER TABLE users ADD COLUMN admin BOOLEAN DEFAULT FALSE;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}
main();
