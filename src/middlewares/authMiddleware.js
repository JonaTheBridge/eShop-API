import jwt from 'jsonwebtoken';
import * as usersBll from '../api/users/users.bll.js';
import unauthorized from '../utils/unauthorized.js';

function middleware(request, response, next) {
  const publicRoutes = [
    '/login',
    '/register',
  ];

  const isDocsRoute = request.url.includes('/docs');
  const isPublicRoute = publicRoutes.some((publicRoute) => publicRoute === request.url);
  if (isPublicRoute || isDocsRoute) {
    next();
    return;
  }

  const token = request.headers.authorization;
  if (!token) {
    unauthorized(response);
    return;
  }

  jwt.verify(token, process.env.AUTH_SECRET_KEY, async (error, payload) => {
    if (error) {
      console.error('ERROR!', error.message);
      return unauthorized(response);
    }

    request.user = await usersBll.getById({ id: payload.userId });
    return next();
  });
}

export default middleware;
