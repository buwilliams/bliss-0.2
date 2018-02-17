const path = require('path')
const fs = require('./secure-fs.js')
const str = require('../compilers/core/str.js')

module.exports = function(env, session) {
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

  pub.fullpath = dir
  pub.env = env
  pub.session = session
  pub.name = session.user.username

  return pub
}
