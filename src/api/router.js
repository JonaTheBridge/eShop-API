import Router from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from './swagger.js'; // https://editor.swagger.io
import * as authController from './auth/auth.controller.js';
import usersRouter from './users/users.routes.js';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

router.use('/users', usersRouter);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

export default router;
