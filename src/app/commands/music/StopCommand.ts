import { ICommand, IExecuteProps } from '../../api';

const StopCommand: ICommand = {
  name: 'stop',
  description: 'Encerra a fila de reprodução de músicas',
  args: 'Nenhum argumento',
  example: '`stop`',

  execute: async ({ message, guildQueue }: IExecuteProps): Promise<void> => {
    if (!message.member.voice.channel) {
      message.reply('Você deve estar em um canal de voz para parar a música');
      return;
    }

    if (!guildQueue) {
      message.reply('Não existe nenhuma fila de música para ser parada');
      return;
    }

    const { textChannel } = guildQueue;

    guildQueue.songs = [];

    guildQueue.totalTime = 0;

    guildQueue.connection.dispatcher.end();

    textChannel.send('⏹ **Fila interrompida**');
  }
};

export default StopCommand;
