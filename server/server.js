import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))

const dataDir = path.join(process.cwd(), 'data')
const messagesFile = path.join(dataDir, 'messages.json')

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true })
    try {
      await fs.access(messagesFile)
    } catch {
      await fs.writeFile(messagesFile, JSON.stringify([], null, 2))
    }
  } catch (error) {
    console.error('Erreur lors de la création du dossier data:', error)
  }
}

async function readMessages() {
  try {
    const data = await fs.readFile(messagesFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Erreur lors de la lecture des messages:', error)
    return []
  }
}

async function saveMessages(messages) {
  try {
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2))
    return true
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des messages:', error)
    return false
  }
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Tous les champs sont requis'
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Format d\'email invalide'
      })
    }

    const newMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      read: false
    }

    const messages = await readMessages()

    messages.push(newMessage)

    const saved = await saveMessages(messages)

    if (saved) {
      console.log(`Nouveau message reçu de ${name} (${email})`)
      res.json({
        success: true,
        message: 'Message reçu avec succès',
        id: newMessage.id
      })
    } else {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la sauvegarde du message'
      })
    }
  } catch (error) {
    console.error('Erreur lors du traitement du message:', error)
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    })
  }
})

app.get('/api/messages', async (req, res) => {
  try {
    const adminToken = req.headers.authorization?.replace('Bearer ', '')
    if (adminToken !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({
        success: false,
        error: 'Non autorisé'
      })
    }

    const messages = await readMessages()
    res.json({
      success: true,
      messages: messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error)
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur'
    })
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    error: 'Erreur interne du serveur'
  })
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint non trouvé'
  })
})

async function startServer() {
  await ensureDataDir()

  app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur le port ${PORT}`)
    console.log(`📁 Les messages seront sauvegardés dans: ${messagesFile}`)
    console.log(`🌍 Frontend autorisé: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
  })
}

startServer().catch(console.error)