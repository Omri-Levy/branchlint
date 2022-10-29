# @branchlint/cli

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
