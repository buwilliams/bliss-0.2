var blissProject = {
  "name": "Size",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 8,
  "rootId": "1",
  "externalCss": [],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js",
    "node_modules/react-draggable/dist/react-draggable.min.js"
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
    },
    {
      "name": "react-draggable",
      "version": "2.2.3"
    }
  ],
  "js": [
    {
      "name": "init",
      "body": "function() {\n  app.render()\n}"
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
      "name": "Size",
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
    "2": {
      "id": "2",
      "name": "line",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "width",
              "value": "100%"
            },
            {
              "name": "position",
              "value": "relative"
            },
            {
              "name": "height",
              "value": "3px"
            },
            {
              "name": "margin",
              "value": "10px 0"
            },
            {
              "name": "background-color",
              "value": "#313e44"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "4",
      "previous": "7",
      "child": "5",
      "parent": "1"
    },
    "3": {
      "id": "3",
      "name": "circle",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "width",
              "value": "14px"
            },
            {
              "name": "background-color",
              "value": "#b7e7ff"
            },
            {
              "name": "height",
              "value": "14px"
            },
            {
              "name": "border-radius",
              "value": "7px"
            },
            {
              "name": "position",
              "value": "absolute"
            },
            {
              "name": "top",
              "value": "-5px"
            },
            {
              "name": "left",
              "value": "-1px"
            },
            {
              "name": "cursor",
              "value": "default"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var styles = {\n    left: app.state.drag.left + 'px'\n  }\n  \n  // TODO: constrain left position to width of parent\n  console.log('scope:', scope)\n  \n  return styles;\n}"
        },
        {
          "name": "handleMouseDown",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/drag',\n      action: 'set',\n      key: 'dragging',\n      value: true\n    })\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyles"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "5"
    },
    "4": {
      "id": "4",
      "name": "new_4",
      "element": "div",
      "text": "CONTENT",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "2",
      "child": null,
      "parent": "1"
    },
    "5": {
      "id": "5",
      "name": "draggable",
      "element": "ReactDraggable",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "axis",
          "value": "x"
        },
        {
          "name": "bounds",
          "value": "parent"
        }
      ],
      "css": [],
      "js": [
        {
          "name": "handleDrag",
          "body": "function(scope, attributes) {\n  return function(e) {\n    console.log('drag handler', e)\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onDrag",
          "value": "handleDrag"
        }
      ],
      "next": null,
      "previous": null,
      "child": "3",
      "parent": "2"
    },
    "7": {
      "id": "7",
      "name": "new_4_copy",
      "element": "div",
      "text": "CONTENT",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "2",
      "previous": null,
      "child": null,
      "parent": "1"
    }
  },
  "schemas": [
    {
      "path": "/drag",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    left: -1,\n    dragging: false\n  }\n  return newData;\n}"
        },
        {
          "action": "set",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData[args.key] = args.value\n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
