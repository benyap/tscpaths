#! /usr/bin/env node

import { green, bold } from 'ansi-colors';

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
import { Logger } from './logger';

function main() {
  const program = createProgram();
  const options = program.parse().opts<ProgramArgs>();
  const logger = new Logger(options.verbose ? 'verbose' : 'info');

  logger.verbose();
  logger.fancyParams('options', options);

  try {
    const programPaths = resolvePaths(options);
    logger.fancyParams('programPaths', programPaths);

    const tsConfig = loadTSConfig(programPaths);
    const { baseUrl, outDir, paths } = tsConfig.compilerOptions ?? {};
    logger.fancyParams('tsConfig.compilerOptions', { baseUrl, outDir, paths });

    const configPaths = resolveConfigPaths(programPaths, tsConfig);
    logger.fancyParams('configPaths', configPaths);

    const aliases = computeAliases(configPaths.basePath, tsConfig);
    logger.fancyParams('aliases', aliases);

    const files = getFilesToProcess(programPaths.outPath, options.ext);
    logger.fancyParams('files', files);

    const replacer = createReplacer(programPaths, configPaths, aliases);

    const { replacements, changes } = replacer(files);
    logger.fancyParams('replacements', replacements);
    logger.fancyParams('changes', changes);
  } catch (error) {
    if (error instanceof StepError) {
      let message = error.message;
      if (error instanceof ModuleNotFoundError) {
        message = `Module ${green(error.module)} not found.`;
      } else if (error instanceof MissingTSConfigError) {
        message = `${bold(error.path)} is not set.`;
      }
      logger.fancyError(`Error during step '${error.step}'`, message);
    } else throw error;
  }
}

main();
