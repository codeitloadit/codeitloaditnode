
var users = require('../users');

exports.login = function(req, res, next){
  res.render('login.html', { redir: req.query.redir || req.body.redir });
};

exports.authenticate = function(req, res, next) {
  users.authenticate(req.body.username, req.body.password, function(user) {
    if (user) {
      req.session.user = user;
      res.redirect(req.body.redir || '/');
    } else {
      res.render('login.html', { redir: req.body.redir });
    }
  })
};

exports.logout = function(req, res, next){
  delete req.session.user;
  res.redirect('/login');
};