var blissProject = {
  "name": "Size",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 10,
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
  "cssVars": [
    {
      "name": "coolBlue",
      "value": "#5e9dff"
    }
  ],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "margin",
          "value": "0"
        },
        {
          "name": "padding",
          "value": "0"
        }
      ]
    }
  ],
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
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$coolBlue"
            },
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
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
      "next": null,
      "previous": null,
      "child": "5",
      "parent": "8"
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
      "name": "text",
      "element": "div",
      "text": "CONTENT",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "9",
      "previous": "8",
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
          "name": "handleDragMove",
          "body": "function(scope, attributes) {\n  return function(e) {\n    console.log('drag handler', e)\n    //console.log('drag handler', e.x, e.pageX, e.offsetX, e.layerX, e.movementX)\n  }\n};\n"
        },
        {
          "name": "handleDragStop",
          "body": "function(scope, attributes) {\n  return function(e) {\n    console.log('stop', e.x, e.clientX, e.pageX, e.offsetX, e.layerX, e.movementX, e.screenX)\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onDrag",
          "value": "handleDragMove"
        },
        {
          "name": "onStop",
          "value": "handleDragStop"
        }
      ],
      "next": null,
      "previous": null,
      "child": "3",
      "parent": "2"
    },
    "7": {
      "id": "7",
      "name": "text",
      "element": "div",
      "text": "CONTENT",
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
      "name": "resize container",
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
              "value": "50%"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "4",
      "previous": "7",
      "child": "2",
      "parent": "1"
    },
    "9": {
      "id": "9",
      "name": "show size",
      "element": "div",
      "text": null,
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return \"Size: \" + app.state.drag.size;\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "4",
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
          "body": "function (data, args) {\n  var newData = {\n    size: 0\n  }\n  return newData;\n}"
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
