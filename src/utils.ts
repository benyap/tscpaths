import { ModuleNotFoundError } from './errors';

/**
 * Load a `js` or `json` module from the given path.
 *
 * @param path The path to the module.
 * @param step The name of step this utility is used in. Used for error reporting.
 */
export function loadModule<T>(path: string, step: string) {
  let data: T;
  try {
    data = require(path) as T;
    return data;
  } catch (error) {
    throw new ModuleNotFoundError(step, path);
  }
}
