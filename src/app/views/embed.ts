import { MessageEmbed } from 'discord.js';
import 'dotenv/config';

export class Embed extends MessageEmbed {
  constructor() {
    super({
      color: '#736156',
      footer: {
        text: `Para mais informações tente ${process.env.DISCORD_PREFIX}help`
      }
    });
  }
}
