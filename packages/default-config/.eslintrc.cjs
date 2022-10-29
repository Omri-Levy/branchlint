const {parserOptions, ...config} = require('../config/eslintrc.default-config.cjs');

module.exports = {
	...config,
	parserOptions: {
		...parserOptions,
		project: `./tsconfig.json`,
	}
}
