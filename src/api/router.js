import Router from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from './swagger.js'; // https://editor.swagger.io
import * as authController from './auth/auth.controller.js';
const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

export default router;
