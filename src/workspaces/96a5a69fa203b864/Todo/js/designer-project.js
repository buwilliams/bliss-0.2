var blissProject = {
  "name": "Todo",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 4,
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
      "name": "Todo",
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
      "name": "header",
      "element": "h1",
      "text": "Todos",
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
      "name": "add todo input",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "placeholder",
          "value": "Enter your new todo"
        }
      ],
      "css": [],
      "js": [
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.todos.currentTodo;\n}"
        },
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n\t\tapp.dispatch({\n      path: '/todos',\n      action: 'current_todo',\n      text: e.target.value\n    });\n  }\n};\n"
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
      "next": null,
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
          "body": "function (data, args) {\n  var newData = {\n  \tcurrentTodo: 'hello todo world'\n  }\n  return newData;\n}"
        },
        {
          "action": "current_todo",
          "body": "function (data, args) {\n  var newData = object.assign({}, data);\n  newData.currentTodo = args.text;\n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
