import {insertChannelToDb, updateChannelNameIfOwner } from "../models/channelModel.js";


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
        message: "Kanalnamnet finns redan – välj ett annat namn",
      });
    }
    res.status(500).json({
      success: false,
      message: "skapande av channels lyckades inte!",
    });
  }
};

export const patchChannelName = async (req, res) => {
  const { id } = req.params
  const { name, user_id } = req.body

  if(!name || !user_id) {
    return res.status(400).json({ success: false, message: "name och user_id måste anges"})
  }

  try {
    const updatedChannel = await updateChannelNameIfOwner(id, name, user_id)

      res.status(200).json({
        success: true,
        message: "kanalnamnet har uppdaterats",
        data: updatedChannel,
      })
  } catch (error) {
    if (error.message === "Du är inte ägaren av kanalen") {
      return res.status(403).json({
        success: false,
        message: "Endast kanalens ägare får ändra namn"
      })
    }

    console.error("Fel vid uppdatering:", error)
    res.status(500).json({
      success: false,
      message: "Serverfel vid uppdatering"
    })
  }
}