const path = require('path')
const fs = require('fs-extra')
const str = require('../compilers/core/str.js')

module.exports = function(env, session) {
  var pub = {}
  var dir = path.join(env.workspace, session.user.username)

  pub.createUser = function() {
    fs.ensureDirSync(dir)
  }

  pub.deleteUser = function() {
    fs.removeSync(dir)
  }

  pub.listUsers = function() {
    return fs.readdirSync(env.workspace)
  }

  pub.fullpath = dir
  pub.env = env
  pub.session = session
  pub.name = session.user.username

  return pub
}
