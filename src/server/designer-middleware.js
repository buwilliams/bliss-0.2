const tokens = require('./core/tokens.js')
const env = require('./env.js')
const session = require('./session.js');
const ws = require('../compilers/core/workspace.js');

module.exports = function(req, res, next) {
  console.log('Designer url:', req.url, 'Token:', req.params.token)

  var validToken = tokens.verifyToken(req.params.token, env.secret_key);
  if(!validToken) {
    res.status(401).send('Invalid token');
    return;
  }

  var parts = tokens.getTokenParts(req.params.token);
  var newSession = Object.assign({}, session);
  newSession.user.username = parts[0];
  res.sendFile(req.url, {root: ws.workspace(env, newSession)});
}
