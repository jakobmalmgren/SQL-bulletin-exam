import pool from "../db.js";

  //.' hämtar endast kolumner från channels
  // JOIN mellan channels och subsrcriptions
  // ON kopplar varje kanal till prenumerationerna
  // WHERE filtrerar fram bara kanaler som användaren prenumererar på
export async function getChannelsForUser (userId) {
  const result = await pool.query(
    `SELECT channels.*
     FROM channels
     JOIN subscriptions ON channels.id = subscriptions.channel_id
     WHERE subscriptions.user_id = $1`,
     [userId]
  );
  return result.rows;
}

const insertChannelToDb = async (name, owner_id) => {
  try {
    const createdChannelDb = await pool.query(
      "INSERT INTO channels(name,owner_id)VALUES($1,$2) RETURNING *",
      [name, owner_id]
    );
    console.log("inserrrrrrt", createdChannelDb.rows[0]);
    return createdChannelDb.rows[0];
  } catch (error) {
    console.error("Fel i insertChannelToDb:", error); // för felsökning
    throw error; // 👈 Skicka vidare exakt felobjektet (inte nytt Erro
  }
};

export default insertChannelToDb;
