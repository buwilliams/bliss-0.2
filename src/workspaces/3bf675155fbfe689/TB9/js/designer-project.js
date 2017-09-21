var blissProject = {
  "name": "New Project",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 6,
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
      "name": "main_content",
      "element": "div",
      "text": "TB9",
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
      "name": "banana_1",
      "element": "div",
      "text": "UI",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "new_1",
          "body": "function(scope, attributes) {\n  \n  return null;\n}\nalert(\"test\");"
        }
      ],
      "dynamicAttributes": [],
      "next": "4",
      "previous": "2",
      "child": null,
      "parent": "1"
    },
    "4": {
      "id": "4",
      "name": "banana_2",
      "element": "div",
      "text": "PM",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "5",
      "previous": "3",
      "child": null,
      "parent": "1"
    },
    "5": {
      "id": "5",
      "name": "banana_3",
      "element": "div",
      "text": "FED",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "4",
      "child": null,
      "parent": "1"
    }
  }
}
if(typeof module !== "undefined") module.exports = blissProject;
