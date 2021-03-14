import { addSeconds, format } from 'date-fns';
import { ICommand, IExecuteProps } from '../../api';
import { Embed } from '../../views/embed';

const QueueCommand: ICommand = {
  name: 'queue',
  description:
    'Mostra as informações sobre a fila de reprodução ou sobre uma música em uma posição da fila',
  args: '[Posição ou nada] - uma posição na fila de reprodução',
  example: '`queue 2` ou apenas `queue`',

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

    if (argsProps.args[0] === undefined) {
      const embed = new Embed();
      embed
        .setThumbnail(guildQueue.songs[0].thumbnail)
        .setTitle(`Fila de Reprodução de ${message.guild.toString()}`)
        .setDescription(
          `Tempo total da fila: ${format(
            addSeconds(new Date(0), guildQueue.totalTime),
            'HH:mm:ss'
          )}`
        );

      guildQueue.songs.forEach((song, index) => {
        const formatedLength =
          song.length >= 3600
            ? format(addSeconds(new Date(0), song.length), 'HH:mm:ss')
            : format(addSeconds(new Date(0), song.length), 'mm:ss');

        const formatedUpTime =
          song.upTime >= 3600
            ? format(addSeconds(new Date(0), song.upTime), 'HH:mm:ss')
            : format(addSeconds(new Date(0), song.upTime), 'mm:ss');

        embed.addField(
          `${index + 1} - ${song.title}`,
          `Duração: ${formatedLength} | Uptime: ${formatedUpTime}`
        );
      });

      textChannel.send(embed);
      return;
    }

    const index = /\d+/.exec(argsProps.args[0]);

    if (!index) {
      textChannel.send(
        'Você precisa entrar como um numero válido, tente `$help queue`'
      );
      return;
    }

    const position = Number(index[0]) - 1;

    let embed: Embed;

    try {
      embed = guildQueue.songs[position].embed;
      embed.setTitle(guildQueue.songs[position].title);
      textChannel.send(embed);
      return;
    } catch {
      textChannel.send(
        'Você precisa entrar com uma posição da fila, tente `$queue`'
      );
    }
  }
};

export default QueueCommand;
