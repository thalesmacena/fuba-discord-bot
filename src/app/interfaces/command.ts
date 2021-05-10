import { IExecuteProps } from './executeProps';

export interface ICommand {
  name: string;
  description: string;
  args: string;
  example: string;
  execute: (props: IExecuteProps) => void;
}
