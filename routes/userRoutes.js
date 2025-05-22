import express from 'express'
import { createUserController, getUserChannels } from '../controllers/userController.js'

const router = express.Router()

router.post("/", createUserController)
router.get("/:id/channels", getUserChannels)

export default router