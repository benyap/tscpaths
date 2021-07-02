# @benyap/tscpaths

> Forked from [joonhocho's tscpaths](https://github.com/joonhocho/tscpaths)

[![npm version](https://badge.fury.io/js/%40benyap%2Ftscpaths.svg)](https://badge.fury.io/js/%40benyap%2Ftscpaths)
[![Dependency Status](https://david-dm.org/benyap/tscpaths.svg)](https://david-dm.org/benyap/tscpaths)
[![License](https://img.shields.io/:license-mit-blue.svg)](LICENSE)

Replace absolute paths to relative paths after Typescript compilation (tsc) at compile time.

## Comparison to [tsconfig-paths](https://github.com/dividab/tsconfig-paths)

- Use during compile time - no runtime dependencies!

## Getting Started

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

| flag         | description                                        |
| ------------ | -------------------------------------------------- |
| -p --project | project configuration file (tsconfig.json)         |
| -s --src     | source code root directory                         |
| -o --out     | output directory of transpiled code (tsc --outDir) |

You need to provide -s (--src) and -o (--out), because it's hard to predict source and output paths based on tsconfig.json.

I've tried a little and failed. :(

`tsc` does some magic to determine source and output paths and I haven't dived too deep to mimic it.

For now, it's simpler to provide the paths manually.

If you know how, Pull Requests are welcome!

# Disclaimer !!!!!

This is not a mature project yet.

It works for my setup so far.

It may not work correctly if your setup is too complicated, so please do some testing before pushing it to production!!!
