import express from 'express';
// import userRoutes from './user.route';
import trackRoutes from './track.route';
import websiteRoutes from './website.route';

const router = express.Router(); // eslint-disable-line new-cap

// mount routes
// router.use('/users', userRoutes); // we don't need users route for now
router.use('/tracks', trackRoutes);
router.use('/websites', websiteRoutes);

export default router;
