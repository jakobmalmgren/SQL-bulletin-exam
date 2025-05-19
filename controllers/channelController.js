import insertChannelToDb from "../models/channelModel.js";
export const createChannel = async (req, res) => {
  const { name, owner_id } = req.body;
  if (!name || !owner_id) {
    return res
      .status(400)
      .json({ success: false, message: "name och owner_id måste anges" });
  }
  try {
    const insertedChannel = await insertChannelToDb(name, owner_id);

    res.status(200).json({
      success: true,
      message: "skapande av channels lyckades",
      data: insertedChannel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "skapande av channels lyckades inte!",
    });
  }
};
