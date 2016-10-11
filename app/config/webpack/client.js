//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

var extend = require('extend');
var webpack = require('webpack');
var commonConfig = require('./common');

const clientConfig = extend(true, {}, commonConfig, {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './client.tsx',
  ],

  output: {
    filename: 'client.js'
  },

  target: 'web',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['react-hot', 'ts']
    }]
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
});

module.exports = clientConfig;