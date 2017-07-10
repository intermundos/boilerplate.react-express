import express              from 'express'
import bodyParser			from 'body-parser'
import fallback             from 'connect-history-api-fallback'
import { join, resolve }    from 'path'
import webpack              from 'webpack'
import webpackConfig        from '../configuration/webpack/webpack.dev.config'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import morgan 				from 'morgan'
import chalk				from 'chalk'

// Variables
const PORT = process.env.PORT || 3000
const app = express()
let webpackCompiler = webpack(webpackConfig)

//	Logger
app.use(morgan('dev'))

// Body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//  History API fallback
app.use(fallback({ verbose: false }))

//  Webpack dev middleware
app.use(webpackDevMiddleware(webpackCompiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true
	},
	noInfo: true
}))

// Webpack HRM
app.use(webpackHotMiddleware(webpackCompiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000,
}))

// Express routing
app.get('*', (req, res) => {
	res.send(join(__dirname, 'index.html'))
})

// Run server
app.listen(PORT, () => console.log(chalk.bgGreen(` Running on localhost:${PORT} `)))