import { resolve } from 'path';
import { loadModule } from '../utils';
import { ProgramPaths, TSConfig } from '../types';

export function loadTSConfig(paths: ProgramPaths): TSConfig {
  const { configFile } = paths;

  let tsConfig = loadModule<TSConfig>(configFile, 'loadTSConfig');

  if (tsConfig.extends) {
    const parentConfig = loadModule<TSConfig>(
      resolve(paths.configPath, tsConfig.extends),
      'loadTSConfig'
    );
    tsConfig = {
      ...parentConfig,
      ...tsConfig,
    };
  }
  return tsConfig;
}
