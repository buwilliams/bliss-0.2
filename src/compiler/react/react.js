const path = require('path');
const mkdirp = require('mkdirp');
const str = require('./core/str.js');
const html = require('./exports/html.js');
const css = require('./exports/css.js');
const js = require('./exports/javascript.js');

module.exports = {
  getComponentId: function(projectJson, componentId) {
    return (typeof componentId === "undefined" || componentId === null) ?
      projectJson.rootId : componentId;
  },

  compile: function(outputPath, projectJson, componentId) {
    var startId = this.getComponentId(projectJson, componentId);
    html.write(outputPath, projectJson, startId);
    js.write(path.join(outputPath, 'js'), projectJson, startId);
    css.write(path.join(outputPath, 'css'), projectJson, startId);
  },

  export: function(workspace, projectJson, componentId) {
    var projectName = str.getSnake(projectJson.name);
    var outputPath = path.join(workspace, 'components', projectName);

    // resets all the file names
    projectJson.build = projectName;

    // mkdirs
    mkdirp.sync(outputPath);
    mkdirp.sync(path.join(outputPath, 'js'));
    mkdirp.sync(path.join(outputPath, 'css'));

    var startId = this.getComponentId(projectJson, componentId);

    html.write(outputPath, projectJson, startId);
    js.write(path.join(outputPath, 'js'), projectJson, startId);
    css.write(path.join(outputPath, 'css'), projectJson, startId);
  },

  dist: function(workspace, projectJson, componentId) {
    // similar to export
    var projectName = str.getSnake(projectJson.name);
    var outputPath = path.join(workspace, 'dist', projectName);
    var sourcePath = path.join(outputPath, 'app');

    // resets all the file names
    projectJson.build = projectName;

    // mkdirs
    mkdirp.sync(sourcePath);
    mkdirp.sync(path.join(sourcePath, 'js'));
    mkdirp.sync(path.join(sourcePath, 'css'));

    var startId = this.getComponentId(projectJson, componentId);

    html.write(sourcePath, projectJson, startId);
    js.write(path.join(sourcePath, 'js'), projectJson, startId);
    css.write(path.join(sourcePath, 'css'), projectJson, startId);

    // write package.json
    // download deps
    // include a web server
    // download as zip file?
  }
};
