export interface TSConfig {
  extends?: string;
  compilerOptions?: TSConfigCompilerOptions;
}

export interface TSConfigCompilerOptions {
  baseUrl?: string;
  outDir?: string;
  paths?: { [key: string]: string[] };
}

export interface ProgramArgs {
  /** Path to the project's tsconfig.json file. */
  project: string;
  /** Path to the source directory. */
  src: string;
  /** Path to the output directory. */
  out: string;
  /** A comma seperated list of file extensions that will be matched for replacement. */
  ext: string;
  /** If `true`, verbose logs will be printed for degugging. */
  verbose: boolean;
}

export interface ProgramPaths {
  /** Absolute path to the tsconfig file. */
  configFile: string;
  /** Absolute path to the directory the tsconfig file is in. */
  configPath: string;
  /** Absolute path to the source directory. */
  srcPath: string;
  /** Absolute path to the output directory. */
  outPath: string;
}

export interface ConfigPaths {
  /** Absolute path to `baseUrl` as defined in the tsconfig file. */
  basePath: string;
  /** Absolute path to `outDir` as defined in the tsconfig file. */
  outDir: string;
}

export interface Alias {
  /** The alias prefix that has been matched. */
  prefix: string;
  /** The paths that the alias points to. */
  aliasPaths: string[];
}

export interface ReplaceRecord {
  /** The source of the file being replaced. */
  sourceFile: string;
  /** The file being replaced. */
  outFile: string;
  /** The path alias being replaced. */
  modulePath: string;
  /** The relative path the alias was replaced with. */
  relativePath?: string;
}
