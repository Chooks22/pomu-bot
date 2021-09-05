import { defineEvent } from 'chookscord';

export default defineEvent({
  name: 'ready',
  once: true,
  execute({ logger }) {
    logger.info('I\'m Pomu!');
  },
});
