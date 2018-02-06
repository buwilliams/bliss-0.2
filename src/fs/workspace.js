const path = require('path')
const fs = require('fs-extra')

module.exports = function(user, workspace) {
  var pub = {}
  var dir = path.join(user.fullpath, workspace)

  pub.createWorkspace = function() {
    fs.ensureDirSync(path.join(dir))
    fs.ensureDirSync(path.join(dir, 'projects'))
    fs.ensureDirSync(path.join(dir, 'components'))
    fs.ensureDirSync(path.join(dir, 'js'))
    fs.ensureDirSync(path.join(dir, 'css'))
    fs.ensureDirSync(path.join(dir, 'assets'))
  }

  pub.deleteWorkspace = function() {
    fs.removeSync(dir)
  }

  pub.deploy = function() {
  }

  pub.share = function() {
  }

  pub.import = function(user, workspace, project) {
  }

  pub.listShared = function() {
    // TODO: array of project paths (user/workspace)
  }

  pub.deleteComponent = function(name) {
  }

  pub.fullpath = dir

  return pub
}
