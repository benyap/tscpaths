export interface ProgramArgs {
  project: string;
  src: string;
  out: string;
  ext: string;
  verbose: boolean;
}

export interface ProgramPaths {
  configFile: string;
  configPath: string;
  srcPath: string;
  outPath: string;
}

export interface ConfigPaths {
  basePath: string;
  outDir: string;
}

export interface TSConfig {
  extends?: string;
  compilerOptions?: TSConfigCompilerOptions;
}

export interface TSConfigCompilerOptions {
  baseUrl?: string;
  outDir?: string;
  paths?: { [key: string]: string[] };
}

export interface Alias {
  prefix: string;
  aliasPaths: string[];
}

export interface ReplaceRecord {
  sourceFile: string;
  outFile: string;
  modulePath: string;
  paths: ReplacePathRecord[];
}

export interface ReplacePathRecord {
  relativePath: string;
  reference: string;
}

export interface ChangeRecord {
  file: string;
  count: number;
}
