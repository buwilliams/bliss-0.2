var html = require('./exports/html.js');
var css = require('./exports/css.js');
var js = require('./exports/javascript.js');

module.exports = {
  getComponentId: function(projectJson, componentId) {
    return (typeof componentId === "undefined" || componentId === null) ?
      projectJson.rootId : componentId;
  },

  compile: function(outputPath, projectJson, componentId) {
    var startId = this.getComponentId(projectJson, componentId);
    html.write(outputPath, projectJson, startId);
    js.write(outputPath, projectJson, startId);
    css.write(outputPath, projectJson, startId);
  },

  export: function(workspace, projectJson, componentId) {
    this.compile(workspace, projectJson, componentId);
  }
};
