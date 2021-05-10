import { TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';
import { ISong } from './song';

export interface IGuildQueue {
  textChannel: TextChannel;
  voiceChannel: VoiceChannel;
  connection: VoiceConnection;
  songs: ISong[];
  totalTime: number;
  volume: number;
}
