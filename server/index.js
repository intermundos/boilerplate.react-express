import { join, resolve }    from "path"
import express              from "express"
import fallback             from 'connect-history-api-fallback'
import morgan               from 'morgan'
import webpack              from "webpack"
import webpackConfig        from "../configuration/webpack/webpack.dev.config"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"

let server = express()
let webpackCompiler = webpack(webpackConfig)

//  History API fallback
server.use(fallback({ verbose: false }))

//  Webpack dev middleware
server.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  },
  noInfo: true
}))

// Webpack HRM
server.use(webpackHotMiddleware(webpackCompiler))

server.use(morgan('dev'))

server.get('*', (req, res) => {
  res.send(join(__dirname, 'index.html'))
})

const PORT = process.env.PORT || 3000
server.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`-- server running on localhost:${ PORT }`)
})
