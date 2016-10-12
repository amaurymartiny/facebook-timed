//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

var path = require('path');
var extend = require('extend');
var commonConfig = require('./common');

const serverConfig = extend(true, {}, commonConfig, {
  entry: './server.tsx',

  output: {
    filename: 'server.bundle.js',
  },

  target: 'node',

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ]
  }
});

module.exports = serverConfig;