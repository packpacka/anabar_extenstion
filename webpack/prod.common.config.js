const webpack = require('webpack')

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        TRACKER_API_URL: JSON.stringify(process.env.TRACKER_API_URL),
        ZAYA_API_URL: JSON.stringify(process.env.ZAYA_API_URL),
        GOOGLE_OAUTH_URL: JSON.stringify(process.env.GOOGLE_OAUTH_URL),
        SENTRY_ENVIRONMENT: JSON.stringify(process.env.SENTRY_ENVIRONMENT),
        SENTRY_RELEASE: JSON.stringify(process.env.SENTRY_RELEASE),
        SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.sss$/,
        loaders: [
          'style-loader',
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
