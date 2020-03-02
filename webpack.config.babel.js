const Webpack = require('webpack');

const Path = require('path');

module.exports = {
  entry: {
    path: Path.join(__dirname, 'src', 'index.js'),
  },
  mode: 'production',
  output: {
    path: Path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'PopcornCanvas',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
