import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import expressJwt from 'express-jwt';
import config from '../../config/env';
import trackCtrl from '../controllers/track.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  
  // Needs token as header. Authorization: Bearer {token}
  .all(expressJwt({ secret: config.jwtSecret }))

  /** GET /api/users - Get list of users */
  .get(trackCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), trackCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(trackCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), trackCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(trackCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', trackCtrl.load);

export default router;
