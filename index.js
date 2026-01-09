import express from "express"
import { Client, GatewayIntentBits } from "discord.js"

const app = express()
app.use(express.json())

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

const TOKEN = process.env.DISCORD_TOKEN
const CHANNEL_ID = process.env.CHANNEL_ID

client.once("ready", () => {
  console.log(`Bot logged in as ${client.user.tag}`)
})

app.post("/server-up", async (req, res) => {
  try {
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
    res.status(500).json({ error: "Failed to send message" })
  }
})

client.login(TOKEN)

app.listen(3000, () => {
  console.log("HTTP server running on port 3000")
})
