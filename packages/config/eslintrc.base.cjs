module.exports = {
	env: {
		es2021: true,
	},
	extends: [`standard-with-typescript`, `prettier`],
	parserOptions: {
		ecmaVersion: `latest`,
		sourceType: `module`,
	},
	rules: {
		quotes: [`error`, `backtick`],
		'array-callback-return': `off`,
		'prefer-template': `error`,
		'@typescript-eslint/restrict-template-expressions': `off`,
		'@typescript-eslint/strict-boolean-expressions': `off`,
		'@typescript-eslint/prefer-nullish-coalescing': `off`,
	},
};
