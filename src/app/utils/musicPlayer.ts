import { IGuildQueue, ISong } from '@/app/interfaces';
import { Collection, StreamDispatcher } from 'discord.js';
import ytdl from 'ytdl-core';

export const musicPlayer = async (
  song: ISong,
  guildId: string,
  queue: Collection<string, IGuildQueue>
): Promise<void> => {
  const guildQueue = queue.get(guildId);
  const { textChannel } = guildQueue;

  if (!song) {
    try {
      guildQueue.voiceChannel.leave();
      queue.delete(guildId);
      textChannel.send('⏹ **A fila terminou**');
    } catch {
      textChannel.send('⏹ **Houve um erro ao encerrar a fila**');
    }
    return;
  }

  let dispatcher: StreamDispatcher;

  try {
    dispatcher = guildQueue.connection
      .play(ytdl(song.url, { quality: 'highestaudio' }))
      .on('finish', () => {
        const length = guildQueue.songs[0] ? guildQueue.songs[0].length : 0;
        guildQueue.totalTime -= length;
        guildQueue.songs.forEach((music) => {
          music.upTime -= length;
        });

        guildQueue.songs.shift();

        musicPlayer(guildQueue.songs[0], guildId, queue);
      })
      .on('error', () => {
        try {
          textChannel.send('Houve um erro ao reproduzir essa música');
          queue.delete(guildId);
        } catch {
          queue.delete(guildId);
        }
      });
  } catch {
    try {
      textChannel.send('Houve um erro ao reproduzir as músicas');
      guildQueue.voiceChannel.leave();
      queue.delete(guildId);
    } catch {
      queue.delete(guildId);
    }
  }

  // Define o volume do expedidor
  dispatcher.setVolume(guildQueue.volume / 100);

  // Envia a mensagem da música no servidor
  song.embed.setTitle(`▶️ Tocando: ${song.title}`);
  textChannel.send(song.embed);
};
