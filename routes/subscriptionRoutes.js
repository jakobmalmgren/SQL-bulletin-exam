import express from "express";
import { createSubscription, deleteSubscription } from "../controllers/subscriptionController.js";

const router = express.Router()

router.post("/", createSubscription)
router.delete("/:userId/:channelId", deleteSubscription); 

export default router