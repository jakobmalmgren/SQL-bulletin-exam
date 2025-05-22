import pool from "../db.js";


// Kontrollera prenumeration
export async function isSubscribed(userId, channelId) {
  const result = await pool.query(
    "SELECT * FROM subscriptions WHERE user_id = $1 AND channel_id = $2",
    [userId, channelId]
  );
  return result.rows.length > 0;
}

// Lägg till en prenumeration: Användare blir medlem i en kanal
export async function addSubscription(userId, channelId) {
  try {
    const result = await pool.query(
      `INSERT INTO subscriptions (user_id, channel_id)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, channelId]
    );

    console.log('Subscription succeeded');

    return result.rows[0]; // Returnera den tillagda prenumerationen
  } catch (error) {
    console.log('Error adding subscription:', error);
    throw error;
  }
}
// Radera en prenumeration
export async function removeSubscription(userId, channelId) {
  try {
    await pool.query(
      `DELETE FROM subscriptions WHERE user_id = $1 AND channel_id = $2`,
      [userId, channelId]
    );

    return "Subscription removed";
  } catch (error) {
    console.log('Error adding subscription:', error);
    throw error;
  }
}
