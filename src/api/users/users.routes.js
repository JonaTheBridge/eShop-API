import Router from 'express';
import * as usersController from './users.controller.js';
import isAdmin from '../../middlewares/adminMiddleware.js';

const router = Router();

router.get(
  '/',
  isAdmin,
  usersController.getAll,
);

router.get(
  '/email/:email',
  usersController.getByEmail,
);

router.get(
  '/username/:username',
  usersController.getByUsername,
);

router.get(
  '/:id',
  usersController.getById,
);

router.put(
  '/:id',
  usersController.update,
);

router.delete(
  '/:id',
  isAdmin,
  usersController.remove,
);

export default router;
