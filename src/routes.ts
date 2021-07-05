import { ICommand, IGuildQueue } from '@/app/interfaces';
import { Collection, Message } from 'discord.js';
import 'dotenv/config';

export const routes = (
  message: Message,
  commands: Collection<string, ICommand>,
  guildsQueuesSongs: Collection<string, IGuildQueue>
): void => {
  const prefix = process.env.DISCORD_PREFIX;

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const formmatedInput = message.content.slice(prefix.length).trim();
  const args = formmatedInput.split(' ');
  const command = args.shift().toLowerCase();
  const commandBody = formmatedInput
    .slice(
      formmatedInput.indexOf(' ') >= 0
        ? formmatedInput.indexOf(' ')
        : command.length
    )
    .trimStart();

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
    guildQueue,
    queue: guildsQueuesSongs
  };

  try {
    commands.get(command).execute(commandProps);
  } catch {
    message.reply('Ocorreu um erro ao executar o comando');
  }
};
