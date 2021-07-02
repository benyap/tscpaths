import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, relative, resolve } from 'path';
import { Alias, ConfigPaths, ProgramPaths, ReplaceRecord } from '../types';

const REQUIRE_REGEX = /(?:import|require)\(['"]([^'"]*)['"]\)/g;
const IMPORT_REGEX = /(?:import|from) ['"]([^'"]*)['"]/g;
const EXTS = ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.json'];

export function createReplacer(
  programPaths: ProgramPaths,
  configPaths: ConfigPaths,
  aliases: Alias[]
) {
  const { srcPath } = programPaths;
  const { basePath, outDir } = configPaths;

  const replacements: ReplaceRecord[] = [];
  const changes: string[] = [];

  function aliasToRelativePath(modulePath: string, outFile: string): string {
    for (const alias of aliases) {
      const { prefix, aliasPaths } = alias;

      if (modulePath.startsWith(prefix)) {
        const modulePathRel = modulePath.substring(prefix.length);
        const srcFile = resolve(srcPath, relative(outDir, outFile));

        const record: ReplaceRecord = {
          sourceFile: relative(basePath, srcFile),
          outFile: relative(basePath, outFile),
          modulePath,
        };
        replacements.push(record);

        for (const aliasPath of aliasPaths) {
          const moduleSrc = resolve(aliasPath, modulePathRel);
          if (
            existsSync(moduleSrc) ||
            EXTS.some((x) => existsSync(`${moduleSrc}${x}`))
          ) {
            const rel = relative(dirname(srcFile), moduleSrc);
            const relativePath = (
              rel.startsWith('.') ? rel : `./${rel}`
            ).replace(/\\/g, '/');
            record.relativePath = relativePath;
            record.reference = relative(basePath, modulePath);
            return relativePath;
          }
        }
      }
    }

    return modulePath;
  }

  function replaceImportStatement(
    original: string,
    matched: string,
    outFile: string
  ) {
    const index = original.indexOf(matched);
    return (
      original.substring(0, index) +
      aliasToRelativePath(matched, outFile) +
      original.substring(index + matched.length)
    );
  }

  function replaceAlias(text: string, outFile: string): string {
    return text
      .replace(REQUIRE_REGEX, (original, matched) =>
        replaceImportStatement(original, matched, outFile)
      )
      .replace(IMPORT_REGEX, (original, matched) =>
        replaceImportStatement(original, matched, outFile)
      );
  }

  return function replacer(files: string[]) {
    for (const file of files) {
      const text = readFileSync(file, 'utf-8');
      const newText = replaceAlias(text, file);
      if (text === newText) continue;
      changes.push(file);
      writeFileSync(file, newText, { encoding: 'utf-8' });
    }
    return { changes, replacements };
  };
}
