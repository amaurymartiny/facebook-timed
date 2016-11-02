import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import config from '../../config/env';
import trackCtrl from '../controllers/track.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  // Needs token as header. Authorization: Bearer {token}
  .all(expressJwt({ secret: new Buffer(config.jwtSecret, 'base64'), audience: config.jwtAudience }))

  /** GET /api/tracks - Get list of tracks */
  .get(trackCtrl.list)

  /** POST /api/tracks - Create new track */
  // .post(validate(paramValidation.createtrack), trackCtrl.create);
  .post(trackCtrl.create)

router.route('/find')
  // Needs token as header. Authorization: Bearer {token}
  .all(expressJwt({ secret: new Buffer(config.jwtSecret, 'base64'), audience: config.jwtAudience }))

  /** GET /api/tracks/find - Find tracks by query */
  .get(trackCtrl.find)

router.route('/:trackId')
  /** GET /api/tracks/:trackId - Get track */
  .get(trackCtrl.get)

  /** PUT /api/tracks/:trackId - Update track */
  // .put(validate(paramValidation.updatetrack), trackCtrl.update)
  .put(trackCtrl.update)

  /** DELETE /api/tracks/:trackId - Delete track */
  .delete(trackCtrl.remove);

/** Load track when API with trackId route parameter is hit */
router.param('trackId', trackCtrl.load);

export default router;
