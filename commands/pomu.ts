import { CommandInteraction, defineCommand } from 'chookscord';
import fetch from 'node-fetch';

interface PomuCount {
  success: boolean;
  count: string;
}

const pomu = {
  async get(interaction: CommandInteraction) {
    const response = await fetch('https://impomu.com/get', {
      method: 'POST',
    });

    if (!response.ok) {
      interaction.reply('Failed to get Pomu count!');
      return;
    }

    const data = await response.json() as PomuCount;
    const pomus = Number(data.count).toLocaleString('en-GB');
    interaction.reply(`Total Pomus: ${pomus}`);
  },
  async add(interaction: CommandInteraction) {
    const response = await fetch('https://impomu.com/add');
    if (response.ok) {
      interaction.reply('I\'m Pomu!');
    } else {
      interaction.reply('Pomu\'s not here right now');
    }
  },
};

export default defineCommand({
  name: 'pomu',
  description: 'Im Pomu',
  execute({ interaction }) {
    if (!interaction.options) return;
    const subCommand = interaction.options.getSubcommand() as keyof typeof pomu;
    pomu[subCommand](interaction);
  },
  options: [
    {
      name: 'get',
      description: 'Get total Pomus',
      type: 1 as any,
    },
    {
      name: 'add',
      description: 'Add a Pomu',
      type: 1 as any,
    },
  ],
});
