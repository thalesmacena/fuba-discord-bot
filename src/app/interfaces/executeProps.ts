import { Message } from 'discord.js';
import { IArgs } from './args';
import { IGuildQueue } from './guildQueue';

export interface IExecuteProps {
  message: Message;
  argsProps?: IArgs;
  guildQueue?: IGuildQueue;
}
