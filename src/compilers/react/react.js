const path = require('path');
const mkdirp = require('mkdirp');
const fsutils = require('fs-utils');
const fs = require('fs');
const tree = require('../core/tree.js');
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
    projectJson = this.getLayoutJson(outputPath, projectJson);
    var startId = this.getComponentId(projectJson, projectJson.rootId);
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

    var startId = this.getComponentId(projectJson, componentId);

    html.write(sourcePath, projectJson, startId);
    js.write(path.join(sourcePath, 'js'), projectJson, startId);
    css.write(path.join(sourcePath, 'css'), projectJson, startId);


    // write package.json
    deps.update(outputPath, projectJson, {
      "express": "^4.15.2"
    });

    // include a web server
    fsutils.copyFileSync(
      path.join(__dirname, 'express-mini-server.js'),
      path.join(outputPath, 'index.js'));
  },

  getLayoutJson: function(outputPath, projectJson) {
    var layout = (projectJson.layout) ? projectJson.layout : '';
    if(layout === '') return projectJson;

    // load layout file
    var layoutPath = path.join(outputPath, 'projects', `${layout}.json`);
    if(!fs.existsSync(layoutPath)) return projectJson;
    var layoutStr = fs.readFileSync(layoutPath, { encoding: 'utf8'});
    var layoutJson = JSON.parse(layoutStr);

    // find layout component's parent in layout file
    var parentId = null;
    Object.keys(layoutJson.components).every((key) => {
      var comp = layoutJson.components[key];
      if(comp.element === 'content') {
        parentId = comp.parent;
        return false; // break out of loop early
      } else {
        return true;
      }
    });

    // if not found return projectJson
    if(parentId === null) return projectJson;

    // otherwise invoke tree.merge();
    var mergedProjectJson = tree.merge(projectJson, layoutJson, parentId);

    // Update dependencies
    deps.update(outputPath, mergedProjectJson);

    return mergedProjectJson;
  }
};
