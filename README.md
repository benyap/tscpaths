# @benyap/tscpaths

> Forked from [joonhocho's tscpaths](https://github.com/joonhocho/tscpaths)

[![npm version](https://badge.fury.io/js/%40benyap%2Ftscpaths.svg)](https://badge.fury.io/js/%40benyap%2Ftscpaths)
[![Dependency Status](https://david-dm.org/benyap/tscpaths.svg)](https://david-dm.org/benyap/tscpaths)
[![License](https://img.shields.io/:license-mit-blue.svg)](LICENSE)

If you use Typescript's
[path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
feature (by setting `baseUrl` and `paths` in `tsconfig.json`), you may have
found that transpiling with `tsc` doesn't convert your aliases to proper
relative paths. This causes problems as the transpiled code can't actually run
with those path aliases - you'll get a "module not found" error.

Use this package after `tsc` transpilation to replace path aliases with relative
paths so that you can develop using path aliases whilst still being able to ship
working JavaScript code.

## Comparison to [tsconfig-paths](https://github.com/dividab/tsconfig-paths)

- Use during compile time - no runtime dependencies!

## Usage

1. Install `@benyap/tscpaths` as a dev dependency using npm or yarn.

   ```sh
   npm install --save-dev @benyap/tscpaths
   # or
   yarn add -D @benyap/tscpaths
   ```

2. Add it as a part of your build script in `package.json`

   ```json
   "scripts": {
     "build": "tsc && tscpaths -p tsconfig.json -s ./src -o ./out",
   }
   ```

### Options

| flag      | shorthand | required | default       | description                                             |
| --------- | --------- | -------- | ------------- | ------------------------------------------------------- |
| --src     | -s        | yes      |               | source directory (where the source code is)             |
| --out     | -o        | yes      |               | output directory of transpiled code (tsc --outDir)      |
| --project | -p        | no       | tsconfig.json | path to the project configuration file (tsconfig.json)  |
| --ext     |           | no       | js            | comma separated list of extensions to match and replace |
| --verbose |           | no       |               | show verbose output                                     |

## Disclaimer

This is not a mature nor is it a well tested project. It works for some personal
use cases. Feel free to fork or submit pull requests.
