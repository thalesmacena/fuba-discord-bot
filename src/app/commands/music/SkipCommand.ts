import { ICommand, IExecuteProps } from '@/app/interfaces';

const SkipCommand: ICommand = {
  name: 'skip',
  description: 'Pula uma música na lista de reprodução',
  args: 'Nenhum argumento',
  example: '`skip`',

  execute: async ({ message, guildQueue }: IExecuteProps): Promise<void> => {
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

    guildQueue.connection.dispatcher.end();

    guildQueue.textChannel.send('⏭  **Música pulada**');
  }
};

export default SkipCommand;
