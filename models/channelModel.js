import pool from "../db.js";

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

// NY ...SKA IN I MESSAGE MODELS!!!!!!!!!!!!
export const findMessage = async (channel_id) => {
  try {
    const messageContent = await pool.query(
      "SELECT content FROM messages WHERE channel_id=$1",
      [channel_id]
    );
    return messageContent.rows;
  } catch (error) {
    console.error("Fel vid hämtning av meddelande:", error);
  }
};

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
