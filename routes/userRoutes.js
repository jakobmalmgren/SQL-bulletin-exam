import express from 'express'
import { createUserController, getUserChannels } from '../controllers/userController.js'

const router = express.Router()

// POST
router.post("/", createUserController)

export default router

// GET
router.get("/:id/channels", getUserChannels)