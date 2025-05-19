import { insertMessage } from "../models/messageModel.js";
import { isSubscribed } from "../models/subscriptionModel.js";

export const createMessage = async (req, res) => {
  const { content, user_id, channel_id } = req.body;

  if (!content || !user_id || !channel_id) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }

  try {
    const subscribed = await isSubscribed(user_id, channel_id);

    if (!subscribed) {
      return res.status(403).json({ message: "Användaren är inte medlem i kanalen" });
    }

    const message = await insertMessage(content, user_id, channel_id);
    res.status(201).json(message);

  } catch (error) {
    console.error("Fel vid skapande av meddelande:", error.message);
    res.status(500).json({ error: "Serverfel" });
  }
};
