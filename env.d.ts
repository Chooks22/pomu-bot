declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_BOT_TOKEN: string
      DISCORD_DEV_SERVER: string
    }
  }
}

export {}
