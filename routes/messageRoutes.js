import express from "express";
import { createMessage, updateMessage } from "../controllers/messageController.js";


const router = express.Router()

router.post("/", createMessage)

router.patch("/:id", updateMessage)

export default router