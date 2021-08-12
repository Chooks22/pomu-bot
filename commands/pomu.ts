import { CommandInteraction, defineCommand, FetchUtil } from 'chookscord';

interface PomuCount {
  success: boolean;
  count: string;
}

const pomu = {
  async get(fetch: FetchUtil, interaction: CommandInteraction) {
    const response = await fetch('https://impomu.com/add');
    if (response.ok) {
      interaction.reply('I\'m Pomu!');
    } else {
      interaction.reply('Pomu\'s not here right now');
    }
  },
  async add(fetch: FetchUtil, interaction: CommandInteraction) {
    const response = await fetch.get<PomuCount>('https://impomu.com/get');
    if (!response.ok) {
      interaction.reply('Failed to get Pomu count!');
      return;
    }
    const pomus = Number(response.data.count).toLocaleString('en-GB');
    interaction.reply(`Total Pomus: ${pomus}`);
  },
};

export default defineCommand({
  name: 'pomu',
  description: 'Im Pomu',
  execute({ fetch, interaction }) {
    if (!interaction.options) return;
    const subCommand = interaction.options.getSubcommand() as keyof typeof pomu;
    pomu[subCommand](fetch, interaction);
  },
  options: [
    {
      name: 'get',
      description: 'Get total Pomus',
      type: 'SUB_COMMAND',
    },
    {
      name: 'add',
      description: 'Add a Pomu',
      type: 'SUB_COMMAND',
    },
  ],
});
