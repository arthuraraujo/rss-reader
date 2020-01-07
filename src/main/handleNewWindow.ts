import { shell } from 'electron';

export default (event: any, url: string) => {
  shell.openExternal(url);
};
