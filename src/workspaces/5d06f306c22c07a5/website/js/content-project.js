var blissProject = {
  "name": "content",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "layout": "",
  "nextId": 2,
  "rootId": "1",
  "externalCss": [],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js"
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
      "name": "content",
      "element": "div",
      "text": "I'm some lowly content.",
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": null
    }
  },
  "filename": "content",
  "pageTitle": "content"
}
if(typeof module !== "undefined") module.exports = blissProject;
