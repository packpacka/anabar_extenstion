const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')

const host = 'localhost'
const port = 3003

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    popup: path.join(__dirname, '../src/popup/index'),
    app: path.join(__dirname, '../src/app/index'),
    background: path.join(__dirname, '../src/background/index'),
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js`,
    stats: {
      colors: true,
    },
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  hotMiddleware: {
    path: '/js/__webpack_hmr',
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        TRACKER_API_URL: JSON.stringify(process.env.TRACKER_API_URL),
        ZAYA_API_URL: JSON.stringify(process.env.ZAYA_API_URL),
        GOOGLE_OAUTH_URL: JSON.stringify(process.env.GOOGLE_OAUTH_URL),
      },
    }),
    new WriteFilePlugin({
      test: /app.js/,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          // '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff(2)?|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
        loaders: ['url-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
