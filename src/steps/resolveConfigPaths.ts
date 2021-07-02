import { resolve } from 'path';
import { MissingTSConfigError } from '../errors';
import { ConfigPaths, ProgramPaths, TSConfig } from '../types';

export function resolveConfigPaths(
  programPaths: ProgramPaths,
  tsConfig: TSConfig
): ConfigPaths {
  const { configPath, outPath } = programPaths;
  const { compilerOptions } = tsConfig;
  const { baseUrl, paths, outDir } = compilerOptions ?? {};

  if (!baseUrl)
    throw new MissingTSConfigError(
      'resolveConfigPaths',
      'compilerOptions.baseUrl'
    );

  if (!paths)
    throw new MissingTSConfigError(
      'resolveConfigPaths',
      'compilerOptions.paths'
    );

  if (!outDir)
    throw new MissingTSConfigError(
      'resolveConfigPaths',
      'compilerOptions.outDir'
    );

  const basePath = resolve(configPath, baseUrl);
  const resolvedOutDir = outPath ?? resolve(basePath, outDir);

  return { basePath, outDir: resolvedOutDir };
}
