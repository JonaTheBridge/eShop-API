import unauthorized from '../utils/unauthorized.js';

export default function middleware(req, res, next) {
  if (req.user.role !== 'admin') {
    unauthorized(res);
    return;
  }

  next();
}
