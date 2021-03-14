import { Collection, Message } from 'discord.js';
import 'dotenv/config';
import { ICommand, IGuildQueue } from './app/api';

export const routes = (
  message: Message,
  commands: Collection<string, ICommand>,
  guildsQueuesSongs: Collection<string, IGuildQueue>
): void => {
  const prefix = process.env.DISCORD_PREFIX;

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length).trim();
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (!commands.has(command)) {
    message.reply(`Comando não encontrado, tente ${prefix}help`);
    return;
  }

  const argsProps = {
    commandBody,
    args
  };

  const guildQueue = guildsQueuesSongs.get(message.guild.id);

  const commandProps = {
    message,
    argsProps,
    guildQueue
  };

  try {
    commands.get(command).execute(commandProps);
  } catch {
    message.reply('Ocorreu um erro ao executar o comando');
  }
};
