var blissProject = {
  "name": "Todo",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 5,
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
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "font-size",
          "value": "14pt"
        }
      ]
    },
    {
      "selector": "input",
      "properties": [
        {
          "name": "font-size",
          "value": "14pt"
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
      "name": "Todo",
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
      "name": "new todo",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "placeholder",
          "value": "Enter a new todo"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding",
              "value": "10px"
            },
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
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/todos',\n      action: 'current_todo',\n      text: e.target.value\n    })\n  }\n};\n"
        },
        {
          "name": "handleKeyDown",
          "body": "function(scope, attributes) {\n  return function(e) {\n    var ENTER = 13;\n    if(e.keyCode === ENTER) {\n      // add a todo\n      app.dispatch({\n        path: '/todos',\n        action: 'add_todo',\n        text: app.state.todos.currentTodo\n      });\n      \n      // clear the current todo\n      app.dispatch({\n        path: '/todos',\n        action: 'current_todo',\n        text: ''\n      });\n    }\n  }\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.todos.currentTodo;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onChange",
          "value": "handleChange"
        },
        {
          "name": "onKeyDown",
          "value": "handleKeyDown"
        },
        {
          "name": "value",
          "value": "getValue"
        }
      ],
      "next": "4",
      "previous": null,
      "child": null,
      "parent": "1"
    },
    "3": {
      "id": "3",
      "name": "todo list",
      "element": "div",
      "text": null,
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": "repeater",
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  return app.state.todos.items;\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index].text;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "4",
      "child": null,
      "parent": "1"
    },
    "4": {
      "id": "4",
      "name": "show current todo",
      "element": "div",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return \"Current todo: \" + app.state.todos.currentTodo;\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": "3",
      "previous": "2",
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
          "body": "function (data, options) {\n  var newData = {\n    currentTodo: '',\n    items: []\n  };\n  \n  return newData;\n}"
        },
        {
          "action": "current_todo",
          "body": "function (data, options) {\n  var newData = Object.assign({}, data);\n  newData.currentTodo = options.text;\n  return newData;\n}"
        },
        {
          "action": "add_todo",
          "body": "function (data, options) {\n  var newData = Object.assign({}, data);\n  \n  var newTodo = {\n    text: options.text,\n    completed: false\n  };\n  \n  data.items.push(newTodo);\n  \n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;