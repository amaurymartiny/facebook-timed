// import {config} from '../config/main.js';

import * as path from 'path';
import * as http from 'http';
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

let config = require('../config/config');

const app = express();
app.set('port', config.port); // 3000
app.set('host', config.host); // localhost

// //
// // Register Node.js middleware
// // -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());
app.use(compression);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Webpack Hot Reload
// -----------------------------------------------------------------------------
// // Step 1: Create & configure a webpack compiler
// let webpack = require('webpack');
// let webpackConfig = require('../config/webpack/client');
// let compiler = webpack(webpackConfig);

// // Step 2: Attach the dev middleware to the compiler & the server
// app.use(require("webpack-dev-middleware")(compiler, {
// noInfo: true, publicPath: webpackConfig.output.publicPath
// }));

// // Step 3: Attach the hot middleware to the compiler & the server
// app.use(require("webpack-hot-middleware")(compiler, {
// log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
// }));

//
// Launch the server
// -----------------------------------------------------------------------------
app.listen(app.get('port'), () => {
    console.info('Server listening at http://%s:%s/', app.get('host'), app.get('port'));
});