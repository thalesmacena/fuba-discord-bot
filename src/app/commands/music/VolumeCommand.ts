import { StreamDispatcher } from 'discord.js';
import { ICommand, IExecuteProps } from '../../api';

const VolumeCommand: ICommand = {
  name: 'volume',
  description: 'Altera ou informa o volume do bot',
  args:
    '[volume || nada] - O volume entre 1 e 200 ao qual deseja mudar o volume do bot, se nenhum argumento for passado retorna o volume atual',
  example: '`volume 25` ou `volume`',

  execute: async ({
    message,
    argsProps,
    guildQueue
  }: IExecuteProps): Promise<void> => {
    if (!message.member.voice.channel) {
      message.reply(
        'Você deve estar em um canal de voz para alterar o volume da música'
      );
      return;
    }

    if (!guildQueue) {
      message.reply(
        'Não existe nenhuma fila de música para o volume ser alterado'
      );
      return;
    }

    const { textChannel } = guildQueue;

    let dispatcher: StreamDispatcher;

    try {
      dispatcher = guildQueue.connection.dispatcher;
    } catch {
      textChannel.send('Houve um erro ao mudar o volume');
      return;
    }

    if (argsProps.args[0] === undefined) {
      textChannel.send(`🎚 O volume atual é: ${dispatcher.volume * 100}`);
      return;
    }

    const volumeString = /\d+/.exec(argsProps.args[0]);

    if (!volumeString) {
      textChannel.send(
        'Você precisa entrar como um numero válido, tente `$help volume`'
      );
      return;
    }

    const volume = parseInt(volumeString[0], 10);

    if (volume < 0 || volume > 200) {
      textChannel.send('O volume precisa estar entre 0 e 200');
      return;
    }

    const sendMessage = await textChannel.send('🎚 **Regulando o volume...**');

    guildQueue.volume = volume;

    dispatcher.setVolume(volume / 100);

    sendMessage.edit(`🎚 **Volume regulado para:** ${volume}`);
  }
};

export default VolumeCommand;
