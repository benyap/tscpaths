#! /usr/bin/env node

import { red, green, bold } from 'ansi-colors';

import {
  createProgram,
  resolvePaths,
  loadTSConfig,
  resolveConfigPaths,
  computeAliases,
  getFilesToProcess,
  createReplacer,
} from './steps';
import { MissingTSConfigError, ModuleNotFoundError, StepError } from './errors';

import { ProgramArgs } from './types';

function main() {
  try {
    const program = createProgram();

    const options = program.parse().opts<ProgramArgs>();
    console.log('options ->', options);

    const programPaths = resolvePaths(options);
    console.log('paths ->', programPaths);

    const tsConfig = loadTSConfig(programPaths);
    console.log('tsConfig ->', tsConfig);

    const configPaths = resolveConfigPaths(programPaths, tsConfig);
    console.log('configPaths ->', configPaths);

    const aliases = computeAliases(configPaths.basePath, tsConfig);
    console.log('aliases ->', aliases);

    const files = getFilesToProcess(programPaths.outPath, options.extensions);
    console.log('files ->', files);

    const replacer = createReplacer(programPaths, configPaths, aliases);
    console.log('replacer ->', replacer);

    const { replacements, changes } = replacer(files);
    console.log('replacements ->', replacements);
    console.log('changes ->', changes);
  } catch (error) {
    if (error instanceof StepError) {
      console.error();
      console.error(red.bold(`Error during step '${error.step}'`));
      if (error instanceof ModuleNotFoundError) {
        console.error(`Module ${green(error.module)} not found.`);
      } else if (error instanceof MissingTSConfigError) {
        console.error(`${bold(error.path)} is not set.`);
      } else console.error(error.message);
      console.error();
    } else throw error;
  }
}

main();
