var blissProject = {
  "name": "index",
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
      "body": "function() {\n\tapp.dispatch({\n    path: '/users',\n    action: 'fetchUsers'\n  })\n}"
    }
  ],
  "cssVars": [
    {
      "name": "fav-color",
      "value": "green"
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
      "name": "index",
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
      "name": "header",
      "element": "div",
      "text": "",
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
              "name": "background",
              "value": "url(https://images.pexels.com/photos/370799/pexels-photo-370799.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb)"
            },
            {
              "name": "min-height",
              "value": "200px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "8",
      "previous": null,
      "child": "6",
      "parent": "1"
    },
    "3": {
      "id": "3",
      "name": "footer",
      "element": "div",
      "text": "footer",
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
              "value": "green"
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
      "previous": "8",
      "child": null,
      "parent": "1"
    },
    "4": {
      "id": "4",
      "name": "sidebar",
      "element": "div",
      "text": "sidebar",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "flex-grow",
              "value": "1"
            },
            {
              "name": "background-color",
              "value": "pink"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "5",
      "previous": null,
      "child": null,
      "parent": "8"
    },
    "5": {
      "id": "5",
      "name": "content",
      "element": "div",
      "text": "content",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "flex-grow",
              "value": "3"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "4",
      "child": "9",
      "parent": "8"
    },
    "6": {
      "id": "6",
      "name": "logo",
      "element": "div",
      "text": "Acme, Inc.",
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
              "value": "$fav-color"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "7",
      "previous": null,
      "child": null,
      "parent": "2"
    },
    "7": {
      "id": "7",
      "name": "Title",
      "element": "div",
      "text": "Welcome Now",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "6",
      "child": null,
      "parent": "2"
    },
    "8": {
      "id": "8",
      "name": "content flexbox",
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
              "name": "display",
              "value": "flex"
            },
            {
              "name": "flex-direction",
              "value": "row"
            }
          ]
        },
        {
          "selector": "$id > div",
          "properties": [
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "3",
      "previous": "2",
      "child": "4",
      "parent": "1"
    },
    "9": {
      "id": "9",
      "name": "current user",
      "element": "div",
      "text": null,
      "textFn": "getCurrentUser",
      "ifFn": "",
      "repeatFn": "userList",
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "getCurrentUser",
          "body": "function(scope, attributes) {\n  return scope.userList[scope.userList_index];\n};\n"
        },
        {
          "name": "userList",
          "body": "function(scope, attributes) {\n  return app.state.users.users;\n};\n"
        },
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return false;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "5"
    }
  },
  "filename": "index",
  "pageTitle": "index",
  "schemas": [
    {
      "path": "/users",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var state = {\n    currentUser: 'Buddy',\n    users: []\n  }\n  return state;\n}"
        },
        {
          "action": "fetchUsers",
          "body": "function (data, args) {\n  setTimeout(function() {\n    app.dispatch({\n      path: '/users',\n      action: 'setUsers',\n      users: ['buddy', 'austin']\n    })\n  }, 1000);\n\t// fetch(url).then(function(data) {\n  //});\n  return data;\n}"
        },
        {
          "action": "setUsers",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.users = args.users\n  console.log('new users', newData.users);\n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
