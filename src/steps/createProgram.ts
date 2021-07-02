import { Command } from 'commander';
import { version } from '../version.json';

/**
 * Create the CLI program.
 */
export function createProgram() {
  const program = new Command();

  program
    .version(version)
    .name('tscpaths')
    .addHelpText(
      'after',
      `
Example:
$ tscpath -p tsconfig.json -s ./src -o ./dist
`
    )
    .requiredOption(
      '-p, --project <file>',
      'path to tsconfig.json',
      'tsconfig.json'
    )
    .requiredOption('-s, --src <path>', 'source root path')
    .requiredOption('-o, --out <path>', 'output root path')
    .option('--ext <extensions>', 'extension types', 'js')
    .option('--verbose', 'output logs', false);

  return program;
}
