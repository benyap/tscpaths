import { Command } from 'commander';

/**
 * Create the CLI parser program.
 */
export function createProgram() {
  const program = new Command();

  program
    .version(process.env.npm_package_version!)
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
    .option('--ext <extensions>', 'extension types', 'js,ts,jsx,tsx')
    .option('--verbose', 'output logs', false);

  return program;
}
