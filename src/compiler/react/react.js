const path = require('path');
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
    this.compile(workspace, projectJson, componentId);
  }
};
