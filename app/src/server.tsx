// import {config} from '../config/main.js';

import * as path from 'path';
import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';

let config = require('../config/config');

const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//
// Launch the server
// -----------------------------------------------------------------------------
app.set('port', config.port);
app.set('host', config.host);
app.listen(app.get('port'), () => {
  console.info('Server listening at http://%s:%s/', app.get('host'), app.get('port'));
});