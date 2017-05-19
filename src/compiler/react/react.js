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
    projectJson.build = "index";

    // mkdirs
    mkdirp.sync(outputPath);
    mkdirp.sync(path.join(outputPath, 'js'));
    mkdirp.sync(path.join(outputPath, 'css'));

    var startId = this.getComponentId(projectJson, componentId);

    html.write(outputPath, projectJson, startId);
    js.write(path.join(outputPath, 'js'), projectJson, startId);
    css.write(path.join(outputPath, 'css'), projectJson, startId);
  }
};
