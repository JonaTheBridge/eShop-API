function middleware(request, response, next) {
  const { query } = request;
  console.info(`Middleware listening petition:
    USER: ${request.user?.username}
    ROLE: ${request.user?.role}
    METHOD: ${request.method}
    URL: ${request.url}
    QUERY: `, query);

  // Websites to allow
  response.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods to allow
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  // Request headers to allow
  response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization');

  // Request credentials
  response.setHeader('Access-Control-Allow-Credentials', true);

  next();
}

export default middleware;
