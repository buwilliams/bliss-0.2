var blissProject = {
  "name": "New Project",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 4,
  "rootId": "1",
  "externalCss": [],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js"
  ],
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
      "body": "function() { app.render(); }"
    }
  ],
  "cssVars": [],
  "css": [],
  "load": [
    "init"
  ],
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
      "child": "2",
      "parent": null
    },
    "2": {
      "id": "2",
      "name": "new_2",
      "element": "div",
      "text": "Test",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "3",
      "previous": null,
      "child": null,
      "parent": "1"
    },
    "3": {
      "id": "3",
      "name": "Jason's Dev",
      "element": "div",
      "text": "Test2",
      "textFn": "get_text",
      "ifFn": null,
      "repeatFn": "repeater",
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "get_text",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index];\n}"
        },
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  return [\"orange\",\"red\"];\n}\n"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "2",
      "child": null,
      "parent": "1"
    }
  }
}
if(typeof module !== "undefined") module.exports = blissProject;
