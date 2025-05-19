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

export default insertChannelToDb;
