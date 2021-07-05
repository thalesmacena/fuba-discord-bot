import { ICommand, IExecuteProps, IGuildQueue, ISong } from '@/app/interfaces';
import { musicPlayer } from '@/app/utils/musicPlayer';
import { Embed } from '@/app/views/embed';
import { addSeconds, format } from 'date-fns';
import ytsr from 'ytsr';

const PlayCommand: ICommand = {
  name: 'play',
  description: 'Coloca uma música para tocar na fila de reprodução da guilda',
  args: '[query] - a busca referente ao video que será tocado',
  example: '`play SongName - BandName`',

  execute: async ({
    message,
    argsProps,
    guildQueue,
    queue
  }: IExecuteProps): Promise<void> => {
    if (message.channel.type !== 'text') {
      message.reply(
        'Você precisa estar em uma guilda para utilizar esse comando'
      );
      return;
    }

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      message.reply(
        'Você precisa estar em um canal de voz para tocar uma música'
      );
      return;
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      message.reply(
        'Eu preciso ter permissões para me conectar e falar neste canal de voz'
      );
      return;
    }

    const search = argsProps.commandBody;

    message.channel.send(`Buscando :mag_right: \`${search}\` `);

    const video = await ytsr(search, { limit: 1 });

    const videoDetails = video.items[0];

    if (videoDetails.type !== 'video') {
      message.reply('Você precisa informar um video');
      return;
    }

    const length = videoDetails.duration
      .split(':')
      .reverse()
      .reduce((prev, curr, i) => prev + Number(curr) * 60 ** i, 0 - 1);

    const song: ISong = {
      title: videoDetails.title,
      url: videoDetails.url,
      channel: videoDetails.author.name,
      length,
      thumbnail: videoDetails.bestThumbnail.url,
      user: message.author.toString(),
      upTime: 0,
      embed: new Embed()
    };

    song.embed
      .addFields(
        { name: 'Canal:', value: song.channel, inline: true },
        {
          name: 'Duração:',
          value:
            song.length >= 3600
              ? format(addSeconds(new Date(0), song.length), 'HH:mm:ss')
              : format(addSeconds(new Date(0), song.length), 'mm:ss'),
          inline: true
        },
        { name: 'Requisitante', value: song.user }
      )
      .setThumbnail(song.thumbnail)
      .setURL(song.url)
      .setTimestamp();

    if (!guildQueue) {
      const newQueue: IGuildQueue = {
        textChannel: message.channel,
        voiceChannel,
        connection: null,
        songs: [],
        totalTime: 0,
        volume: 50
      };

      newQueue.totalTime += song.length;
      queue.set(message.guild.id, newQueue);
      newQueue.songs.push(song);

      try {
        const connection = await voiceChannel.join();
        newQueue.connection = connection;
        message.channel.send(
          `🔊 **Conectada à** ${newQueue.voiceChannel.toString()} e :page_facing_up: **vinculado ao** ${newQueue.textChannel.toString()}`
        );
        musicPlayer(newQueue.songs[0], message.guild.id, queue);
      } catch (err) {
        queue.delete(message.guild.id);
        message.reply('Ocorreu um erro ao tocar a musica', err);
      }
      return;
    }

    song.upTime += guildQueue.totalTime;
    guildQueue.songs.push(song);
    guildQueue.totalTime += song.length;

    song.embed.setTitle(`🎵 ${song.title} foi adicionada a fila`);

    message.channel.send(song.embed);
  }
};

export default PlayCommand;
