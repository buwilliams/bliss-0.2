const beautify = require('js-beautify').js_beautify;
const path = require('path');
const fs = require('fs');
const js = require('../../core/js.js');
const str = require('../../core/str.js');
const reactTree = require('../react-tree.js');
const tree = require('../../core/tree.js');
const deps = require('../../../fs/dependencies.js');

module.exports = {
  write: function(outputPath, projectJson, startId, writeAsComponent) {
    if(typeof writeAsComponent === 'undefined') writeAsComponent = false;
    var filename = (projectJson.filename || 'designer') + '.js';
    var builtStr = this.buildAppJs(projectJson, startId);
    builtStr += this.buildSchemas(projectJson);
    builtStr += this.buildReact(projectJson, startId);
    builtStr += this.buildHelpers(projectJson);
    var fullpath = path.join(outputPath, filename);
    var reactComponent = reactTree.buildReactClass(projectJson);
    builtStr = this.buildWrapper(projectJson, builtStr, reactComponent, writeAsComponent);
    builtStr = beautify(builtStr, { indent_size: 2 });
    fs.writeFileSync(fullpath, builtStr);

    // write new project javascript
    builtStr = this.buildNewProjectJson(projectJson);
    filename = (projectJson.filename || 'designer') + '-new-project.js';
    fullpath = path.join(outputPath, filename);
    fs.writeFileSync(fullpath, builtStr);

    // write current json
    var projectJsonStr = this.buildProjectJson(projectJson);
    filename = (projectJson.filename || 'designer') + '-project.js';
    fullpath = path.join(outputPath, filename);
    fs.writeFileSync(fullpath, projectJsonStr);
  },

  buildWrapper: function(projectJson, jsStr, reactStr, renderAsComponent) {
    var name = str.getCamel(projectJson.name);
    var out = "";
    out += `var ${name} = (function() {\n`;
    out += `var createApp = function(component) {`;
    if(renderAsComponent) {
      out += `if(typeof component === 'undefined') return {};\n`;
    }
    out += "var app = { js: {}, methods: {}, props: {}, state: {} };\n";
    out += jsStr + "\n";
    out += `return app;\n`;
    out += `};\n`;
    out += `var instance = createApp();\n`;
    out += `instance.component = ${reactStr}\n`;
    out += `return instance;\n`;
    out += `})();\n`;
    return out;
  },

  buildHelpers: function(projectJson) {
    var out = "";

    out += `app.render = function() {\n`;
    out += `var isComponent = (typeof component === 'undefined') ? false : true;\n`;
    out += `if(isComponent) {\n`;
    out += `if(component.state === null) return;\n`;
    out += `component.forceUpdate();\n`;
    out += `} else {\n`;
    out += `ReactDOM.render(app.rootComponent(), document.getElementById('app'));\n`;
    out += `}\n`;
    out += `}\n`;

    out += `app.stateQueue = [];\n`;
    out += `app.stateProcessing = false;\n`;
    out += `app.setState = function(fn, callback) {\n`;
    out += `app.stateQueue.push({ fn: fn, callback: callback });\n`;
    out += `var _process = function() {\n`;
    out += `app.stateProcessing = true;\n`;
    out += `var _item = app.stateQueue.shift();\n`;
    out += `_item.fn();\n`;
    out += `app.render();\n`;
    out += `if(typeof _item.callback !== "undefined") _item.callback();\n`;
    out += `if(app.stateQueue.length === 0) {\n`;
    out += `app.stateProcessing = false;\n`;
    out += `} else { _process(); }\n`;
    out += `};\n`;
    out += `if(!app.stateProcessing) _process();\n`;
    out += `};\n`;

    // app.load
    out += `app.load = function() {\n`;
    projectJson.load.forEach(function(fnName) {
      out += `  app.js.${fnName}();`;
    });
    out += `  if(window.parent && !window.blissUi) {`
    out += `    if(window.parent.blissUi) {`
    out += `      if (window.parent.blissUi.js.reloadSavedState) {`
    out += `        try { window.parent.blissUi.js.reloadSavedState(app) } catch(e) { console.error('error reloading saved state', e)}`
    out += `      }`
    out += `    }`
    out += `  }`
    out += `}\n`;
    out += `app.load();\n`;

    return out;
  },

  buildReact: function(projectJson, startId) {
    var out = "";
    out = reactTree.buildReact(projectJson, startId);
    return out;
  },

  buildAppJs: function(projectJson, startId) {
    var out = "";

    if(typeof projectJson.js !== "undefined" && projectJson.js !== null) {
      out += js.getFnsString(projectJson.js, null);
    }

    tree.traverse(projectJson, startId, function(proj, component) {
      if(typeof component.js === "undefined" || component.js === null) return;
      if(component.js.length > 0) {
        out += `app.methods["${component.id}"] = {};\n`;
        out += js.getFnsString(component.js, component.id);
      }
    });

    return out;
  },

  buildProjectJson: function(projectJson) {
    var out = "var blissProject = " + JSON.stringify(projectJson, null, 2);
    out += `\nif(typeof module !== "undefined") module.exports = blissProject;\n`;
    return out;
  },

  buildNewProjectJson: function() {
    var newProjectJson = {
      "name": "New Project",
      "compiler": "react",
      "version": "v0.2",
      "type": "app",
      "build": "designer",
      "layout": '',
      "nextId": 2,
      "rootId": "1",
      "externalCss": [],
      "externalJs": [
        "node_modules/react/dist/react.js",
        "node_modules/react-dom/dist/react-dom.js",
      ],
      "schemas": [],
      "state": {},
      "packages": [
        {
          "name": "react",
          "version": "15.4.2"
        },
        {
          "name": "react-dom",
          "version": "15.4.2"
        }
      ],
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
  },

  buildSchemas: function(projectJson) {
    var schemas = projectJson.schemas || [];
    if (schemas.length === 0) return ""

    var out = `app.getPath = function(objRef, path) {\n`;
    out += `var ref = objRef;\n`;
    out += `var parts = path.split('/')\n`;
    out += `for (var i = 0; i < parts.length; i++) {\n`;
    out += `var part = parts[i];\n`;
    out += `if(part === '') continue;\n`
    out += `ref = ref[part] || (ref[part] = {})\n`;
    out += `}\n`;
    out += `return ref;\n`;
    out += `}\n`;
    out += `app.assignPath = function(objRef, path, data) {\n`;
    out += `var ref = objRef;\n`;
    out += `var parts = path.split('/')\n`;
    out += `data || (data = {})\n`;
    //out += `console.log('assign state', app.state)\n`
    out += `for (var i = 0; i < parts.length; i++) {\n`;
    out += `var part = parts[i];\n`;
    out += `if(part === '') continue;\n`
    out += `if(i === parts.length - 1) {\n`;
    out += `ref = (ref[part] = data)\n`;
    //out += `console.log('assigning last ref', data)\n`
    out += `} else {\n`;
    out += `ref = ref[part] || (ref[part] = {})\n`;
    //out += `console.log('assigning ref', ref)\n`
    out += `}\n`;
    out += `}\n`;
    out += `return ref;\n`;
    out += `}\n`;
    out += `app.dispatch = function(options) {\n`;
    out += `var ref = app.state;\n`;
    out += `app.setState(function() {\n`;
    out += `var data = app.getPath(ref, options.path);\n`;
    out += `var fn = app.schema[options.path][options.action];\n`;
    out += `var newData = fn(data, options);\n`;
    out += `app.assignPath(ref, options.path, newData);\n`;
    out += `})\n`;
    out += `}\n`;

    out += "app.schema = {};\n"
    schemas.forEach(function(schema) {
      out += `app.schema['${schema.path}'] = {};\n`
      schema.actions.forEach(function(action) {
        out += `app.schema['${schema.path}']['${action.action}'] = ${action.body}\n`
      })
      out += `if(app.schema['${schema.path}']['init']) {\n`;
      out += `app.assignPath(app.state, '${schema.path}', app.schema['${schema.path}']['init']());\n`;
      out += `} else {\n`;
      out += `app.assignPath(app.state, '${schema.path}');\n`;
      out += `}\n`;
    })

    return out;
  }
}
