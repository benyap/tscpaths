import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, relative, resolve } from 'path';
import {
  Alias,
  ConfigPaths,
  ProgramPaths,
  ReplaceRecord,
  ChangeRecord,
} from '../types';

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
  const changes: ChangeRecord[] = [];

  function toRelative(from: string, to: string) {
    const rel = relative(from, to);
    return (rel.startsWith('.') ? rel : `./${rel}`).replace(/\\/g, '/');
  }

  function outFileToSrcFile(path: string): string {
    return resolve(srcPath, relative(outDir, path));
  }

  function absToRel(modulePath: string, outFile: string): string {
    for (const alias of aliases) {
      const { prefix, aliasPaths } = alias;

      if (modulePath.startsWith(prefix)) {
        const modulePathRel = modulePath.substring(prefix.length);
        const srcFile = outFileToSrcFile(outFile);

        const record: ReplaceRecord = {
          sourceFile: relative(basePath, srcFile),
          outFile: relative(basePath, outFile),
          modulePath,
          paths: [],
        };
        replacements.push(record);

        for (const aliasPath of aliasPaths) {
          const moduleSrc = resolve(aliasPath, modulePathRel);
          if (
            existsSync(moduleSrc) ||
            EXTS.some((x) => existsSync(`${moduleSrc}${x}`))
          ) {
            const relativePath = toRelative(dirname(srcFile), moduleSrc);
            record.paths.push({
              relativePath,
              reference: relative(basePath, modulePath),
            });
            return relativePath;
          }
        }

        // Failed to replace ${modulePath}
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
      absToRel(matched, outFile) +
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
      const prevReplaceCount = replacements.length;
      if (text === newText) continue;
      changes.push({
        file,
        count: replacements.length - prevReplaceCount,
      });
      writeFileSync(file, newText, { encoding: 'utf-8' });
    }
    return { changes, replacements };
  };
}
