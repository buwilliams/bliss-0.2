var blissProject = {
  "name": "Todo2",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 10,
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
      "name": "Todo2",
      "element": "div",
      "text": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "6",
      "parent": null
    },
    "6": {
      "id": "6",
      "name": "header",
      "element": "h1",
      "text": "To-do List",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "7",
      "previous": null,
      "child": null,
      "parent": "1"
    },
    "7": {
      "id": "7",
      "name": "todo input",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "placeholder",
          "value": "enter new to-do"
        }
      ],
      "css": [],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/todos',\n      action: 'setLabel',\n      label: e.target.value\n    })\n  }\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.todos.label;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "value",
          "value": "getValue"
        },
        {
          "name": "onChange",
          "value": "handleChange"
        }
      ],
      "next": "8",
      "previous": "6",
      "child": null,
      "parent": "1"
    },
    "8": {
      "id": "8",
      "name": "button",
      "element": "button",
      "text": "add to-do",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-bottom",
              "value": "20px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/todos',\n      action: 'addTodo',\n      label: app.state.todos.label\n    })\n    \n    app.dispatch({\n      path: '/todos',\n      action: 'setLabel',\n      label: ''\n    })\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "9",
      "previous": "7",
      "child": null,
      "parent": "1"
    },
    "9": {
      "id": "9",
      "name": "list of to-dos",
      "element": "div",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": "repeater",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin",
              "value": "3px 0"
            },
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "background-color",
              "value": "#fff6da"
            },
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  return app.state.todos.list\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index].label\n};\n"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var index = scope.repeater_index\n  return function(e) {\n    app.dispatch({\n      path: '/todos',\n      action: 'toggleTodo',\n      index: index\n    })\n  }\n};\n"
        },
        {
          "name": "getStyle",
          "body": "function(scope, attributes) {\n  var style = {}\n  var done = scope.repeater[scope.repeater_index].done\n  if(done) style.textDecoration = 'line-through'\n  return style;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        },
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": "8",
      "child": null,
      "parent": "1"
    }
  },
  "schemas": [
    {
      "path": "/todos",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.label = ''\n  newData.list = []\n  return newData;\n}"
        },
        {
          "action": "setLabel",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.label = args.label\n  return newData;\n}"
        },
        {
          "action": "addTodo",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.list.push({\n    done: false,\n    label: args.label\n  })\n  return newData;\n}"
        },
        {
          "action": "toggleTodo",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.list[args.index].done = !newData.list[args.index].done\n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
