import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import noteRoute from './note.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome to Fundoo Notes');
  });
  router.use('/users', userRoute);
  router.use('/notes', noteRoute);

  return router;
};

export default routes;