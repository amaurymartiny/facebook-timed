import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import websiteCtrl from '../controllers/website.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/websites - Get list of websites */
  .get(websiteCtrl.list)

  /** POST /api/websites - Create new website */
  // .post(validate(paramValidation.createwebsite), websiteCtrl.create);

router.route('/:websiteId')

  /** GET /api/websites/:websiteId - Get website */
  .get(websiteCtrl.get)

  /** PUT /api/websites/:websiteId - Update website */
  // .put(validate(paramValidation.updatewebsite), websiteCtrl.update)

  /** DELETE /api/websites/:websiteId - Delete website */
  // .delete(websiteCtrl.remove);

/** Load website when API with websiteId route parameter is hit */
router.param('websiteId', websiteCtrl.load);

export default router;
