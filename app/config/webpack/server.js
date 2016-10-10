//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

var path = require('path');
var extend = require('extend');
var commonConfig = require('./common');

const serverConfig = extend(true, {}, commonConfig, {
  entry: './server.tsx',

  output: {
    filename: 'server.js',
  },

  target: 'node',

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
});

module.exports = serverConfig;