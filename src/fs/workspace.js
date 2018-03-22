const path = require('path')
const fs = require('./secure-fs.js')
const proj = require('./project.js')
const compress = require('../compilers/core/compress.js');

module.exports = function(user, workspace) {
  var pub = {};
  var username = user.name;
  var dir;

  if(typeof(workspace) === 'string') {
    dir = path.join(user.fullpath, workspace);
  }

  pub.createWorkspace = function() {
    fs(username).ensureDirSync(path.join(dir))
    fs(username).ensureDirSync(path.join(dir, 'projects'))
    fs(username).ensureDirSync(path.join(dir, 'components'))
    fs(username).ensureDirSync(path.join(dir, 'js'))
    fs(username).ensureDirSync(path.join(dir, 'css'))
    fs(username).ensureDirSync(path.join(dir, 'assets'))
    return this
  }

  pub.deleteWorkspace = function() {
    fs(username).removeSync(dir)
    return this
  }

  pub.listWorkspaces = function() {
    try {
      var workspaces = fs(username).readdirSync(user.fullpath);

      // filter out zip files
      workspaces = workspaces.reduce(function(accumulator, currentWs) {
        if(currentWs.indexOf('.zip') === -1) {
          accumulator.push(currentWs);
        }
        return accumulator;
      }, []);

      return workspaces;
    } catch(e) {
      return []
    }
  }

  pub.listFiles = function(appendPath) {
    try {
      return fs(username).readdirSync(path.join(dir, appendPath))
    } catch(e) {
      return []
    }
  }

  pub.createFile = function(appendPath, contents) {
    fs(username).ensureDirSync(path.dirname(path.join(dir, appendPath)))
    fs(username).writeFileSync(path.join(dir, appendPath), contents)
    return this
  }

  pub.deleteFile = function(appendPath) {
    fs(username).removeSync(path.join(dir, appendPath))
    return this
  }

  pub.deployWorkspace = function() {
    var deployPath = path.join(user.env.workspace, '_deployed', user.name, workspace)
    fs(username).ensureDirSync(deployPath)
    fs(username).copySync(dir,
                deployPath,
                {overwrite: true, dereference: true})
    /*
    if(fs(username).existsSync(path.join(deployPath, 'designer.html'))) {
      fs(username).moveSync(path.join(deployPath, 'designer.html'),
                  path.join(deployPath, 'index.html'),
                  {overwrite: true});
    }
    */
    return this
  }

  pub.listDeployed = function() {
    try {
      var deployedPath = path.join(user.env.workspace, '_deployed')
      var out = []
      var dirs = fs(username, true).readdirSync(deployedPath)
      dirs.forEach(function(dir) {
        var subdirs = fs(username, true).readdirSync(path.join(deployedPath, dir))
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
    fs(username).ensureDirSync(sharePath)
    fs(username).copySync(dir,
                sharePath,
                {overwrite: true, dereference: true})
    if(fs(username).existsSync(path.join(sharePath, 'designer.html'))) {
      fs(username).moveSync(path.join(sharePath, 'designer.html'),
                  path.join(sharePath, 'index.html'),
                  {overwrite: true});
    }
    return this
  }

  pub.importWorkspace = function(fromUser, fromWorkspace) {
    var sharePath = path.join(user.env.workspace, '_shared', fromUser, fromWorkspace)
    var componentsPath = path.join(dir, 'components', fromWorkspace)
    fs(username).ensureDirSync(componentsPath)
    fs(username).copySync(sharePath,
                componentsPath,
                {overwrite: true, dereference: true})
    if(fs(username).existsSync(path.join(sharePath, 'designer.html'))) {
      fs(username).moveSync(path.join(componentsPath, 'index.html'),
                  path.join(componentsPath, 'designer.html'),
                  {overwrite: true});
    }
    return this
  }

  pub.listShared = function() {
    try {
      var sharedPath = path.join(user.env.workspace, '_shared')
      var out = []
      var dirs = fs(username).readdirSync(sharedPath)
      dirs.forEach(function(dir) {
        var subdirs = fs(username).readdirSync(path.join(sharedPath, dir))
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
      return fs(username).readdirSync(path.join(dir, 'components'))
    } catch(e) {
      return []
    }
  }

  pub.deleteComponent = function(componentName) {
    fs(username).removeSync(path.join(dir, 'components', componentName))
    return this
  }

  pub.project = function(projectJson) {
    return proj(this, projectJson)
  }

  pub.createZip = function() {
    var fromDir = this.fullpath;
    var toFile = path.join(this.user.fullpath, this.name, this.name + '.zip');
    return compress.zip(fromDir, toFile); // returns promise
  };

  pub.fullpath = dir
  pub.name = workspace
  pub.user = user
  pub.deployPath = path.join(user.env.workspace, '_deployed')
  pub.websitePath = path.join(pub.deployPath, user.env.bliss_user, 'website')

  return pub
}
