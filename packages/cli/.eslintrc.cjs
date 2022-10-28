const {parserOptions, ...config} = require('../config/eslintrc.cli.cjs'); 

module.exports = {
	...config,
	parserOptions: {
		...parserOptions,
		project: `./tsconfig.json`,
	}
}
