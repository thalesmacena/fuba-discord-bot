import { ICommand, IExecuteProps } from '../../api';

const PauseCommand: ICommand = {
  name: 'pause',
  description: 'Pausa e despausa a lista de reprodução de músicas',
  args: 'Nenhum argumento',
  example: '`pause`',

  execute: async ({ message, guildQueue }: IExecuteProps): Promise<void> => {
    if (!message.member.voice.channel) {
      message.reply(
        'Você deve estar em um canal de música para parar a música'
      );
      return;
    }

    if (!guildQueue) {
      message.reply('Não existe nenhuma fila de música para ser parada');
      return;
    }

    const { textChannel } = guildQueue;

    const { dispatcher } = guildQueue.connection;

    if (dispatcher.paused) {
      dispatcher.resume();
      textChannel.send('▶️ **Retomado**');
      return;
    }

    dispatcher.pause();
    textChannel.send('⏸ **Pausado**');
  }
};

export default PauseCommand;
