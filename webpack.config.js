const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/languages/juvix.js',
  output: {
    path: path.resolve('dist'),
    filename: 'juvix.min.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: 'assets'}
      ]
    })
  ],
  devServer: {
    client: {
      progress: true,
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: false,
    port: 9003,
    hot: false,
    watchFiles: {
      paths: ['./src/**/*', './assets/**/*', './dist/testcode.html'],
    }
  },
};
