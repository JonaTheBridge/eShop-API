import Router from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from './swagger.js'; // https://editor.swagger.io
const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

export default router;
