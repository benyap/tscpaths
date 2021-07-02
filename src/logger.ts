import { blue, bold, dim, red } from 'ansi-colors';

export type LoggerLevel = 'verbose' | 'info' | 'error';

export class Logger {
  constructor(public readonly level: LoggerLevel) {}

  verbose(...args: any[]) {
    if (this.level === 'verbose') console.log(dim('[v]'), ...args);
  }

  info(...args: any[]) {
    if (this.level in ['verbose', 'info']) console.log(blue('[i]'), ...args);
  }

  error(...args: any[]) {
    console.error(red.bold('[e]'), ...args);
  }

  fancyParams<T extends { [key: string]: any }>(title: string, params: T) {
    this.verbose(bold(title));
    for (const key of Object.keys(params)) {
      this.verbose(key, '->', params[key as keyof typeof params]);
    }
    this.verbose(dim('---'));
  }

  fancyError(title: string, message: string) {
    console.error();
    console.error(red.bold(title));
    console.error(message);
    console.error();
  }
}
