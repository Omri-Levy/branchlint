const {parserOptions, ...config} = require('../config/eslintrc.base.cjs');

module.exports = {
	...config,
	parserOptions: {
		...parserOptions,
		tsconfigRootDir: __dirname,
		project: `./tsconfig.json`,
	},
}
