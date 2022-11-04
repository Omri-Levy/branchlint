# @branchlint/cli

## 1.0.2

### Patch Changes

- fbd0ca1: Fixed transformer not receiving an object as an argument now receives {answers} instead of answers directly

## 1.0.1

### Patch Changes

- b4bbeb1: Changed bin to cli.js to avoid execute on import of types or utils

## 2.0.0

### Major Changes

- 4849f11: Improved type safety, moved the branch name transformer to the config and added yargs to control checkout, set upstream, and default prefix.

### Patch Changes

- 4849f11: Fixed error due to not passing the answers object into the command method on the validation step
- Updated dependencies [4849f11]
- Updated dependencies [4849f11]
- Updated dependencies [f582347]
  - @branchlint/default-config@1.0.0
  - @branchlint/common@0.0.1

## 1.1.0

### Minor Changes

- 9270794: Now passing the checkout property with the answers object to the callbacks such as command.

## 1.0.0

### Major Changes

- 2caf80b: Added the ability to configure the CLI using an rc file, added a package for the default config.

### Patch Changes

- Updated dependencies [2caf80b]
  - @branchlint/default-config@0.0.1

## 0.0.6

### Patch Changes

- 9acafe7: removed the packageManager field which was wrongly set to yarn from package.json

## 0.0.5

### Patch Changes

- b1be18d: removed redundant .yarn directory
- 2f686a1: updated readmes and removed yarn files

## 0.0.4

### Patch Changes

- f652c59: Updated readmes

## 0.0.3

### Patch Changes

- b145133: added #! /usr/bin/env node to index.ts for the bin field in package.json

## 0.0.2

### Patch Changes

- no longer using git push -u origin branchName when checkout is false
- bd221b3: Added bin in package.json and now using git push -u origin branchName as part of branch creation

## 0.0.1

### Patch Changes

- e70b31d: Release PR
