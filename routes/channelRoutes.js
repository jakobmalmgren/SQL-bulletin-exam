import express from "express";
import { createChannel, patchChannelName } from "../controllers/channelController.js";
const router = express.Router();

router.post("/", createChannel);
router.patch("/:id", patchChannelName)
export default router;
