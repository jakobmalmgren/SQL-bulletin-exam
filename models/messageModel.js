import pool from "../db.js";

// Skapa meddelande
export async function insertMessage(content, userId, channelId) {
  const result = await pool.query(
    `INSERT INTO messages (content, user_id, channel_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [content, userId, channelId]
  );
  return result.rows[0];
}
