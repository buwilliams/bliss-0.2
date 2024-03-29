var blissProject = {
  "name": "Bliss Docs",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 68,
  "rootId": "1",
  "externalCss": [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css",
    "https://fonts.googleapis.com/css?family=Roboto"
  ],
  "externalJs": [
    "https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.5/umd/popper.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"
  ],
  "state": {},
  "packages": [],
  "js": [
    {
      "name": "init",
      "body": "function() {\n  app.js.initRouter();\n  app.render();\n}"
    },
    {
      "name": "initRouter",
      "body": "function(scope, attributes) {\n  window.addEventListener(\"hashchange\", function() {\n    app.dispatch({\n      path: '/routes',\n      action: 'setCurrent',\n      route: location.hash\n    })\n  }, false);\n}"
    }
  ],
  "cssVars": [],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "font-size",
          "value": "18px"
        },
        {
          "name": "background-color",
          "value": "#e2e8ea"
        },
        {
          "name": "font-family",
          "value": "'Roboto', sans-serif;"
        },
        {
          "name": "color",
          "value": "#333333"
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
      "name": "Bliss Docs",
      "element": "div",
      "text": "",
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
      "child": "40",
      "parent": null
    },
    "2": {
      "id": "2",
      "name": "Menu",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "menu"
        }
      ],
      "css": [
        {
          "selector": ".menu a",
          "properties": [
            {
              "name": "display",
              "value": "block"
            },
            {
              "name": "font-size",
              "value": "14px"
            },
            {
              "name": "padding",
              "value": ".5rem 1rem"
            },
            {
              "name": "color",
              "value": "#333333"
            },
            {
              "name": "border-right",
              "value": "solid 2px rgba(0,0,0,.1)"
            },
            {
              "name": "text-decoration",
              "value": "none"
            }
          ]
        },
        {
          "selector": ".menu a.active, .menu a.active:hover",
          "properties": [
            {
              "name": "border-right",
              "value": "solid 2px #333333"
            },
            {
              "name": "font-weight",
              "value": "bold"
            },
            {
              "name": "background-color",
              "value": "rgba(0,0,0,.1)"
            }
          ]
        },
        {
          "selector": ".menu a:hover",
          "properties": [
            {
              "name": "border-right",
              "value": "solid 2px rgba(0,0,0,.3)"
            },
            {
              "name": "background-color",
              "value": "rgba(0,0,0,.05)"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "47",
      "parent": "22"
    },
    "3": {
      "id": "3",
      "name": "link",
      "element": "a",
      "text": "",
      "textFn": "getText",
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var item = scope.repeater[scope.repeater_index]\n  return item.label\n};\n"
        },
        {
          "name": "getClass",
          "body": "function(scope, attributes) {\n  var route = scope.repeater[scope.repeater_index].route\n  var current = app.state.routes.current\n  return (route === current) ? \"active\" : \"\"\n}"
        },
        {
          "name": "getHref",
          "body": "function(scope, attributes) {\n  var route = scope.repeater[scope.repeater_index].route\n  return route\n}"
        },
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  var is_nil = _.isNil(scope.repeater[scope.repeater_index].route)\n  return !is_nil\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "className",
          "value": "getClass"
        },
        {
          "name": "href",
          "value": "getHref"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "47"
    },
    "22": {
      "id": "22",
      "name": "Left column",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-3"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "23",
      "previous": null,
      "child": "2",
      "parent": "41"
    },
    "23": {
      "id": "23",
      "name": "Right column",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-9"
        }
      ],
      "css": [
        {
          "selector": "h2",
          "properties": [
            {
              "name": "margin-top",
              "value": "1rem"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "22",
      "child": "30",
      "parent": "41"
    },
    "24": {
      "id": "24",
      "name": "header",
      "element": "h2",
      "text": "Introducing Bliss UI",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "45",
      "previous": null,
      "child": null,
      "parent": "30"
    },
    "25": {
      "id": "25",
      "name": "copy 1",
      "element": "p",
      "text": "Hello, I'm Buddy, the creator of Bliss UI and it's my joy to share Bliss UI with you. Let me start by sharing the inspiration for this project, back in 2012, Bret Victor gave a talk entitled, \"Inventing on Principal\", in his talk he suggests that \"creators need an immediate connection with their creations.\" He said that as you work you need see what you're making right then as if you were drawing on paper. On paper, you can see what you draw instantly. This is not true for the UI/UX in web apps.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "26",
      "previous": "45",
      "child": null,
      "parent": "30"
    },
    "26": {
      "id": "26",
      "name": "copy 2",
      "element": "p",
      "text": "There exists today several problems with UI/UX development. First, there is a dividing wall between designers and developers. Today a designer creates a mockup and then pitches the design over the wall and it lands in a developer's lap. Once the developer takes that design to code, the designer is unable to make changes without going through the same process. Is this the only process that can work?",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "27",
      "previous": "25",
      "child": null,
      "parent": "30"
    },
    "27": {
      "id": "27",
      "name": "copy 3",
      "element": "p",
      "text": "Our next problem is developer tooling. Code, code, and more code. Have you ever wondered why the tools we use to make visual software are not in fact visual themselves? Why is creating a UI the same process as writing backend code? It just doesn't make any sense and it doesn't have to be so. I made Bliss UI to be visual from the start. There's still code and it's hidden and when it's not hidden it's well organized.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "28",
      "previous": "26",
      "child": null,
      "parent": "30"
    },
    "28": {
      "id": "28",
      "name": "copy 4",
      "element": "p",
      "text": "Finally, there is so much boilerplate programming going on and so little collaboration between disciplines. Designers, developers, and product should be able to sit in the same room virtually or physically and create a stunning look and feel along with user flow for their product.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "42",
      "previous": "27",
      "child": null,
      "parent": "30"
    },
    "29": {
      "id": "29",
      "name": "copy 1",
      "element": "p",
      "text": "These docs are not quite finished, sad. I expect them completed by October 1st 2017, happy.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "46",
      "child": null,
      "parent": "32"
    },
    "30": {
      "id": "30",
      "name": "Introducing Bliss UI Content",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return (app.state.routes.current === '#introducing_bliss');\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "49",
      "previous": null,
      "child": "24",
      "parent": "23"
    },
    "32": {
      "id": "32",
      "name": "Coming Soon Content",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  var route = app.state.routes.current\n  var finished = ['#introducing_bliss',\n                  '#getting_started']\n  var shouldShow = _.reduce(finished,\n\t\tfunction(accum, item) {\n    \treturn (item === route || accum === false) ? \n        false : accum\n  \t}, true)\n  return shouldShow;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "49",
      "child": "33",
      "parent": "23"
    },
    "33": {
      "id": "33",
      "name": "header",
      "element": "h2",
      "text": "Coming soon",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "46",
      "previous": null,
      "child": null,
      "parent": "32"
    },
    "38": {
      "id": "38",
      "name": "header",
      "element": "h1",
      "text": "Bliss UI Docs",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-top",
              "value": "1rem"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "44"
    },
    "40": {
      "id": "40",
      "name": "row 1",
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
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-align",
              "value": "center"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "41",
      "previous": null,
      "child": "44",
      "parent": "1"
    },
    "41": {
      "id": "41",
      "name": "row 2",
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
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "#ffffff"
            },
            {
              "name": "border",
              "value": "solid 1px transparent"
            },
            {
              "name": "border-radius",
              "value": "5px"
            },
            {
              "name": "margin",
              "value": "0 0 3rem 0"
            },
            {
              "name": "padding",
              "value": "1rem 0 0 0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "40",
      "child": "22",
      "parent": "1"
    },
    "42": {
      "id": "42",
      "name": "copy 5",
      "element": "p",
      "text": "Today, it simply takes too long. Too long to turn those ideas into wireframes, mockups, and code. I say no more. I say, let's go from concept to production in minutes. I say let's do it together in the same room at the same time.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "28",
      "child": null,
      "parent": "30"
    },
    "44": {
      "id": "44",
      "name": "column",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-12"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "38",
      "parent": "40"
    },
    "45": {
      "id": "45",
      "name": "line",
      "element": "hr",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "25",
      "previous": "24",
      "child": null,
      "parent": "30"
    },
    "46": {
      "id": "46",
      "name": "line",
      "element": "hr",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "29",
      "previous": "33",
      "child": null,
      "parent": "32"
    },
    "47": {
      "id": "47",
      "name": "Link Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": "repeater",
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  return app.state.routes.list;\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "3",
      "parent": "2"
    },
    "49": {
      "id": "49",
      "name": "Getting Started",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return (app.state.routes.current === '#getting_started');\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "32",
      "previous": "30",
      "child": "50",
      "parent": "23"
    },
    "50": {
      "id": "50",
      "name": "header",
      "element": "h2",
      "text": "Getting Started",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "51",
      "previous": null,
      "child": null,
      "parent": "49"
    },
    "51": {
      "id": "51",
      "name": "line",
      "element": "hr",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "52",
      "previous": "50",
      "child": null,
      "parent": "49"
    },
    "52": {
      "id": "52",
      "name": "copy 1",
      "element": "p",
      "text": "Bliss is organized by workspaces and projects. A workspace produces a single app and url. A workspace is made up of one or more projects.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "53",
      "previous": "51",
      "child": null,
      "parent": "49"
    },
    "53": {
      "id": "53",
      "name": "copy 2",
      "element": "p",
      "text": "Here's a high-level step-by-step guide to getting started:",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "54",
      "previous": "52",
      "child": null,
      "parent": "49"
    },
    "54": {
      "id": "54",
      "name": "step-by-step",
      "element": "ol",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "64",
      "previous": "53",
      "child": "55",
      "parent": "49"
    },
    "55": {
      "id": "55",
      "name": "item 1",
      "element": "li",
      "text": "Sign-up for an account at ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "56",
      "previous": null,
      "child": "58",
      "parent": "54"
    },
    "56": {
      "id": "56",
      "name": "item 2",
      "element": "li",
      "text": "After signing-in, create a new workspace and click it once it's created.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "57",
      "previous": "55",
      "child": null,
      "parent": "54"
    },
    "57": {
      "id": "57",
      "name": "item 3",
      "element": "li",
      "text": "Change the name of the first element. This will give your project a personalized name. You can change the name by clicking on the first item on the left-hand side then finding the name property on the right-hand side and simply typing in a new name.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "61",
      "previous": "56",
      "child": null,
      "parent": "54"
    },
    "58": {
      "id": "58",
      "name": "link",
      "element": "a",
      "text": "https://blissui.com/#pricing",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "https://blissui.com/#pricing"
        },
        {
          "name": "target",
          "value": "_blank"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "59",
      "previous": null,
      "child": null,
      "parent": "55"
    },
    "59": {
      "id": "59",
      "name": "parens",
      "element": "div",
      "text": " (instructions will be sent for how to sign-in)",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "58",
      "child": null,
      "parent": "55"
    },
    "61": {
      "id": "61",
      "name": "item 4",
      "element": "li",
      "text": "Below the name property, you will see: Element, Text, Text(FN), IF(FN), and Repeat(FN). For now, change the text property to read, \"Hello, world.\"",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "62",
      "previous": "57",
      "child": null,
      "parent": "54"
    },
    "62": {
      "id": "62",
      "name": "item 5",
      "element": "li",
      "text": "In the middle (Viewport aka. Designer screen), you should see the text, \"Hello, world.\" If not, contact support at bliss@blissui.com otherwise, click on Projects and choose \"Deploy project\"",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "63",
      "previous": "61",
      "child": null,
      "parent": "54"
    },
    "63": {
      "id": "63",
      "name": "item 6",
      "element": "li",
      "text": "Now that your project is deployed, click \"Projects\" again, and this time choose, \"View Live Project\". This will open a new browser window taking you to your new UI.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "62",
      "child": null,
      "parent": "54"
    },
    "64": {
      "id": "64",
      "name": "copy 3",
      "element": "p",
      "text": "So... what just happened? In a few clicks, you created a new application and made it live to the world. So far it only says, \"Hello, world.\" but it's packed with a large set of features waiting for you to explore.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "65",
      "previous": "54",
      "child": null,
      "parent": "49"
    },
    "65": {
      "id": "65",
      "name": "copy 4",
      "element": "p",
      "text": "Bliss is a full-featured UI/UX platform. This means you create buttons, drop-downs, grids, graphs, screens, animations, and just about anything you can imagine. Bliss is so powerful in fact that the Bliss interface was created using Bliss and so the website. In fact, I'm writing the documentation using Bliss!",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "66",
      "previous": "64",
      "child": null,
      "parent": "49"
    },
    "66": {
      "id": "66",
      "name": "copy 5",
      "element": "p",
      "text": "Okay, sounds great. How do I get all this feature-rich goodness? Hello, world while traditional isn't impressive. That's what this documentation is designed to do, to be a guide. Not only to show the features of Bliss but share it's mindset. Bliss is a new way of working.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "67",
      "previous": "65",
      "child": null,
      "parent": "49"
    },
    "67": {
      "id": "67",
      "name": "copy 6",
      "element": "p",
      "text": "A word of \"fun\" not caution. Bliss is sneakily robust. Click around, try things because it should do what you expect. If not, reach out to us at bliss@blissui.com",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "66",
      "child": null,
      "parent": "49"
    }
  },
  "schemas": [
    {
      "path": "/routes",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    current: '#introducing_bliss',\n    list: [\n      {\n        label: 'Introducing Bliss UI',\n        route: '#introducing_bliss'\n      },\n      {\n        label: 'Getting Started',\n        route: '#getting_started'\n      },\n      {\n        label: 'Hosting',\n        route: '#hosting'\n      },\n      {\n        label: 'Workspaces',\n        route: '#workspaces'\n      },\n      {\n        label: 'Projects',\n        route: '#projects'\n      },\n      {\n        label: 'Components',\n        route: '#components'\n      },\n      {\n        label: 'Elements',\n        route: '#elements'\n      },\n      {\n        label: 'CSS',\n        route: '#css'\n      },\n      {\n        label: 'CSS Variables',\n        route: '#css_variables'\n      },\n      {\n        label: 'JavaScript',\n        route: '#javascript'\n      },\n      {\n        label: 'Data Editor',\n        route: '#data_editor'\n      },\n      {\n        label: 'Assets',\n        route: '#assets'\n      },\n      {\n        label: 'Properties',\n        route: '#properties'\n      },\n      {\n        label: 'Global JavaScript',\n        route: '#global_javascript'\n      },\n      {\n        label: 'Global CSS',\n        route: '#global_css'\n      },\n      {\n        label: 'Node Modules',\n        route: '#node_modules'\n      },\n      {\n        label: 'Page Load',\n        route: '#page_load'\n      },\n      {\n        label: 'Settings',\n        route: '#settings'\n      },\n      {\n        label: 'Bliss JavaScript Reference',\n        route: '#bliss_javascript_reference'\n      }\n    ]\n  }\n  if(location.hash !== '') newData.current = location.hash;\n  return newData;\n}"
        },
        {
          "action": "setCurrent",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  newData.current = args.route;\n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
