var blissProject = {
  "name": "New Project",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 9,
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
      "child": "7",
      "parent": null
    },
    "3": {
      "id": "3",
      "name": "new_3",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "8",
      "child": null,
      "parent": "1"
    },
    "7": {
      "id": "7",
      "name": "new_7",
      "element": "div",
      "text": "hello",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "8",
      "previous": null,
      "child": null,
      "parent": "1"
    },
    "8": {
      "id": "8",
      "name": "new_7_copy",
      "element": "div",
      "text": "",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "key",
          "value": "test"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "3",
      "previous": "7",
      "child": null,
      "parent": "1"
    }
  }
}
if(typeof module !== "undefined") module.exports = blissProject;
