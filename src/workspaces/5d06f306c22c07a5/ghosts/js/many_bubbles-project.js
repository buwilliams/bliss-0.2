var blissProject = {
  "name": "many_bubbles",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "layout": "",
  "nextId": 5,
  "rootId": "1",
  "externalCss": [],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js"
  ],
  "schemas": [
    {
      "path": "/bubbles",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    howMany: 0,\n    bubbles: []\n  };\n  return newData;\n}"
        },
        {
          "action": "setHowMany",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.howMany = args.howMany;\n  newData.bubbles = [];\n  var w = window.innerWidth;\n  var h = window.innerHeight;\n  for(var i=0; i<newData.howMany; i++) {\n    newData.bubbles.push({\n      top: Math.floor(Math.random() * Math.floor(h)),\n      left: Math.floor(Math.random() * Math.floor(w))\n    });\n  }\n  return newData;\n}"
        }
      ]
    }
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
      "selector": "*",
      "properties": [
        {
          "name": "box-sizing",
          "value": "border-box"
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
      "name": "many_bubbles",
      "element": "div",
      "text": null,
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
      "name": "repeated bubble",
      "element": "page.bubble",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": "loop",
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "loop",
          "body": "function(scope, attributes) {\n  return app.state.bubbles.bubbles;\n};\n"
        },
        {
          "name": "getStyle",
          "body": "function(scope, attributes) {\n  var bubble = scope.loop[scope.loop_index];\n  var randomColor = '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +\n  (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);\n  return {\n    'position': 'absolute',\n    'top': bubble.top + 'px',\n    'left': bubble.left + 'px',\n    'backgroundColor': randomColor\n  };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": null,
      "previous": "3",
      "child": null,
      "parent": "1"
    },
    "3": {
      "id": "3",
      "name": "number of bubbles",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "placeholder",
          "value": "# of bubbles"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "padding",
              "value": "0.5em"
            },
            {
              "name": "font-size",
              "value": "2em"
            },
            {
              "name": "width",
              "value": "auto"
            },
            {
              "name": "z-index",
              "value": "10000"
            },
            {
              "name": "position",
              "value": "absolute"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/bubbles',\n      action: 'setHowMany',\n      howMany: parseInt(e.target.value) || 0\n    })\n  }\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.bubbles.howMany;\n};\n"
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
      "next": "4",
      "previous": null,
      "child": null,
      "parent": "1"
    },
    "4": {
      "id": "4",
      "name": "bubble",
      "element": "div",
      "text": "bubble",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "width",
              "value": "50px"
            },
            {
              "name": "height",
              "value": "50px"
            },
            {
              "name": "background-color",
              "value": "#6ba3ff"
            },
            {
              "name": "border-radius",
              "value": "30px"
            },
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "font-size",
              "value": "10px"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "padding-top",
              "value": "18px"
            },
            {
              "name": "opacity",
              "value": "0.5"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "loop",
          "body": "function(scope, attributes) {\n  return app.state.bubbles.bubbles;\n};\n"
        },
        {
          "name": "getStyle",
          "body": "function(scope, attributes) {\n  var bubble = scope.loop[scope.loop_index];\n  var randomColor = '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +\n  (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);\n  return {\n    'position': 'absolute',\n    'top': bubble.top + 'px',\n    'left': bubble.left + 'px',\n    'backgroundColor': randomColor\n  };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": null,
      "previous": "3",
      "child": null,
      "parent": null,
      "repeatFn": "loop"
    }
  },
  "filename": "many_bubbles",
  "pageTitle": "many_bubbles"
}
if(typeof module !== "undefined") module.exports = blissProject;
