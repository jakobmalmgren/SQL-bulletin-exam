import { insertMessage, updateMessageContent } from "../models/messageModel.js";
import { isSubscribed } from "../models/subscriptionModel.js";

// Skapa meddelande
export const createMessage = async (req, res) => {
  const { content, user_id, channel_id } = req.body;

  if (!content || !user_id || !channel_id) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }

  try {
    const subscribed = await isSubscribed(user_id, channel_id);

    if (!subscribed) {
      return res
        .status(403)
        .json({ message: "Användaren är inte medlem i kanalen" });
    }

    const message = await insertMessage(content, user_id, channel_id);
    res.status(201).json({ message: "Meddelande skapat!", success: true, data: message });
  } catch (error) {
    console.error("Fel vid skapande av meddelande:", error.message);
    res.status(500).json({ error: "Serverfel" });
  }
};

// Uppdatera meddelande
export const updateMessage = async (req, res) => {
  // PK - ID:t
  const { id } = req.params; // id:t måste skickas med i url
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      message: "Innehåll krävs för att uppdatera/redigera meddelandet",
    });
  }

  try {
    const updated = await updateMessageContent(id, content);

    if (!updated) {
      return res.status(404).json({ message: "Meddelandet hittades inte" });
    }

    res.status(200).json({ message: "Meddelande uppdaterat!", success: true, data: updated });
  } catch (error) {
    console.error("Fel vid uppdatering", error.message);
    res.status(500).json({ error: "Serverfel vid uppdatering" });
  }
};
