var blissProject = {
  "name": "Screencast",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "screencast",
  "nextId": 7,
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
      "body": "function() {\n  app.render();\n}"
    }
  ],
  "cssVars": [
    {
      "name": "color1",
      "value": "#79ceff"
    },
    {
      "name": "color2",
      "value": "#b362ff"
    },
    {
      "name": "color3",
      "value": "#94ff88"
    }
  ],
  "css": [],
  "load": [
    "init"
  ],
  "components": {
    "1": {
      "id": "1",
      "name": "Screencast",
      "element": "div",
      "text": "",
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "4",
      "parent": null
    },
    "2": {
      "id": "2",
      "name": "message",
      "element": "div",
      "text": "Hello, screencast!",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "4"
    },
    "4": {
      "id": "4",
      "name": "Container 1",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": "loop",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$color2"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "5px"
            },
            {
              "name": "margin",
              "value": "10px 0"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "loop",
          "body": "function() {\n  // made an ajax request to get data\n  return [0, 1, 2, 3, 4];\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": "5",
      "previous": null,
      "child": "2",
      "parent": "1"
    },
    "5": {
      "id": "5",
      "name": "Container 2",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$color1"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "5px"
            },
            {
              "name": "margin",
              "value": "10px 0"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function() {\n  return false;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "4",
      "child": "6",
      "parent": "1"
    },
    "6": {
      "id": "6",
      "name": "message_copy",
      "element": "div",
      "text": "Hello, screencast!",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "5"
    }
  }
}
if(typeof module !== "undefined") module.exports = blissProject;
