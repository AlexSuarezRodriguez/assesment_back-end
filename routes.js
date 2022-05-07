const user = require('./api/user');
const authLocal = require('./auth/local');

function routes(app) {
  app.use('/api/users', user);
  app.use('/auth/local', authLocal);
}

module.exports = routes;
