var blissProject = {
  "name": "Typeahead",
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
      "name": "Typeahead",
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
      "name": "input",
      "element": "input",
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
              "name": "outline",
              "value": "none"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/options',\n      action: 'setCurrent',\n      value: e.target.value\n    })\n  }\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.options.current;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onChange",
          "value": "handleChange"
        },
        {
          "name": "value",
          "value": "getValue"
        }
      ],
      "next": "3",
      "previous": null,
      "child": null,
      "parent": "1"
    },
    "3": {
      "id": "3",
      "name": "options container",
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
              "value": "absolute"
            },
            {
              "name": "z-index",
              "value": "1000"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "5",
      "previous": "2",
      "child": "4",
      "parent": "1"
    },
    "4": {
      "id": "4",
      "name": "option",
      "element": "div",
      "text": null,
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": "repeater",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "padding",
              "value": "3px 6px"
            },
            {
              "name": "background-color",
              "value": "#ffffff"
            }
          ]
        },
        {
          "selector": "$id:hover",
          "properties": [
            {
              "name": "background-color",
              "value": "#eaeaea"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  return app.state.options.list;\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var item = scope.repeater[scope.repeater_index]\n  return item.name;\n}"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var item = scope.repeater[scope.repeater_index]\n  return function(e) {\n    app.dispatch({\n      path: '/options',\n      action: 'setCurrent',\n      value: item.name\n    })\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "3"
    },
    "5": {
      "id": "5",
      "name": "new_5",
      "element": "div",
      "text": "hey there",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "3",
      "child": null,
      "parent": "1"
    }
  },
  "schemas": [
    {
      "path": "/options",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    current: '',\n    list: [\n      {\n        'name': 'background',\n        'values': []\n      },\n      {\n        'name': 'background-image',\n        'values': []\n      },\n      {\n        'name': 'background-color',\n        'values': []\n      }\n    ]\n  }\n  return newData;\n}"
        },
        {
          "action": "setCurrent",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.current = args.value\n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
