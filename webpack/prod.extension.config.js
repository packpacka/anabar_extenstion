const path = require('path')
const { merge } = require('webpack-merge')

const commonConfig = require('./prod.common.config')

module.exports = merge(commonConfig, {
  devtool: 'hidden-source-map',
  entry: {
    popup: path.join(__dirname, '../src/popup/index'),
    app: path.join(__dirname, '../src/app/index'),
    background: path.join(__dirname, '../src/background/index'),
  },
  output: {
    path: path.join(__dirname, '../build/dist'),
  },
})
