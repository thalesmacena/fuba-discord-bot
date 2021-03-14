import {
  Message,
  TextChannel,
  VoiceChannel,
  VoiceConnection
} from 'discord.js';
import { Embed } from './views/embed';

export interface ISong {
  title: string;
  url: string;
  channel: string;
  length: number;
  thumbnail: string;
  user: string;
  upTime: number;
  embed: Embed;
}

export interface IGuildQueue {
  textChannel: TextChannel;
  voiceChannel: VoiceChannel;
  connection: VoiceConnection;
  songs: ISong[];
  totalTime: number;
  volume: number;
}

export interface IArgs {
  commandBody: string;
  args: string[];
}

export interface IExecuteProps {
  message: Message;
  argsProps?: IArgs;
  guildQueue?: IGuildQueue;
}

export interface ICommand {
  name: string;
  description: string;
  args: string;
  example: string;
  execute: (props: IExecuteProps) => void;
}

export interface ICommandFile {
  [key: string]: {
    default: ICommand;
  };
}
