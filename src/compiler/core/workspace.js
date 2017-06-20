const path = require('path');

module.exports = {
  website: function(env) {
    return path.join(this.deployed(env), 'blissui', 'website');
  },

  workspace: function(env, session) {
    return path.join(
      env.workspace,
      session.user.username,
      session.user.workspace);
  },

  deployed: function(env) {
    return path.join(
      env.workspace,
      '_deployed');
  },

  deploy: function(env, session) {
    return path.join(
      env.workspace,
      '_deployed',
      session.user.username,
      session.user.workspace);
  }
}
