import express from "express";

import {
  createChannel,
  deleteChannel,
  getSpecifikMessages,
  patchChannelName,
} from "../controllers/channelController.js";

const router = express.Router();

router.post("/", createChannel);
router.get("/:id/messages", getSpecifikMessages);
router.delete("/:id", deleteChannel);
router.patch("/:id", patchChannelName);

export default router;
