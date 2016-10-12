//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

var extend = require('extend');
var webpack = require('webpack');
var commonConfig = require('./common');

const clientConfig = extend(true, {}, commonConfig, {
  entry: [
    // Add the client which connects to our middleware
    // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    // useful if you run your app from another point like django
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    // And then the actual application
    './client.tsx',
  ],

  output: {
    publicPath: '/',
    filename: 'client.bundle.js'
  },

  target: 'web',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  
  // module: {
  //   loaders: [{
  //     test: /\.tsx?$/,
  //     loaders: ['react-hot', 'ts']
  //   }]
  // },
});

module.exports = clientConfig;