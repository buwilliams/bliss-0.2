const path = require('path');
const fs = require('fs');
const tree = require('../core/tree.js');
const css = require('../core/css.js');

module.exports = {
  write: function(outputPath, projectJson, startId) {
    var filename = `${projectJson.build}.css`;
    var builtStr = this.build(projectJson, startId);
    var fullpath = path.join(outputPath, filename);
    fs.writeFileSync(fullpath, builtStr);
  },

  build: function(projectJson, startId) {
    var out = "";

    tree.traverse(projectJson, startId, function(proj, component) {
      //console.log('traversing ', component.id);
      if(typeof component.css === "undefined" || component.css === null) return;
      out += css.getCss(component.css, proj.cssVars);
    });

    return out;
  }
}
