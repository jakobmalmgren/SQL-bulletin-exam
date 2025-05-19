import pool from "../db.js";

export const createMessage = async (req, res) => {
    const { content, user_id, channel_id } = req.body

    try {
        // kontrollera om prenumeration finns
        const subRes = await pool.query(
            "SELECT * FROM subscriptions WHERE user_id = $1 AND channel_id = $2",
            [user_id, channel_id]
        )
        if (subRes.rows.length === 0) {
            return res.status(403).json({ message: "Användaren är inte medlem i kanalen"})
        }
        // skapa meddelandet
        const result = await pool.query(
            `INSERT INTO messages (content, user_id, channel_id)
            VALUES ($1 , $2, $3)
            RETURNING *`,
            [content, user_id, channel_id]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error("fel vid skapande av meddelande", error.message)
        res.status(500).json({ error: "Server fel"})
    }
}