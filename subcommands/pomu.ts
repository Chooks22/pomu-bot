import { defineSlashSubcommand, defineSubcommand } from 'chooksie'
import { fetch } from 'chooksie/fetch'
import type { CommandInteraction } from 'discord.js'

interface PomuCount {
  success: boolean
  count: string
}

function parsePomu(data: PomuCount): string {
  return Number(data.count)
    .toLocaleString('en-GB')
}

async function reply(
  interaction: CommandInteraction,
  content: string,
  ephemeral = false,
): Promise<void> {
  await interaction.reply({
    content,
    ephemeral,
  })
}

export default defineSlashSubcommand({
  name: 'pomu',
  description: 'I\'m Pomu!',
  options: [
    defineSubcommand({
      name: 'get',
      description: 'Get total Pomudachis.',
      type: 'SUB_COMMAND',
      async execute({ interaction }) {
        const response = await fetch.post('https://impomu.com/get')
        if (response.ok) {
          const data = await response.json() as PomuCount
          reply(interaction, `Total Pomudachis: ${parsePomu(data)}`)
        } else {
          reply(interaction, 'Failed to count Pomudachis!', true)
        }
      },
    }),
    defineSubcommand({
      name: 'add',
      description: 'Add a Pomudachi.',
      type: 'SUB_COMMAND',
      async execute({ interaction }) {
        const response = await fetch('https://impomu.com/add')
        await reply(
          interaction,
          response.ok
            ? 'I\'m Pomu!'
            : 'Pomu\'s not here right now.',
          !response.ok,
        )
      },
    }),
  ],
})
