var blissProject = {
  "name": "Todo2",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 87,
  "rootId": "1",
  "externalCss": [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://use.fontawesome.com/releases/v5.0.6/css/all.css",
    "https://fonts.googleapis.com/css?family= Sacramento|Shadows+Into+Light"
  ],
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
  "cssVars": [
    {
      "name": "green",
      "value": "#55a68b"
    },
    {
      "name": "purple",
      "value": "#47217d"
    },
    {
      "name": "darkgreen",
      "value": "#356959"
    },
    {
      "name": "brown",
      "value": "#3d3338"
    },
    {
      "name": "lightbrown",
      "value": "#444444"
    },
    {
      "name": "lightpurple",
      "value": "#9738a8"
    }
  ],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "background-color",
          "value": "black"
        },
        {
          "name": "font-size",
          "value": "20px"
        },
        {
          "name": "color",
          "value": "white"
        },
        {
          "name": "background-image",
          "value": "url(https://i.ibb.co/hK5z1qM/flowers.jpg)"
        },
        {
          "name": "background-size",
          "value": "cover"
        },
        {
          "name": "background-repeat",
          "value": "no-repeat"
        },
        {
          "name": "background-position",
          "value": "center center"
        },
        {
          "name": "font-family",
          "value": "'Shadows Into Light', cursive"
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
      "name": "Todo2",
      "element": "div",
      "text": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "min-height",
              "value": "100vh"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "10",
      "parent": null
    },
    "6": {
      "id": "6",
      "name": "header",
      "element": "h1",
      "text": "Beauitful To-do List",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "margin",
              "value": "50px 0 10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "7",
      "previous": null,
      "child": null,
      "parent": "12"
    },
    "7": {
      "id": "7",
      "name": "todo input",
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
              "name": "background-color",
              "value": "#d22f68"
            },
            {
              "name": "border",
              "value": "none"
            },
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "display",
              "value": "block"
            },
            {
              "name": "width",
              "value": "100%"
            },
            {
              "name": "font-size",
              "value": "25pt"
            },
            {
              "name": "padding",
              "value": "5px 10px"
            },
            {
              "name": "margin-top",
              "value": "20px"
            },
            {
              "name": "border-radius",
              "value": "0"
            },
            {
              "name": "text-align",
              "value": "center"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/todos',\n      action: 'setLabel',\n      label: e.target.value\n    })\n  }\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.todos.label;\n}"
        },
        {
          "name": "handleKeyup",
          "body": "function(scope, attributes) {\n  return function(e) {\n    if (e.keyCode == 13) {\n      if(app.state.todos.label === '') return;\n      app.dispatch({\n        path: '/todos',\n        action: 'addTodo',\n        label: app.state.todos.label\n      })\n      \n      app.dispatch({\n        path: '/todos',\n        action: 'setLabel',\n        label: ''\n      })\n    }\n  }\n};\n"
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
        },
        {
          "name": "onKeyUp",
          "value": "handleKeyup"
        }
      ],
      "next": "8",
      "previous": "6",
      "child": null,
      "parent": "12"
    },
    "8": {
      "id": "8",
      "name": "button",
      "element": "button",
      "text": "ADD TO-DO",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border",
              "value": "none"
            },
            {
              "name": "background-color",
              "value": "#870c1b"
            },
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "display",
              "value": "block"
            },
            {
              "name": "width",
              "value": "100%"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    if(app.state.todos.label === '') return;\n    app.dispatch({\n      path: '/todos',\n      action: 'addTodo',\n      label: app.state.todos.label\n    })\n    \n    app.dispatch({\n      path: '/todos',\n      action: 'setLabel',\n      label: ''\n    })\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "14",
      "previous": "7",
      "child": null,
      "parent": "12"
    },
    "9": {
      "id": "9",
      "name": "todo item",
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
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "background-color",
              "value": "$purple"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "color",
              "value": "white"
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
          "body": "function(scope, attributes) {\n  var style = {}\n  var done = scope.repeater[scope.repeater_index].done\n  if(done) {\n    style.textDecoration = 'line-through'\n    style.backgroundColor = '#121026'\n  }\n  return style;\n}"
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
      "next": "16",
      "previous": "14",
      "child": "13",
      "parent": "12"
    },
    "10": {
      "id": "10",
      "name": "container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "container"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "11",
      "parent": "1"
    },
    "11": {
      "id": "11",
      "name": "row",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "row"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "12",
      "parent": "10"
    },
    "12": {
      "id": "12",
      "name": "column",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-10 offset-md-1"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "6",
      "parent": "11"
    },
    "13": {
      "id": "13",
      "name": "delete icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fas fa-trash"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "float",
              "value": "right"
            },
            {
              "name": "margin-top",
              "value": "4px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var index = scope.repeater_index\n  return function(e) {\n    e.stopPropagation()\n    app.dispatch({\n      path: '/todos',\n      action: 'deleteTodo',\n      index: index\n    })\n  }\n};\n"
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
      "parent": "9"
    },
    "14": {
      "id": "14",
      "name": "icon container",
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
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "margin",
              "value": "10px 0"
            },
            {
              "name": "font-size",
              "value": "1.5em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "9",
      "previous": "8",
      "child": "15",
      "parent": "12"
    },
    "15": {
      "id": "15",
      "name": "down icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fas fa-arrow-circle-down"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "color",
              "value": "white"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "14"
    },
    "16": {
      "id": "16",
      "name": "completed todos",
      "element": "div",
      "text": null,
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin",
              "value": "10px 0"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "font-size",
              "value": "0.8em"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var todos = app.state.todos.list\n  var total = todos.length\n  var count = 0\n  \n  todos.forEach(function(todo) {\n    if(todo.done) count++\n  })\n  \n  if(total === 0) {\n    return \"Start by adding a few to-dos.\"\n  } else if(count === 0) {\n    return \"Time to crush to-dos!\"\n  } else if(count === total) {\n    return \"BOOM! All to-dos crushed.\"\n  } else {\n    return \"You've crushed \" + count + \" to-dos. You've have \" + (total - count) + \" remaining.\";\n  }\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "9",
      "child": null,
      "parent": "12"
    }
  },
  "schemas": [
    {
      "path": "/todos",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    label: '',\n    list: []\n  }\n  return newData;\n}"
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
        },
        {
          "action": "deleteTodo",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.list.splice(args.index, 1)\n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
