const user = require('./api/user');

function routes(app) {
  app.use('/api/users', user);
}

module.exports = routes;
