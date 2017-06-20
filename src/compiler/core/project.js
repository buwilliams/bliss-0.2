const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const str = require('./str.js');

module.exports = {
  formatJsonName: function(name) {
    return str.getSnake(name) + '.json';
  },
  readProject: function(workspace, name) {
    var fullpath = path.join(workspace, 'projects',
      this.formatJsonName(name));
    var jsonStr = fs.readFileSync(fullpath);
    return JSON.parse(jsonStr);
  },
  writeProject: function(workspace, json) {
    var fullpath = path.join(workspace, 'projects',
      this.formatJsonName(json.name));
    var jsonStr = JSON.stringify(json, null, 2);
    fs.writeFileSync(fullpath, jsonStr);
  },
  writeComponent: function(workspace, project, filename, content) {
    var d = path.join(workspace, 'components',
      project.export);
    mkdirp.sync(d);
    var fullpath = path.join(d, filename);
    fs.writeFileSync(fullpath, content);
  },
  writeBuild: function(workspace, filepath, strData) {
    var fullpath = path.join(workspace, filepath);
    fs.writeFileSync(fullpath, strData);
  },
  createWorkspace: function(workspace) {
    mkdirp.sync(workspace);
    mkdirp.sync(path.join(workspace, "components"));
    mkdirp.sync(path.join(workspace, "projects"));
  },
  listProjects: function(workspace) {
    var out = [];
    fs.readdirSync(path.join(workspace, 'projects')).forEach(function(file) {
      out.push(path.parse(file).name);
    });
    return out;
  }
};
