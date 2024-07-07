// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require('webpack-node-externals')

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const { NODE_ENV = 'production', WEBPACK_NO_WATCH } = process.env

const NO_WATCH = WEBPACK_NO_WATCH === 'true'

module.exports = {
	entry: path.resolve(__dirname, 'src', 'app.ts'),
	mode: NODE_ENV,
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			'~db': path.resolve(__dirname, './src/db'),
			'~controllers': path.resolve(__dirname, './src/controllers'),
			'~routes': path.resolve(__dirname, './src/routes'),
			'~helpers': path.resolve(__dirname, './src/helpers'),
			'~utils': path.resolve(__dirname, './src/utils'),
			'~middlewares': path.resolve(__dirname, './src/middlewares'),
			'~packages': path.resolve(__dirname, './src/packages'),
			'~models': path.resolve(__dirname, './src/models'),
			['~env-constants']: path.resolve(__dirname, './src/env-constants'),
			['~types']: path.resolve(__dirname, './src/types'),
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								noEmit: false,
							},
						},
					},
				],
			},
		],
	},
	externals: [nodeExternals()],
	watch: !NO_WATCH && NODE_ENV === 'development',
}
