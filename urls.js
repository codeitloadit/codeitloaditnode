var routes = require('./routes')
  , dominion = require('./routes/dominion')
  , paperjs = require('./routes/paperjs')
  , auth = require('./routes/auth');

function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('login?redir=' + req.url);
  }
}

module.exports.route = function(app) {
  app.get('/', routes.index);
  app.get('/login', auth.login);
  app.post('/login', auth.authenticate);
  app.get('/logout', auth.logout);
  app.get('/dominion', requireLogin, dominion.home);
  app.get('/paperjs', paperjs.home);
}

