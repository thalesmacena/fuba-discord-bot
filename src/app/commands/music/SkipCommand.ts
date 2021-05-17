import { ICommand, IExecuteProps } from '@/app/interfaces';
import { musicPlayer } from '@/app/utils/musicPlayer';

const SkipCommand: ICommand = {
  name: 'skip',
  description: 'Pula uma música na lista de reprodução',
  args: 'Nenhum argumento',
  example: '`skip`',

  execute: async ({
    message,
    argsProps,
    guildQueue,
    queue
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

    const { dispatcher } = guildQueue.connection;

    if (dispatcher.paused) {
      dispatcher.resume();
    }

    const indexString = /\d+/.exec(argsProps.args[0]);

    if (indexString) {
      const index = parseInt(indexString[0], 10) - 1;
      const songList = guildQueue.songs;
      const song = songList[index];

      if (!song) {
        textChannel.send(
          'Você precisa entrar como um numero válido da fila de músicas, tente `$queue`'
        );
        return;
      }

      textChannel.send(
        `⏭ Pulando para ${song.title} na posição ${
          index + 1
        } da fila de Reprodução`
      );

      const newSongList = songList.slice(index);
      const removedSongList = songList.slice(0, index);

      let uptime = 0;

      removedSongList.forEach((songInList) => {
        guildQueue.totalTime -= songInList.length;
        uptime += songInList.length;
      });

      newSongList.forEach((songInList) => {
        songInList.upTime -= uptime;
      });

      guildQueue.songs = newSongList;

      musicPlayer(guildQueue.songs[0], message.guild.id, queue);

      return;
    }

    dispatcher.end();

    textChannel.send('⏭  **Música pulada**');
  }
};

export default SkipCommand;
