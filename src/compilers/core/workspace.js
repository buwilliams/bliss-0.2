const path = require('path')
const fs = require('fs-extra')
const project = require('./project.js')

module.exports = {
  website: function(env) {
    return path.join(this.deployed(env), env.bliss_user, 'website');
  },

  workspace: function(env, session) {
    var wsPath = path.join(env.workspace,
      session.user.username,
      session.user.workspace);

    if(!fs.existsSync(wsPath)) project.createWorkspace(wsPath);

    return wsPath
  },

  deployed: function(env) {
    return path.join(
      env.workspace,
      '_deployed');
  },

  deploy: function(env, session) {
    return path.join(
      env.workspace,
      '_deployed',
      session.user.username,
      session.user.workspace);
  },

  list: function(env, session) {
    var dir = path.join(env.workspace,
                        session.user.username);
    var files = fs.readdirSync(dir);
    var filelist = [];
    files.forEach(function(f) {
      var stats = fs.statSync(path.join(dir, f));
      if(stats.isDirectory()) {
        filelist.push({
          "name": f,
          "projects": []
        });
      }
    })
    return filelist;
  },

  listProjects: function(env, session, workspace) {
    var dir = path.join(env.workspace,
                        session.user.username,
                        workspace,
                        "projects");
    var files = fs.readdirSync(dir);
    var filelist = [];
    files.forEach(function(f) {
      var stats = fs.statSync(path.join(dir, f));
      if(stats.isFile()) {
        filelist.push({ "name": f });
      }
    })
    return filelist;
  },

  newWs: function(env, session, workspace) {
    var wsPath = path.join(env.workspace,
                           session.user.username,
                           workspace);

    if(!fs.existsSync(wsPath)) project.createWorkspace(wsPath);
  },

  deleteWs: function(env, session, workspace) {
    var wsPath = path.join(env.workspace,
                           session.user.username,
                           workspace);

    if(fs.existsSync(wsPath)) fs.removeSync(wsPath);
  },

  renameWs: function(env, session, workspaceName, newWorkspaceName) {
    var wsPath = path.join(env.workspace,
                           session.user.username,
                           workspaceName);

    var newWsPath = path.join(env.workspace,
                           session.user.username,
                           workspaceName);

    if(fs.existsSync(wsPath)) fs.moveSync(wsPath, newWsPath);
  }
}
