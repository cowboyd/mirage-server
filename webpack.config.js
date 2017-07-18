const path = require('path');

module.exports = {
  entry: {
    app: './lib/mirage-server.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/public'
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    publicPath: '/'
  },

  resolve: {
    alias: {
      qunit: 'qunitjs'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2016']
          }
        }]
      }
    ]
  }
};
