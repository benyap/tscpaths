import { resolve, dirname } from 'path';
import { ProgramArgs, ProgramPaths } from '../types';

export function resolvePaths(options: ProgramArgs): ProgramPaths {
  const configFile = resolve(process.cwd(), options.project);
  const configPath = dirname(configFile);
  const srcPath = resolve(options.src);
  const outPath = resolve(options.out);
  return { configFile, configPath, srcPath, outPath };
}
