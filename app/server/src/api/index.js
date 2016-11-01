import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import users from './users';
import websites from './websites';
// import tracks from './tracks';

export default ({ config, db }) => {
	let api = Router();

	// mount the resources
	api.use('/facets', facets({ config, db }));
  api.use('/users', users({ config, db }));
  api.use('/websites', websites({ config, db }));
  // api.use('/tracks', tracks({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
