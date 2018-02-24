const path = require('path')
const fs = require('./secure-fs.js')
const str = require('../compilers/core/str.js')
const defaultEnv = require('../server/env.js');
const defaultSession = require('../server/session.js');
const ws = require('./workspace.js')

module.exports = function(env, session) {
  if(typeof(env) === 'undefined') env = defaultEnv
  if(typeof(session) === 'undefined') session = defaultSession
  
  var pub = {}
  var username = session.user.username
  var dir = path.join(env.workspace, username)

  pub.createUser = function() {
    fs(username, true).ensureDirSync(dir)
    return this
  }

  pub.deleteUser = function() {
    fs(username, true).removeSync(dir)
    return this
  }

  pub.listUsers = function() {
    return fs(username, true).readdirSync(env.workspace)
  }

  pub.workspace = function(workspaceName) {
    return ws(this, workspaceName)
  }

  pub.fullpath = dir
  pub.env = env
  pub.session = session
  pub.name = session.user.username

  return pub
}
