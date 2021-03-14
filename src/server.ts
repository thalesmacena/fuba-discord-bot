import { Message } from 'discord.js';
import ClientBot from './client';
import { routes } from './routes';

const { client, commands, guildsQueuesSongs } = ClientBot;

client.once('ready', () => {
  client.user.setActivity(`${process.env.DISCORD_PREFIX}help`);
});

client.on('message', (message: Message) => {
  routes(message, commands, guildsQueuesSongs);
});

client.login();

export { client, commands, guildsQueuesSongs };
