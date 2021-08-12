import { defineEvent } from 'chookscord';

export default defineEvent({
  name: 'ready',
  once: true,
  execute() {
    console.info('I\'m Pomu!');
  },
});
