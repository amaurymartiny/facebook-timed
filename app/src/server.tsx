// Don't know what's that for
// import * as e6p from 'es6-promise';
// (e6p as any).polyfill();
// import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect');
import { configureStore } from './app/redux/store';
import routes from './app/routes';

import { Html } from './app/containers';
const manifest = require('../build/manifest.json');

import * as express from 'express';
import * as path from 'path';
import * as compression from'compression';
import * as Chalk from 'chalk';
import * as favicon from 'serve-favicon';

import {port, host} from './config';

const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(compression());
app.use(favicon(path.join(__dirname, '../src/favicon.ico')));
app.use('/public', express.static(path.join(__dirname, '../build/public')));

//
// Hot reload for development environment
// -----------------------------------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../config/webpack/dev');
  const webpackCompiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    quiet: true,
  }));

  app.use(require('webpack-hot-middleware')(webpackCompiler));
}

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', (req, res) => {
  const location = req.url;
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const asyncRenderData = Object.assign({}, renderProps, { store });

        loadOnServer(asyncRenderData).then(() => {
          const markup = ReactDOMServer.renderToString(
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          res.status(200).send(renderHTML(markup));
        });

        function renderHTML(markup) {
          const html = ReactDOMServer.renderToString(
            <Html markup={markup} manifest={manifest} store={store} />
          );

          return `<!doctype html> ${html}`;
        }
      } else {
        res.status(404).send('Not Found?');
      }
    });
});

//
// Launch the server
// -----------------------------------------------------------------------------
app.listen(port, host, err => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(Chalk.black.bgGreen(
      `\n\n💂  Listening at http://${host}:${port}\n`
    ));
  }
});
