var blissProject = {
  "name": "Todo2",
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
      "name": "Todo2",
      "element": "div",
      "text": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "5",
      "parent": null
    },
    "2": {
      "id": "2",
      "name": "todo input",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/some_path',\n      action: 'some_action',\n      label: 'some_label'\n    })\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": "4",
      "previous": "5",
      "child": null,
      "parent": "1"
    },
    "3": {
      "id": "3",
      "name": "list of todos",
      "element": "div",
      "text": "I'm a todo",
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
    },
    "4": {
      "id": "4",
      "name": "add todo button",
      "element": "button",
      "text": "add todo",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "3",
      "previous": "2",
      "child": null,
      "parent": "1"
    },
    "5": {
      "id": "5",
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
      "next": "2",
      "previous": null,
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
          "body": "function (data, args) {\n  var newData = {\n    current: '',\n    list: []\n  }\n  return newData;\n}"
        },
        {
          "action": "addTodo",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.list.push({\n    label: args.label,\n    done: false\n  })\n  return newData;\n}"
        },
        {
          "action": "setCurrent",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.current = args.label\n  return newData;\n}"
        },
        {
          "action": "new_action",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  // your edits here\n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
