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
    try {
      return fs.readdirSync(user.fullpath)
    } catch(e) {
      return []
    }
  }

  pub.listFiles = function(appendPath) {
    try {
      return fs.readdirSync(path.join(dir, appendPath))
    } catch(e) {
      return []
    }
  }

  pub.createFile = function(appendPath, contents) {
    fs.ensureDirSync(path.dirname(path.join(dir, appendPath)))
    fs.writeFileSync(path.join(dir, appendPath), contents)
    return this
  }

  pub.deleteFile = function(appendPath) {
    fs.removeSync(path.join(dir, appendPath))
    return this
  }

  pub.deployWorkspace = function() {
    var deployPath = path.join(user.env.workspace, '_deployed', user.name, workspace)
    fs.ensureDirSync(deployPath)
    fs.copySync(dir,
                deployPath,
                {overwrite: true, dereference: true})
    if(fs.existsSync(path.join(deployPath, 'designer.html'))) {
      fs.moveSync(path.join(deployPath, 'designer.html'),
                  path.join(deployPath, 'index.html'),
                  {overwrite: true});
    }
    return this
  }

  pub.listDeployed = function() {
    try {
      var sharedPath = path.join(user.env.workspace, '_deployed')
      var out = []
      var dirs = fs.readdirSync(sharedPath)
      dirs.forEach(function(dir) {
        var subdirs = fs.readdirSync(path.join(sharedPath, dir))
        subdirs.forEach(function(subdir) {
          out.push(`${dir}/${subdir}`)
        })
      })
      return out
    } catch(e) {
      return []
    }
  }

  pub.shareWorkspace = function() {
    var sharePath = path.join(user.env.workspace, '_shared', user.name, workspace)
    fs.ensureDirSync(sharePath)
    fs.copySync(dir,
                sharePath,
                {overwrite: true, dereference: true})
    if(fs.existsSync(path.join(sharePath, 'designer.html'))) {
      fs.moveSync(path.join(sharePath, 'designer.html'),
                  path.join(sharePath, 'index.html'),
                  {overwrite: true});
    }
    return this
  }

  pub.importWorkspace = function(fromUser, fromWorkspace) {
    var sharePath = path.join(user.env.workspace, '_shared', fromUser, fromWorkspace)
    var componentsPath = path.join(dir, 'components', fromWorkspace)
    fs.ensureDirSync(componentsPath)
    fs.copySync(sharePath,
                componentsPath,
                {overwrite: true, dereference: true})
    if(fs.existsSync(path.join(sharePath, 'designer.html'))) {
      fs.moveSync(path.join(componentsPath, 'index.html'),
                  path.join(componentsPath, 'designer.html'),
                  {overwrite: true});
    }
    return this
  }

  pub.listShared = function() {
    try {
      var sharedPath = path.join(user.env.workspace, '_shared')
      var out = []
      var dirs = fs.readdirSync(sharedPath)
      dirs.forEach(function(dir) {
        var subdirs = fs.readdirSync(path.join(sharedPath, dir))
        subdirs.forEach(function(subdir) {
          out.push(`${dir}/${subdir}`)
        })
      })
      return out
    } catch(e) {
      return []
    }
  }

  pub.listComponents = function() {
    try {
      return fs.readdirSync(path.join(dir, 'components'))
    } catch(e) {
      return []
    }
  }

  pub.deleteComponent = function(componentName) {
    fs.removeSync(path.join(dir, 'components', componentName))
    return this
  }

  pub.fullpath = dir
  pub.name = workspace

  return pub
}
