import { defineSubCommand } from 'chookscord';

interface PomuCount {
  success: boolean;
  count: string;
}

function parsePomu(data: PomuCount): string {
  return Number(data.count).toLocaleString('en-GB');
}

export default defineSubCommand({
  name: 'pomu',
  description: 'Im Pomu',
  options: [
    {
      name: 'get',
      description: 'Get total Pomus',
      type: 'SUB_COMMAND',
      async execute({ fetch, interaction }) {
        const response = await fetch.post<PomuCount>('https://impomu.com/get');

        if (!response.ok) {
          interaction.reply('Failed to get Pomu count!');
          return;
        }

        const pomus = parsePomu(response.data);
        interaction.reply(`Total Pomus: ${pomus}`);
      },
    },
    {
      name: 'add',
      description: 'Add a Pomu',
      type: 'SUB_COMMAND',
      async execute({ fetch, interaction }) {
        const response = await fetch('https://impomu.com/add');
        if (response.ok) {
          interaction.reply('I\'m Pomu!');
        } else {
          interaction.reply('Pomu\'s not here right now');
        }
      },
    },
  ],
});
