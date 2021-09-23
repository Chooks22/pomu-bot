import type { CommandInteraction } from 'chookscord/discordjs';
import { defineSubCommand } from 'chookscord';

interface PomuCount {
  success: boolean;
  count: string;
}

function parsePomu(data: PomuCount): string {
  return Number(data.count)
    .toLocaleString('en-GB');
}

async function reply(
  interaction: CommandInteraction,
  content: string,
  ephemeral = false,
): Promise<void> {
  await interaction.reply({
    content,
    ephemeral,
  });
}

export default defineSubCommand({
  name: 'pomu',
  description: 'I\'m Pomu!',
  options: [
    {
      name: 'get',
      description: 'Get total Pomudachis.',
      type: 'SUB_COMMAND',
      async execute({ fetch, interaction }) {
        const response = await fetch.post<PomuCount>('https://impomu.com/get');
        await reply(
          interaction,
          response.ok
            ? `Total Pomudachis: ${parsePomu(response.data)}`
            : 'Failed to count Pomudachis!',
          !response.ok,
        );
      },
    },
    {
      name: 'add',
      description: 'Add a Pomudachi.',
      type: 'SUB_COMMAND',
      async execute({ fetch, interaction }) {
        const response = await fetch('https://impomu.com/add');
        await reply(
          interaction,
          response.ok
            ? 'I\'m Pomu!'
            : 'Pomu\'s not here right now.',
          !response.ok,
        );
      },
    },
  ],
});
