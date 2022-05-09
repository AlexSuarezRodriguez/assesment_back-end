const user = require('./api/user');
const authLocal = require('./auth/local');
const list = require('./api/list');

function routes(app) {
  app.use('/api/users', user);
  app.use('/api/lists', list);
  app.use('/auth/local', authLocal);
}

module.exports = routes;
