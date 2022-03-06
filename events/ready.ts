import { defineEvent } from 'chooksie'

export default defineEvent({
  name: 'ready',
  once: true,
  execute({ logger }, client) {
    logger.info('I\'m Pomu!')
    logger.info(`Servers: ${client.guilds.cache.size}`)
  },
})
