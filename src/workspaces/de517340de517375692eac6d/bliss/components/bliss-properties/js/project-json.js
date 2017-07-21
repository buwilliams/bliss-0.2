var projectJson = {
  "project": {
    "name": "Bliss",
    "type": "bliss",
    "build": "app",
    "compiler": "react",
    "next_id": 80,
    "rootId": "1",
    "externalCss": [
      "node_modules/tether/dist/css/tether.min.css",
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "node_modules/font-awesome/css/font-awesome.css",
      "node_modules/codemirror/lib/codemirror.css",
      "node_modules/codemirror/theme/solarized.css",
      "node_modules/bliss-tree/dist/bliss-tree.css",
      "node_modules/bliss-properties/dist/bliss-properties.css",
      "node_modules/bliss-javascript/dist/bliss-javascript.css",

      "css/app.css"
    ],
    "externalJs": [
      "node_modules/tether/dist/js/tether.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/codemirror/lib/codemirror.js",
      "node_modules/codemirror/mode/javascript/javascript.js",
      "node_modules/react/dist/react.js",
      "node_modules/react-dom/dist/react-dom.js",
      "node_modules/react-code-mirror/standalone.js",
      "node_modules/bliss-tree/dist/bliss-tree.js",
      "node_modules/bliss-properties/dist/bliss-property.js",
      "node_modules/bliss-properties/dist/bliss-properties.js",
      "node_modules/bliss-javascript/dist/bliss-javascript.js",
      "scripts/editor.js"
    ],
    "state": {
      "header": true,
      "list": true,
      "p": true,
      "active_component": null,
      "timer": null
    },
    "js": {
      "global": "function() { window.app = app; }",
      "init": "function() {\n        app.setState(function() {\n          app.project = app.blissProject;\n          app.state.active_component = app.project.rootId\n        });\n      }",
      "build": "function() {\n        if(app.project.type === \"bliss\") {\n          app.project.build = \"designer\";\n        }\n\n        var data = JSON.stringify(app.project);\n\n        $.ajax({\n          type: 'POST',\n          url: '/build',\n          data: data,\n          success: function(data) {\n            var iframe = $('#preview');\n            var url = location.origin + '/designer.html';\n            if(iframe.attr('src') !== url) {\n              iframe.attr('src', url);\n            } else {\n              try {\n                iframe[0].contentWindow.location.reload();\n              } catch(e){\n                console.log(e);\n              }\n            }\n          },\n          contentType: \"application/json\",\n          dataType: 'json'\n        });\n      }",
      "selectComponent": "function(id) {\n        app.setState(function() {\n          app.state.active_component = id;\n        });\n      }",
      "update": "function(fn) {\n        app.setState(function() { fn(); });\n        clearTimeout(app.state.timer);\n        app.state.timer = setTimeout(function() {\n          console.log('building');\n          app.js.build();\n        }, 500);\n      }"
    },
    "load": [
      "global",
      "init",
      "build"
    ],
    "components": {
      "1": {
        "id": "1",
        "name": "container",
        "element": "div",
        "text": null,
        "attributes": {
          "className": "container-fluid"
        },
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": "2",
        "parent": null
      },
      "2": {
        "id": "2",
        "name": "row",
        "element": "div",
        "text": null,
        "attributes": {
          "className": "row"
        },
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": "3",
        "parent": "1"
      },
      "3": {
        "id": "3",
        "name": "components",
        "element": "div",
        "text": null,
        "attributes": {
          "id": "components",
          "className": "col-md-2 grey"
        },
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": "4",
        "previous": null,
        "child": "20",
        "parent": "2"
      },
      "4": {
        "id": "4",
        "name": "designer",
        "element": "div",
        "text": null,
        "attributes": {
          "id": "designer",
          "className": "col-md-8"
        },
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": "77",
        "previous": "3",
        "child": "21",
        "parent": "2"
      },
      "11": {
        "id": "11",
        "name": "bliss properties",
        "element": "BlissProperties.component",
        "text": null,
        "attributes": {},
        "css": {},
        "js": {
          "setComponentProp": `function(scope, props) {
            return app.project.components[app.state.active_component];
          }`,
          "setOnChangeProp": `function(scope, props) {
            return function(newComponent) {
              app.js.update(function() {
                app.project.components[app.state.active_component] = newComponent;
              });
            }
          }`
        },
        "dynamicAttributes": {
          "component": "setComponentProp",
          "onChange": "setOnChangeProp"
        },
        "next": null,
        "previous": "22",
        "child": null,
        "parent": "77"
      },
      "17": {
        "id": "17",
        "name": "designerIframe",
        "element": "iframe",
        "designMode": false,
        "text": null,
        "attributes": {
          "id": "preview",
          "src": "about:blank"
        },
        "css": {
          "width": "100%",
          "height": "calc(100vh - 50px)",
          "border": "none"
        },
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": null,
        "parent": "19"
      },
      "18": {
        "id": "18",
        "name": "Component Tree",
        "element": "BlissTree.component",
        "text": null,
        "attributes": {
          "id": "componentTree"
        },
        "css": {
          "height": "100px"
        },
        "js": {
          "setDataProp": `function(scope, props){
            return app.project;
          }`,
          "setOnSelectProp": `function(scope, props) {
            return function(id) {
              console.log('component selected', id);
              app.js.selectComponent(id);
            };
          }`,
          "setOnCreateProp": `function(scope, props) {
            return function(toId) {
              var proj = BlissTree.createComponent(app.project, toId);
              app.js.update(function() { app.project = proj; });
            };
          }`,
          "setOnCloneProp": `function(scope, props) {
            return function(cloneId) {
              var proj = BlissTree.cloneComponent(app.project, cloneId);
              app.js.update(function() { app.project = proj; });
            };
          }`,
          "setOnDeleteProp": `function(scope, props) {
            return function(id) {
              var proj = BlissTree.deleteComponent(app.project, id);
              app.js.update(function() { app.project = proj; });
            };
          }`,
          "setOnMoveProp": `function(scope, props) {
            return function(fromId, toId, shouldBeChild) {
              var proj = BlissTree.moveComponent(app.project, fromId, toId, shouldBeChild);
              app.js.update(function() { app.project = proj; });
            }
          }`,
          "setThis": `function(scope, props) {
            var that = app;
            return function() {
              return that;
            };
          }`
        },
        "dynamicAttributes": {
          "data": "setDataProp",
          "onSelect": "setOnSelectProp",
          "onCreate": "setOnCreateProp",
          "onClone": "setOnCloneProp",
          "onDelete": "setOnDeleteProp",
          "onMove": "setOnMoveProp",
          "_this": "setThis"
        },
        "next": null,
        "previous": "20",
        "child": null,
        "parent": "3"
      },
      "19": {
        "id": "19",
        "name": "iframeContainer",
        "element": "div",
        "text": null,
        "attributes": {
          "id": "iframeContainer"
        },
        "css": {
          "height": "calc(100vh - 370px)",
          "overflow": "auto",
          "border": "solid 3px #aaa"
        },
        "dynamicAttributes": {},
        "js": {},
        "next": "54",
        "previous": "21",
        "child": "17",
        "parent": "4"
      },
      "20": {
        "id": "20",
        "name": "h3Components",
        "element": "h3",
        "text": "components",
        "attributes": {
          "id": "h3Components"
        },
        "css": {
          "text-transform": "uppercase",
          "font-size": "1em",
          "background-color": "#aaa",
          "color": "#fff",
          "margin-top": "15px",
          "padding": "10px",
          "border-radius": "3px"
        },
        "dynamicAttributes": {},
        "js": {},
        "next": "18",
        "previous": null,
        "child": null,
        "parent": "3"
      },
      "21": {
        "id": "21",
        "name": "h3Designer",
        "element": "h3",
        "text": "designer",
        "attributes": {
          "id": "h3Designer"
        },
        "css": {
          "text-transform": "uppercase",
          "font-size": "1em",
          "background-color": "#aaa",
          "color": "#fff",
          "margin-top": "15px",
          "padding": "10px",
          "border-radius": "3px"
        },
        "dynamicAttributes": {},
        "js": {},
        "next": "19",
        "previous": null,
        "child": null,
        "parent": "4"
      },
      "22": {
        "id": "22",
        "name": "propertyList",
        "element": "h3",
        "text": "Properties",
        "attributes": {
          "id": "propertyList"
        },
        "css": {
          "text-transform": "uppercase",
          "font-size": "1em",
          "background-color": "#aaa",
          "color": "#fff",
          "margin-top": "15px",
          "padding": "10px",
          "border-radius": "3px"
        },
        "dynamicAttributes": {},
        "js": {},
        "next": "11",
        "previous": null,
        "child": null,
        "parent": "77"
      },
      "54": {
        "id": "54",
        "name": "JS Editor",
        "element": "div",
        "text": null,
        "attributes": {
          "id": "jsEditor"
        },
        "css": {
          "margin-top": "10px",
          "height": "300px",
          "overflow": "auto",
          "background": "#eee",
          "padding": "0 10px"
        },
        "dynamicAttributes": {},
        "js": {},
        "next": null,
        "previous": "19",
        "child": "55",
        "parent": "4"
      },
      "55": {
        "id": "55",
        "name": "h3Js",
        "element": "h3",
        "text": "JavaScript",
        "attributes": {
          "id": "h3Js"
        },
        "css": {
          "text-transform": "uppercase",
          "font-size": "1em",
          "background-color": "#aaa",
          "color": "#fff",
          "margin-top": "15px",
          "padding": "10px"
        },
        "dynamicAttributes": {},
        "js": {},
        "next": "56",
        "previous": null,
        "child": null,
        "parent": "54"
      },
      "56": {
        "id": "56",
        "name": "code",
        "element": "div",
        "text": "",
        "attributes": {
          "id": "code"
        },
        "css": {
          "background": "#fff",
          "padding": "10px",
          "height": "230px",
          "overflow": "auto"
        },
        "dynamicAttributes": {},
        "js": {},
        "next": null,
        "previous": "55",
        "child": "79",
        "parent": "54"
      },
      "77": {
        "id": "77",
        "name": "properties",
        "element": "div",
        "text": null,
        "attributes": {
          "id": "propertiesContainer",
          "className": "col-md-2 grey"
        },
        "css": {},
        "dynamicAttributes": {},
        "js": {},
        "next": null,
        "previous": "4",
        "child": "22",
        "parent": "2"
      },
      "79": {
        "id": "79",
        "name": "Bliss JavaScript",
        "element": "BlissJavascript.component",
        "text": null,
        "attributes": {},
        "css": {},
        "js": {
          "setComponentProp": `function(scope, props) {
            return app.project.components[app.state.active_component];
          }`,
          "setOnChangeProp": `function(scope, props) {
            return function(newComponent) {
              app.js.update(function() {
                app.project.components[app.state.active_component] = newComponent;
              });
            }
          }`
        },
        "dynamicAttributes": {
          "component": "setComponentProp",
          "onChange": "setOnChangeProp"
        },
        "next": null,
        "previous": null,
        "child": null,
        "parent": "56"
      }
    }
  }
};
