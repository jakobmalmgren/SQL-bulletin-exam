import pool from "../db.js";

//.' hämtar endast kolumner från channels
// JOIN mellan channels och subscriptions
// ON kopplar varje kanal till prenumerationerna
// WHERE filtrerar fram kanaler som bara användaren prenumererar på

export async function getChannelsForUser(userId) {
  const result = await pool.query(
    `SELECT channels.*
     FROM channels
     JOIN subscriptions ON channels.id = subscriptions.channel_id
     WHERE subscriptions.user_id = $1`,
    [userId]
  );
  return result.rows;
}

export const insertChannelToDb = async (name, owner_id) => {
  try {
    const createdChannelDb = await pool.query(
      "INSERT INTO channels(name,owner_id)VALUES($1,$2) RETURNING *",
      [name, owner_id]
    );
    console.log("inserrrrrrt", createdChannelDb.rows[0]);
    return createdChannelDb.rows[0];
  } catch (error) {
    throw error;
  }
};
// Uppdatera kanalnamn om användaren är owner
export const updateChannelNameIfOwner = async (id, newName) => {
 
  const result = await pool.query(
    `UPDATE channels
    SET name = $1
    WHERE id = $2 
    RETURNING *`,
    [newName, id]
  );
  if (result.rows.length === 0) {
    throw new Error("Du är inte ägaren av kanalen");
  }
  return result.rows[0];
};

// Delete-funktion som hittar channel ID och raderar den
export const findAndDeleteChannel = async (id) => {
  try {
    const channel = await pool.query(
      "DELETE FROM channels WHERE id=$1 RETURNING *",
      [id]
    );
    return channel.rows;
  } catch (error) {
    console.error("Hittades inte channel att deleta:", error);
  }
};

export default insertChannelToDb;
