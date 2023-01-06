const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: [
    './server.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  }
};
