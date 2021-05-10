import { ICommand } from './command';

export interface ICommandFile {
  [key: string]: {
    default: ICommand;
  };
}
