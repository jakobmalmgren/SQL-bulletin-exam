import { isSubscribed, addSubscription } from "../models/subscriptionModel.js";

export const createSubscription = async (req, res) => {
  const { user_id, channel_id } = req.body;

  if (!user_id || !channel_id) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }

  try {
    const subscribed = await isSubscribed(user_id, channel_id);

    if (subscribed) {
      return res.status(403).json({ message: "Användaren är redan medlem" });
    }

    const message = await addSubscription(user_id, channel_id);
    res.status(201).json(message);

  } catch (error) {
    console.error("Fel vid skapande av prenumeration:", error.message);
    res.status(500).json({ error: "Serverfel" });
  }
};
