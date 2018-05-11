var blissProject = {
  "name": "danica",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 3,
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
      "name": "danica",
      "element": "div",
      "text": "",
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
      "text": "Hello, world!",
      "textFn": null,
      "ifFn": null,
      "repeatFn": "loop",
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "loop",
          "body": "function(scope, attributes) {\n  return [0, 1, 2, 3, 4, 5];\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "1"
    }
  },
  "filename": "danica",
  "pageTitle": "danica"
}
if(typeof module !== "undefined") module.exports = blissProject;
