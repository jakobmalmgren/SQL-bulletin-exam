import {
  isSubscribed,
  addSubscription,
  removeSubscription,
} from "../models/subscriptionModel.js";

// Skapa prenumeration

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
    res.status(201).json(message); // 201 (CREATED)
  } catch (error) {
    console.error("Fel vid skapande av prenumeration:", error.message);
    res.status(500).json({ error: "Serverfel" });
  }
};

export const deleteSubscription = async (req, res) => {
  const { userId, channelId } = req.params;

  if (!userId || !channelId) {
    return res.status(400).json({ message: "Alla fält måste fyllas i" });
  }

  try {
    const subscribed = await isSubscribed(userId, channelId);
    if (!subscribed) {
      return res
        .status(404)
        .json({ message: "Ingen prenumeration finns för dessa värden" });
    }

    // Ta bort prenumerationen
    const message = await removeSubscription(userId, channelId);

    // använder inte message...kolla upp!

    res.status(200).json({ message: "Prenumerationen är borttagen" }); // 200 (OK)
  } catch (error) {
    console.error("Fel vid borttagning av prenumeration:", error.message);
    res.status(500).json({ error: "Serverfel" });
  }
};
