import { commands } from '../../../server';
import { ICommand, IExecuteProps } from '../../api';
import { Embed } from '../../views/embed';
import { commandsList } from '../commandList';

const OlaCommand: ICommand = {
  name: 'help',
  description:
    'mostra instruções para todos os comandos ou um comando específico',
  args: '[comando] - (Opcional) o nome de um comando',
  example: '`help help` ou apenas `help`',

  execute: async ({ message, argsProps }: IExecuteProps): Promise<void> => {
    const embed = new Embed();

    if (argsProps.args.length) {
      const command = commands.get(argsProps.args[0]);

      if (!command) {
        message.reply('Comando não encontrado');
        return;
      }

      embed
        .setTitle(command.name)
        .setDescription(command.description)
        .addFields(
          { name: 'Argumentos', value: command.args },
          { name: 'Exemplo', value: command.example }
        );

      if (message.guild)
        message.reply('Uma mensagem foi enviada para o seu dm');
      message.author.send(embed);
      return;
    }

    embed
      .setTitle('Fuba')
      .setFooter(
        'Fuba: Para obter mais detalhes sobre cada comanado, experimente: help [comando]'
      );

    commandsList.forEach((command) => {
      const commandInfo = commands.get(command);
      embed.addField(commandInfo.name, commandInfo.description);
    });

    if (message.guild) message.reply('Uma mensagem foi enviada para o seu dm');

    message.author.send(embed);
  }
};

export default OlaCommand;
