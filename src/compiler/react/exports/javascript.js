var beautify = require('js-beautify').js_beautify;
var js = require('../core/js.js');
var reactTree = require('../core/react-tree.js');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = {
  write: function(outputPath, projectJson, startId) {
    // write bliss javascript
    var filename = `${projectJson.build}.js`;
    var builtStr = this.build(projectJson, startId);
    var fullpath = path.join(outputPath, filename);
    fs.writeFileSync(fullpath, builtStr);

    // write new project javascript
    builtStr = this.buildNewProjectJson(projectJson);
    filename = `${projectJson.build}-new-project.js`;
    fullpath = path.join(outputPath, filename);
    fs.writeFileSync(fullpath, builtStr);

    // write current json
    var projectJsonStr = this.buildProjectJson(projectJson);
    filename = `${projectJson.build}-project.js`;
    fullpath = path.join(outputPath, filename);
    fs.writeFileSync(fullpath, projectJsonStr);
  },

  build: function(projectJson, startId) {
    var out = "";
    // build the app javascript
    // build the react javascript
    // build the helper methods
    //var js = beautify(reactDom.buildReact(projectJson, startId), {
      //indent_size: 2
    //});
    return out;
  },

  buildProjectJson: function(projectJson) {
    var out = "var blissProject = " + JSON.stringify(projectJson, null, 2);
    out += `\nif(typeof module !== "undefined") module.exports = blissProject;\n`;
    return out;
  },

  buildNewProjectJson: function() {
    //if(typeof module !== "undefined") module.exports = blissProject;
    var newProjectJson = {
      "name": "New Project",
      "compiler": "react",
      "version": "v0.2",
      "type": "app",
      "build": "designer",
      "next_id": 2,
      "root_id": "1",
      "externalCss": [],
      "externalJs": [
        "node_modules/react/dist/react.js",
        "node_modules/react-dom/dist/react-dom.js",
      ],
      "state": {},
      "js": [
        {
          "name": "init",
          "body": `function() { app.render(); }`
        }
      ],
      "cssVars": [],
      "css": [],
      "load": ['init'],
      "components": {
        "1": {
          "id": "1",
          "name": "New Project",
          "element": "div",
          "text": null,
          "attributes": [],
          "css": [],
          "js": [],
          "dynamicAttributes": [],
          "next": null,
          "previous": null,
          "child": null,
          "parent": null
        }
      }
    };

    var out = "var newBlissProject = " + JSON.stringify(newProjectJson, null, 2);
    out += `\nif(typeof module !== "undefined") module.exports = newBlissProject;\n`;
    return out;
  }
}
