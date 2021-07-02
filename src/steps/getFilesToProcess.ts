import { resolve } from "path";
import { sync } from "globby";

/**
 * Get the files in the output directory that should be processed.
 * @param outPath The output directory.
 * @param extensions A comma separated list of extensions to match.
 */
export function getFilesToProcess(outPath: string, extensions: string) {
  return sync(`${outPath}/**/*.{${extensions}}`, {
    dot: true,
    onlyFiles: true,
  }).map((path) => resolve(path));
}
