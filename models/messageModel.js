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

// updatera/redigera befintligt meddelande
export const updateMessageContent = async (id, newContent) => {
    const result = await pool.query(
        `UPDATE messages
        SET content = $1
        WHERE id = $2
        RETURNING *`,
        [newContent, id]
    )
    return result.rows[0]
}
