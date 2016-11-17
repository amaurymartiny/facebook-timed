/* eslint-disable import/no-extraneous-dependencies */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  // Be able to write: import Header from './Header' if we have Header.jsx
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./.env`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env'
    }),
    // CSS files from the extract-text-plugin loader
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    })
  ],
  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      // Process JS with Babel.
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      // The notation here is somewhat confusing.
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader normally turns CSS into JS modules injecting <style>,
      // but unlike in development configuration, we do something different.
      // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
      // (second argument), then grabs the result CSS and puts it into a
      // separate file in our build process. This way we actually ship
      // a single CSS file in production instead of JS code injecting <style>
      // tags. If you use code splitting, however, any async bundles will still
      // use the "style" loader inside the async code so CSS from them won't be
      // in the main CSS file.
      {
        test: /\.css$/,
        // "?-autoprefixer" disables autoprefixer in css-loader itself:
        // https://github.com/webpack/css-loader/issues/281
        // We already have it thanks to postcss. We only pass this flag in
        // production because "css" loader only enables autoprefixer-powered
        // removal of unnecessary prefixes when Uglify plugin is enabled.
        loader: ExtractTextPlugin.extract('style', 'css!less')
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: 'json'
      },
      // "file" loader makes sure those assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // "url" loader works just like "file" loader but it also embeds
      // assets smaller than specified size as data URLs to avoid requests.
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  postcss: [
    autoprefixer
  ]
}
