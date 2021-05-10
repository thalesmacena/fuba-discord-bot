import { ICommand, IExecuteProps } from '@/app/interfaces';
import { Collection, Message } from 'discord.js';

const ClearCommand: ICommand = {
  name: 'clear',
  description:
    'Deleta uma quantidade informada de mensagens de até 2 semanas atrás, e preciso ter permissão para apagar mensagens para porder utilizar esse comando',
  args: '[limite] - o número de mensagens a serem apagadas',
  example: '`clear 10`',

  execute: async ({ message, argsProps }: IExecuteProps): Promise<void> => {
    if (message.channel.type === 'dm') {
      message
        .reply('Esse comando só pode ser usado dentro de um servidor')
        .then((messageReply) => {
          messageReply.delete({ timeout: 15000 });
        });
      return;
    }

    const permission = message.member.hasPermission('MANAGE_MESSAGES');

    if (!permission) {
      message
        .reply('Você não está autorizado a usar este comando')
        .then((messageReply) => {
          messageReply.delete({ timeout: 15000 });
        });
      return;
    }

    if (!argsProps.args[0] || !Number(argsProps.args[0])) {
      message
        .reply(
          `Você precisa informar o argumento \`limite\` corretamente, tente \`${process.env.DISCORD_PREFIX}help clear\``
        )
        .then((messageReply) => {
          messageReply.delete({ timeout: 15000 });
        });

      return;
    }

    const limit = Number(argsProps.args[0]);

    if (limit > 100 || limit < 2) {
      message
        .reply('O limite precisa estar entre 2 e 100')
        .then((messageReply) => {
          messageReply.delete({ timeout: 15000 });
        });
      return;
    }

    const textChannel = message.channel;

    await textChannel
      .bulkDelete(limit, true)
      .then((messages: Collection<string, Message>) => {
        message.channel
          .send(`${messages.size} mensagens foram deletadas.`)
          .then((messageReply) => {
            messageReply.delete({ timeout: 15000 });
          });
      })
      .catch(() => {
        message.reply('Houve um erro ao deletar as mensagens');
      });
  }
};

export default ClearCommand;
