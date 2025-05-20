import express from "express";

import {
  createChannel,
  deleteChannel,
  getSpecifikMessages,
  patchChannelName 
} from "../controllers/channelController.js";



router.post("/", createChannel);
router.get("/:id/messages", getSpecifikMessages);
router.delete("/:id", deleteChannel);


// import { createChannel, patchChannelName } from "../controllers/channelController.js";
const router = express.Router();


router.patch("/:id", patchChannelName)

export default router;
