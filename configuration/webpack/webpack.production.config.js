//TODO turn to es6
const path = require('path')
import { resolve } from 'path'
const webpack = require('webpack')

// Paths
const srcPath = path.resolve('client')
const distPath = path.join(__dirname, '../..', 'dist')
const nodeModules = 'node_modules'
const excludeNodeModules = /node_modules/

// Configs
const babelConfig = require('../babel/babel.dev.config')
import appCONF from '../app/app.config'

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
import ExtendedDefinePlugin from 'extended-define-webpack-plugin'

const config = {
	entry: [srcPath + '/index.js'],
	output: {
		path: distPath,
		publicPath: '',
		filename: 'bundle.[chunkhash:5].js'
	},
	resolve: {
		modules: [srcPath, nodeModules],
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
		loaders: [
			{
				test: /\.js$/,
				include: srcPath,
				loader: 'babel-loader',
				query: babelConfig,
				exclude: excludeNodeModules
			},
			{
				test: /\.s?[ac]ss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: false,
								importLoaders: 2
							}
						},
						{
							loader: 'postcss-loader'
						},
						{
							loader: 'sass-loader',
							options: {
								outputStyle: 'compressed',
								data: '@import "configuration/sass/sassutils";',
								includePath: decodeURIComponent(srcPath)
							}
						}
					]
				})
			},
			{
				test: /\.(mp4|webm)(\?.*)?$/,
				include: [srcPath, nodeModules],
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'static/media/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
				include: [srcPath, nodeModules],
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 5120,
							name: 'static/media/fonts/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
				include: [srcPath, nodeModules],
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 5120,
							name: 'static/media/img/[name].[hash:5].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new HtmlWebpackPlugin({
			inject: 'body',
			template: 'server/index.html'
		}),
		new ExtractTextPlugin({
			filename: 'styles.css',
			allChunks: true,
			disable: false
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new ExtendedDefinePlugin({
			APP_CONFIG: appCONF
		}),
		new webpack.ProvidePlugin({
			Logger: 'Logger'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		})
	]
}

module.exports = config
