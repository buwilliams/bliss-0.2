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

  pub.createWorkspace = function(name) {
    fs.ensureDirSync(path.join(dir, name))
    fs.ensureDirSync(path.join(dir, name, 'projects'))
    fs.ensureDirSync(path.join(dir, name, 'components'))
    fs.ensureDirSync(path.join(dir, name, 'js'))
    fs.ensureDirSync(path.join(dir, name, 'css'))
    fs.ensureDirSync(path.join(dir, name, 'assets'))
  }

  pub.listWorkspaces = function() {
    return fs.readdirSync(dir)
  }

  pub.deleteWorkspace = function(name) {
    fs.removeSync(path.join(dir, name))
  }

  pub.fullpath = dir
  pub.env = env
  pub.session = session

  return pub
}
