import { isSubscribed } from "../models/subscriptionModel.js";
import { findMessage } from "../models/messageModel.js";
import {
  insertChannelToDb,
  findAndDeleteChannel,
  updateChannelNameIfOwner,
} from "../models/channelModel.js";

//Skapa en kanal
export const createChannel = async (req, res) => {
  const { name, owner_id } = req.body;
  if (!name || !owner_id) {
    return res
      .status(400)
      .json({ success: false, message: "name och owner_id måste anges" });
  }

  try {
    const insertedChannel = await insertChannelToDb(name, owner_id);

    res.status(201).json({
      success: true,
      message: "skapande av channels lyckades",
      data: insertedChannel,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(422).json({
        success: false,
        message: "Kanalnamnet finns redan - välj ett annat namn",
      });
    }
    res.status(500).json({
      success: false,
      message: "skapande av channels lyckades inte!",
    });
  }
};

// Hämta specifika meddelande

export const getSpecifikMessages = async (req, res) => {
  const { id: channelId } = req.params;
  const userId = parseInt(req.query.userId); //  Hämta userId från query

  if (!channelId) {
    return res.status(400).json({
      message: "Ingen channel_id i params, och det krävs!",
    });
  }

  if (!userId) {
    return res.status(401).json({
      message: "userId krävs som query parameter för att visa meddelanden",
    });
  }

  // Kontrollera om användaren är prenumererad på kanalen
  const subscribed = await isSubscribed(userId, channelId);

  if (!subscribed) {
    return res.status(403).json({
      message: "Användaren är inte medlem i denna kanal",
    });
  }

  try {
    // Hämta meddelanden för den specificerade kanalen
    const messages = await findMessage(channelId);

    // Om inga meddelanden hittas, ge en mer informativ feedback
    if (messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Inga meddelanden finns för denna kanal",
      });
    }

    // Om meddelanden finns
    res.status(200).json({
      success: true,
      message: `hämtning av meddelanden lyckades för kanalen med id ${channelId}`,
      messages,
    });
  } catch (error) {
    console.error("Fel vid hämtning:", error.message);
    res.status(500).json({
      success: false,
      message: "Fel vid hämtning av kanalens meddelanden",
    });
  }
};

// Raderar channels och skickar tillbaka res.

export const deleteChannel = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      message: "ingen channel_id i params och de krävs!",
    });
  }
  try {
    const channelToDelete = await findAndDeleteChannel(id);

    res.status(200).json({
      success: true,
      message: "raderande av channel lyckades!!",
      deleted: channelToDelete,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "raderande av channel misslyckades!",
    });
  }
};

// Uppdatera kanalnamn
export const patchChannelName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "name och user_id måste anges" });
  }

  try {

    const updatedChannel = await updateChannelNameIfOwner(id, name);

    res.status(200).json({
      success: true,
      message: "kanalnamnet har uppdaterats",
      data: updatedChannel,
    });
  } catch (error) {
    if (error.message === "Du är inte ägaren av kanalen") {
      return res.status(403).json({
        success: false,
        message: "Endast kanalens ägare får ändra namn",
      });
    }

    console.error("Fel vid uppdatering:", error);
    res.status(500).json({
      success: false,
      message: "Serverfel vid uppdatering",
    });
  }
};
