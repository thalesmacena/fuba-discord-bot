import { ICommand, IExecuteProps } from '../../api';
import { Embed } from '../../views/embed';

const alphabet = [
  '🇦',
  '🇧',
  '🇨',
  '🇩',
  '🇪',
  '🇫',
  '🇬',
  '🇭',
  '🇮',
  '🇯',
  '🇰',
  '🇱',
  '🇲',
  '🇳',
  '🇴',
  '🇵',
  '🇶',
  '🇷',
  '🇸',
  '🇹',
  '🇺',
  '🇻',
  '🇼',
  '🇽',
  '🇾',
  '🇿'
];

const PoolCommand: ICommand = {
  name: 'pool',
  description:
    'Cria uma pesquisa para as pessoas responderem reagiando com a opção marcadad',
  args: '[pergunta] - A pergunta a ser feita. [opção] - Uma das opções da pool',
  example: `\`${process.env.DISCORD_PREDIX}pool\` [pergunta] / [Opção 1] / [Opção 2] / ...`,

  execute: async ({ message, argsProps }: IExecuteProps): Promise<void> => {
    const bruteFormat = argsProps.commandBody.split('/');

    if (bruteFormat.length <= 2) {
      message.reply(
        'Sua pool não está no formato adequado ou tem menos que 2 opções, tente `$help pool`'
      );
      return;
    }

    const question = bruteFormat.shift().slice(5);

    const pool = bruteFormat.filter((poolOption) => poolOption.length !== 0);

    if (pool.length > 26) {
      message.reply('Sua pool tem mais de 26 itens, tente `$help pool`');
      return;
    }

    const embed = new Embed();

    embed
      .setTitle(question.trim())
      .setAuthor(message.author.username, message.author.avatarURL());

    pool.forEach((poolOption, index) => {
      embed.addField(`${alphabet[index]} - \`${poolOption.trim()}\``, '⠀');
    });

    const sendMessage = await message.channel.send(embed);

    pool.forEach((poolOption, index) => {
      sendMessage.react(`${alphabet[index]}`);
    });

    if (message.guild) {
      message.delete();
    }
  }
};

export default PoolCommand;
