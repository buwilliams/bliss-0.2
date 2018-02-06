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
    return this
  }

  pub.deleteWorkspace = function() {
    fs.removeSync(dir)
    return this
  }

  pub.listWorkspaces = function() {
    return fs.readdirSync(user.fullpath)
  }

  pub.deploy = function() {
    // TODO: copy files to _deployed
  }

  pub.share = function() {
    // TODO: copy files to _shared
  }

  pub.import = function(workspace) {
    // TODO: copy files from _shared
  }

  pub.listShared = function() {
    // TODO: array of project paths from _shared
  }

  pub.deleteComponent = function(name) {
  }

  pub.fullpath = dir
  pub.name = workspace

  return pub
}
