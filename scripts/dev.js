const createWebpackServer = require('webpack-httpolyglot-server')
const devConfig = require('../webpack/dev.config')
const { copyExtensionAssets, getPackageVersion } = require('./tasks')

const packageVersion = getPackageVersion()

copyExtensionAssets({ channel: 'dev', version: packageVersion, browser: 'chrome' })

createWebpackServer(devConfig, {
  host: 'localhost',
  port: 3003,
})
