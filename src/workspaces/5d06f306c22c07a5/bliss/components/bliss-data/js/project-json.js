var projectJson = {
  "name": "Screencast",
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
  "schemas": [
    {
      "path": "/todos",
      "actions": [
        {
          "action": "add_todo",
          "body": "function() {}"
        },
        {
          "action": "remote_todo",
          "body": "function() {}"
        },
        {
          "action": "edit_todo",
          "body": "function() {}"
        }
      ]
    },
    {
      "path": "/users",
      "actions": [
        {
          "action": "add_user",
          "body": "function() {}"
        },
        {
          "action": "remote_user",
          "body": "function() {}"
        },
        {
          "action": "delete_user",
          "body": "function() {}"
        }
      ]
    },
    {
      "path": "/messages",
      "actions": [
        {
          "action": "send_message",
          "body": "function() {}"
        },
        {
          "action": "upvote",
          "body": "function() {}"
        },
        {
          "action": "downvote",
          "body": "function() {}"
        }
      ]
    }
  ],
  "data": {},
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
      "body": "function() {\n  app.render();\n  window.app = app;\n}"
    },
    {
      "name": "/path/to/data",
      "body": "function(scope, attributes) {\n  return null;\n}"
    }
  ],
  "cssVars": [
    {
      "name": "bg1",
      "value": "#71d59e"
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
      "name": "Screencast foo",
      "element": "div",
      "text": "",
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "3",
      "parent": null
    },
    "2": {
      "id": "2",
      "name": "message",
      "element": "div",
      "text": "hello, my name is \"buddy\"",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "#959bd5"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "margin-top",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "loop",
          "body": "function() {\n  return [0, 1, 2, 3, 4];\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "3",
      "repeatFn": "loop"
    },
    "3": {
      "id": "3",
      "name": "hey",
      "element": "div",
      "text": "hi there",
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
              "value": "$bg1"
            },
            {
              "name": "color",
              "value": "white"
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
      "child": "2",
      "parent": "1"
    }
  }
}
