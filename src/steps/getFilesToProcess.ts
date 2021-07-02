import { resolve } from 'path';
import { sync } from 'globby';

export function getFilesToProcess(outPath: string, extensions: string) {
  return sync(`${outPath}/**/*.{${extensions}}`, {
    dot: true,
    onlyFiles: true,
  }).map((path) => resolve(path));
}
