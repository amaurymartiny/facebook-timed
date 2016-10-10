//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

var extend = require('extend');
var commonConfig = require('./common');

const clientConfig = extend(true, {}, commonConfig, {
  entry: './client.tsx',

  output: {
    filename: 'bundle.js'
  },

  target: 'web',

  plugins: [
  ],

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
});

module.exports = clientConfig;