const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/languages/juvix.js',
  output: {
    path: path.resolve('dist'),
    filename: 'juvix.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};