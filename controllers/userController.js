import { createUser } from '../models/userModel.js';
import { getChannelsForUser } from '../models/channelModel.js';

// Skapa ny användare
export async function createUserController(req, res) {
    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Krävs namn och e-post."
        })
    }

    try {
        const newUser = await createUser(name, email)
        res.status(201).json({
            success: true,
            message: "Användare skapad.",
            data: newUser
        })
    } catch (error) {
        console.error("Fel vid försök att skapa användare.", error.message)
        res.status(500).json({
            success: false,
            message: "Gick ej att skapa användare.",
            error: error.message
        })
    }
}

//Hämta användarens kanaler
export async function getUserChannels(req, res) {
    const userId = req.params.id

    try {
        const channels = await getChannelsForUser(userId)

        if (channels.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Användaren är inte medlem i några kanaler."
            })
        }

        res.status(200).json({
            success: true,
            message: "Hämtning av användarens kanaler lyckades.",
            data: channels
        })

    } catch (error) {
        console.error("Fel vid försök att hämta användarens kanaler:", error.message)

        res.status(500).json({
            success: false,
            message: "Serverfel",
            error: error.message
        })
    }
}