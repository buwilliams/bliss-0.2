const path = require('path');

module.exports = {
  website: function(env) {
    return path.join(
      env.workspace, 'blissui', 'website', 'dist', 'bliss_ui_website');
  },

  workspace: function(env, session) {
    return path.join(
      env.workspace,
      session.user.username,
      session.user.workspace);
  },

  hosted: function(env) {
    return path.join(
      env.workspace,
      'hosted');
  },

  dist: function(env, session) {
    return path.join(
      env.workspace,
      'hosted',
      session.user.username,
      session.user.workspace);
  }
}
