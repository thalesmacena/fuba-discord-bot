import { ICommand, ICommandFile, IGuildQueue } from '@/app/interfaces';
import { Client, Collection } from 'discord.js';
import 'dotenv/config';
import { join } from 'path';
import requireAll from 'require-all';
import { botConfig } from './config/botConfig';

class ClientBot {
  public client: Client;

  public commands: Collection<string, ICommand>;

  public guildsQueuesSongs: Collection<string, IGuildQueue>;

  constructor() {
    this.client = new Client(botConfig);
    this.commands = new Collection();
    this.guildsQueuesSongs = new Collection();

    this.createCommands();
  }

  async createCommands() {
    const path = join(__dirname, 'app', 'commands');

    const directories = requireAll({
      dirname: path,
      filter: /(.+Command)\.ts$/
    });

    Object.values(directories).forEach((file: ICommandFile) => {
      const commandsArray = Object.values(file);

      commandsArray.forEach((command) => {
        this.commands.set(command.default.name, command.default);
      });
    });
  }
}

export default new ClientBot();
