import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import expressJwt from 'express-jwt';
import config from '../../config/env';
import userCtrl from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  // .get(userCtrl.list)

  /** POST /api/users - Create new user */
  // .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')

  // Needs token as header. Authorization: Bearer {token}
  .all(expressJwt({ secret: new Buffer(config.jwtSecret, 'base64'), audience: config.jwtAudience }))

  /** GET /api/users/:userId - Get user */
  // .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  // .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router;
