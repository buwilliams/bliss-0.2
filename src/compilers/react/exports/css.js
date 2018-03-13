const path = require('path');
const fs = require('fs');
const tree = require('../../core/tree.js');
const css = require('../../core/css.js');

module.exports = {
  write: function(outputPath, projectJson, startId) {
    var filename = (projectJson.filename || 'designer') + '.css';
    var builtStr = this.build(projectJson, startId);
    var fullpath = path.join(outputPath, filename);
    fs.writeFileSync(fullpath, builtStr);
  },

  build: function(projectJson, startId) {
    var out = "";

    out += css.getCss(null, projectJson.css, projectJson.cssVars);

    tree.traverse(projectJson, startId, function(proj, component) {
      if(typeof component.css === "undefined" || component.css === null) return;
      out += css.getCss(component, component.css, proj.cssVars);
    });

    return out;
  }
}
