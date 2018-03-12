const path = require('path');
const mkdirp = require('mkdirp');
const fsutils = require('fs-utils');
const deps = require('../../fs/dependencies.js');
const str = require('../core/str.js');
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
    js.write(path.join(outputPath, 'js'), projectJson, startId, true);
    css.write(path.join(outputPath, 'css'), projectJson, startId);
  },

  dist: function(workspace, projectJson, componentId) {
    // similar to export
    var projectName = str.getSnake(projectJson.name);
    var outputPath = workspace;
    var sourcePath = workspace;

    // resets all the file names
    projectJson.build = projectName;

    // mkdirs
    mkdirp.sync(sourcePath);
    mkdirp.sync(path.join(sourcePath, 'js'));
    mkdirp.sync(path.join(sourcePath, 'css'));

    // TODO: loop CSS
    // TODO: loop JS

    var startId = this.getComponentId(projectJson, componentId);

    html.write(sourcePath, projectJson, startId);
    js.write(path.join(sourcePath, 'js'), projectJson, startId);
    css.write(path.join(sourcePath, 'css'), projectJson, startId);


    // write package.json
    deps.update(outputPath, projectJson, {
      "express": "^4.15.2"
    });

    // include a web server
    fsutils.copyFileSync(path.join(__dirname, 'express-mini-server.js'), path.join(outputPath, 'index.js'));
  }
};
