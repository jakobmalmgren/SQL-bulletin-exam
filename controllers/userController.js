import { createUser } from '../models/userModel.js';

export async function createUserController(req, res) {
    const {name, email} = req.body

    if (!name || !email) {
        return res.status(400).json({ error: "Krävs namn och e-post" })
    }

    try {
        const newUser = await createUser(name, email)
        res.status(201).json(newUser)
    } catch (error) {
        console.error("Fel vid försök att skapa användare", error.message)
        res.status(500).json({ error: "Gick ej skapa användare" })
    }
} 