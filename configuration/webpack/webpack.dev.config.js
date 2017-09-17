import webpack from 'webpack'
import { resolve } from 'path'

// Plugins
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtendedDefinePlugin from 'extended-define-webpack-plugin'

// Paths
const srcPath = resolve('client')
const excludeNode = /node_modules/
const includeNode = resolve('node_modules')
const cssLibs = resolve('client/static/styles/styles')

// Configs
import babel_config from '../babel/babel.dev.config'
import app_config from '../app/app.config'

export default {
	devtool: 'eval',
	entry: [`webpack-hot-middleware/client?path=/__webpack_hmr&timeout=100`, './client/index'],
	output: {
		path: '/',
		filename: 'bundle.js',
		publicPath: ''
	},
	resolve: {
		modules: [includeNode, srcPath],
		extensions: ['.js', '.json', '.scss'],
		alias: {
			Logger: resolve('client/utils/logger.js'),
			Components: resolve('client/components/'),
			Containers: resolve('client/containers/'),
			Logic: resolve('client/app-logic/'),
			Configuration: resolve('configuration/'),
			Server: resolve('server/'),
			Static: resolve('client/static/')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: excludeNode,
				include: srcPath,
				loader: 'babel-loader',
				query: babel_config
			},
			{
				test: /\.s?[ac]ss$/,
				exclude: [excludeNode, cssLibs],
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							data: '@import "../configuration/sass/sassutils";',
							includePaths: [srcPath]
						}
					}
				]
			},
			{
				test: /\.s?[ac]ss$/,
				include: [includeNode, cssLibs],
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new HtmlWebpackPlugin({
			inject: 'body',
			template: 'server/index.html'
		}),
		new ExtendedDefinePlugin({
			APP_CONFIG: app_config
		}),
		new webpack.ProvidePlugin({
			Logger: 'Logger'
		})
	]
}
