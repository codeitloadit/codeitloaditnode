
exports.home = function(req, res){
  res.render('dominion.html', { user: req.session.user.username || '' });
};