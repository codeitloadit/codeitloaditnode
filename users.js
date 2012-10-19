var users = {
  'Barry': {username: 'Barry', password: '1qaz2wsx', role: 'admin'},
  'Kobe': {username: 'Kobe', password: 'password', role: 'user'},
  'OB': {username: 'OB', password: 'password', role: 'user'},
  'Chris': {username: 'Chris', password: 'password', role: 'user'},
}

module.exports.authenticate = function(username, password, callback) {
  var user = users[username];
  if (!user) {
    callback(null);
    return;
  }
  if (user.password == password) {
    callback(user);
    return;
  }
  callback(null);
};