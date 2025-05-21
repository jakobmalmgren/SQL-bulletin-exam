import pool from "../db.js";

//.' hämtar endast kolumner från channels
// JOIN mellan channels och subsrcriptions
// ON kopplar varje kanal till prenumerationerna
// WHERE filtrerar fram bara kanaler som användaren prenumererar på
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

// const insertChannelToDb = async (name, owner_id) => {

export const insertChannelToDb = async (name, owner_id) => {
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
// Uppdatera kanalnam om användaren är owner
// export const updateChannelNameIfOwner = async (newName, channel_id, user_id) => {
//   const result = await pool.query(
//     `UPDATE channels
//     SET name = $1
//     WHERE id = $2 AND owner_id = $3
//     RETURNING *`,
//     [newName, channel_id, user_id]
//   )
//   if (result.rows.length === 0) {
//     throw new Error("Du är inte ägaren av kanalen")
//   }
//   return result.rows[0]
// }
export const updateChannelNameIfOwner = async (id, newName) => {
  //check här..:
  // även

  // const checkIfOwner = await pool.query(
  //   "SELECT * FROM channels WHERE id = $1 AND owner_id = $2",
  //   [id, owner_id] // owner_id måste komma from body sen i
  //   //  patchChannelName  funktionen i channelcontrollern
  //   // gör de ihop imorn! eller få in en middleware?
  // );

  // if (checkIfOwner.rows.length === 0) {
  //   return res.status(403).json({
  //     success: false,
  //     message: "Endast kanalens ägare har tillgång",
  //   });
  // }
  //sen även ta väck if där nere..
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

// NY ...SKA IN I MESSAGE MODELS!!!!!!!!!!!!
// export const findMessage = async (channel_id) => {
//   try {
//     const messageContent = await pool.query(
//       "SELECT content FROM messages WHERE channel_id=$1",
//       [channel_id]
//     );
//     return messageContent.rows;
//   } catch (error) {
//     console.error("Fel vid hämtning av meddelande:", error);
//   }
// };

// delete funktion som hittar channel ID och deletar de
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
