import { Embed } from '@/app/views/embed';

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
