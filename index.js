import express from "express"
import { Client, GatewayIntentBits, Events } from "discord.js"

const app = express()
app.use(express.json())

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

const TOKEN = process.env.DISCORD_TOKEN
const CHANNEL_ID = process.env.CHANNEL_ID

let isReady = false

client.once(Events.ClientReady, () => {
  console.log(`Bot logged in as ${client.user.tag}`)
  isReady = true
})

app.post("/server-up", async (req, res) => {
  try {
    if (!isReady) return res.status(503).json({ error: "Bot not ready" })

    const channel = await client.channels.fetch(CHANNEL_ID)

    await channel.send({
      content: `@here @everyone

**The server is back up.**

\`F8 connect xj6d8r\`

https://cfx.re/join/xj6d8r`
    })

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Send failed" })
  }
})

client.login(TOKEN)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("HTTP server running on port " + PORT)
})
