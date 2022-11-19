# @branchlint/default-config

## 1.0.2

### Patch Changes

- 51161b9: added a default prefix of the user's git username

## 1.0.1

### Patch Changes

- cac6172: Fixed the checkout condition not using the checkout argument when passed.

## 1.0.0

### Major Changes

- 4849f11: Improved type safety, moved the branch name transformer to the config and added yargs to control checkout, set upstream, and default prefix.

### Patch Changes

- 4849f11: replaced export default with module.exports to remove the need of using the default property when requiring the default-config
- Updated dependencies [f582347]
  - @branchlint/common@0.0.1

## 0.0.1

### Patch Changes

- 2caf80b: Added the ability to configure the CLI using an rc file, added a package for the default config.
