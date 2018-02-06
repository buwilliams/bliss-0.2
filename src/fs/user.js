const path = require('path')
const fs = require('fs-extra')
const str = require('../compilers/core/str.js')

module.exports = function(env, session) {
  var pub = {}
  var dir = path.join(env.workspace, session.user.username)

  var createUser = function() {
    fs.ensureDirSync(dir)
  }
  createUser()

  pub.listWorkspaces = function() {
    return fs.readdirSync(dir)
  }

  pub.fullpath = function() {
    return dir
  }

  pub.env = env
  pub.session = session

  return pub
}
