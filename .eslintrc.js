module.exports = {
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['simple-import-sort', 'prettier'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'class-methods-use-this': 'off',
		'import/prefer-default-export': 'off',
		'no-continue': 'off',
		'no-plusplus': 'off',
		'no-restricted-globals': 'off',
		'no-restricted-syntax': [
			'error',
			{
				selector: 'ForInStatement',
				message:
					'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
			},
			{
				selector: 'LabeledStatement',
				message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
			},
			{
				selector: 'WithStatement',
				message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
			},
		],
		'prettier/prettier': ['error', { arrowParens: 'avoid', printWidth: 120, singleQuote: true, trailingComma: 'all' }],
		semi: [0, 'always'],
		'@typescript-eslint/ban-ts-comment': 0,
		radix: 'off',
		'simple-import-sort/imports': 'warn',
	},
}
