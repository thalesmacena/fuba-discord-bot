import { ICommand, IExecuteProps } from '@/app/interfaces';

const RemoveCommand: ICommand = {
  name: 'remove',
  description: 'Remove uma música da fila na posição informada',
  args: '[Posição] - uma posição na fila de reprodução',
  example: '`remove 2`',

  execute: async ({
    message,
    argsProps,
    guildQueue
  }: IExecuteProps): Promise<void> => {
    if (!message.member.voice.channel) {
      message.reply(
        'Você precisa estar em um canal de voz para passar a música'
      );
      return;
    }

    if (!guildQueue) {
      message.reply('Não existe uma fila de músicas');
      return;
    }

    const { textChannel } = guildQueue;

    const indexString = /\d+/.exec(argsProps.args[0]);

    if (!indexString) {
      textChannel.send(
        'Você precisa entrar como um numero válido, tente `$queue`'
      );
      return;
    }

    const index = parseInt(indexString[0], 10) - 1;

    if (index === 0) {
      const { dispatcher } = guildQueue.connection;

      if (dispatcher.paused) {
        dispatcher.resume();
      }

      dispatcher.end();
      return;
    }

    const songList = guildQueue.songs;

    const song = songList[index];

    if (!song) {
      textChannel.send(
        'Você precisa entrar como um numero válido da fila de músicas, tente `$queue`'
      );
      return;
    }

    const sendMessage = await textChannel.send(
      `⏏ Removendo ${song.title} na posição ${index + 1} da fila de Reprodução`
    );

    guildQueue.totalTime -= song.length;

    songList.splice(index, 1);

    for (let i = index; i < songList.length; i += 1) {
      songList[i].upTime -= song.length;
    }

    sendMessage.edit(
      `⏏ ${song.title} na posição ${
        index + 1
      } da fila de Reprodução foi removida`
    );
  }
};

export default RemoveCommand;
