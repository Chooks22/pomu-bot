import { defineConfig } from 'chooksie'

export default defineConfig({
  token: process.env.DISCORD_BOT_TOKEN,
  devServer: process.env.DISCORD_DEV_SERVER,
  intents: [],
})
