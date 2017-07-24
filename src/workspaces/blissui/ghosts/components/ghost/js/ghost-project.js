var blissProject = {
  "name": "Ghost",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "ghost",
  "nextId": 3,
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
      "body": "function() {\n  app.state.top = 0;\n  app.state.left = 0;\n  app.render();\n  app.js.loop();\n}"
    },
    {
      "name": "move",
      "body": "function() {\n  app.setState(function() {\n    var w = window.innerWidth;\n\t\tvar h = window.innerHeight;\n    var top = app.js.rando(0, h);\n    var left = app.js.rando(0, w);\n    app.state.top = top;\n    app.state.left = left;\n  });\n}"
    },
    {
      "name": "rando",
      "body": "function(min, max) {\n  return Math.floor(Math.random() * max) + min;  \n}"
    },
    {
      "name": "loop",
      "body": "function(scope, attributes) {\n  var interval = app.js.rando(200, 500);\n  app.state.timer = setInterval(function() {\n    app.js.move();\n  }, interval);\n}"
    },
    {
      "name": "destroy_component",
      "body": "function() {\n  clearInterval(app.state.timer);\n};\n"
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
      "name": "Ghost",
      "element": "div",
      "text": "Ghost",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "border",
              "value": "solid 1px transparent"
            },
            {
              "name": "background-color",
              "value": "gray"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "display",
              "value": "inline-block"
            },
            {
              "name": "padding",
              "value": "20px 10px"
            },
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "position",
              "value": "absolute"
            },
            {
              "name": "top",
              "value": "0"
            },
            {
              "name": "left",
              "value": "0"
            },
            {
              "name": "border-radius",
              "value": "30px"
            },
            {
              "name": "opacity",
              "value": "0.8"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var styles = {};\n  \n  styles.top = app.state.top + 'px';\n  styles.left = app.state.left + 'px';\n  styles.backgroundColor = app.props.backgroundColor || 'gray';\n  \n  return styles;\n}"
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
      "parent": null
    }
  }
}
if(typeof module !== "undefined") module.exports = blissProject;
