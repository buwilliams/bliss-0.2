var blissProject = {
  "name": "index",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 132,
  "rootId": "1",
  "externalCss": [
    "https://fonts.googleapis.com/css?family=Pacifico|Quicksand|Yanone+Kaffeesatz",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
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
      "name": "linkColor",
      "value": "#f64e54"
    },
    {
      "name": "linkHoverColor",
      "value": "#ff2252"
    },
    {
      "name": "fontBody",
      "value": "'Quicksand', sans-serif;"
    },
    {
      "name": "fontCursive",
      "value": "'Pacifico', cursive"
    },
    {
      "name": "fontHeader",
      "value": "'Yanone Kaffeesatz', sans-serif"
    }
  ],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "background-image",
          "value": "url(\"https://i.imgur.com/BdaB2OY.png\"), linear-gradient(to right, #1fc8db, #2cb5e8)"
        },
        {
          "name": "color",
          "value": "white"
        },
        {
          "name": "font-family",
          "value": "'Quicksand', sans-serif;"
        },
        {
          "name": "font-size",
          "value": "18px"
        },
        {
          "name": "margin",
          "value": "0"
        },
        {
          "name": "padding",
          "value": "0"
        }
      ]
    },
    {
      "selector": "h1",
      "properties": [
        {
          "name": "font-size",
          "value": "2em"
        },
        {
          "name": "font-family",
          "value": "'Pacifico', cursive"
        }
      ]
    },
    {
      "selector": "h2",
      "properties": [
        {
          "name": "font-size",
          "value": "1.5em"
        }
      ]
    },
    {
      "selector": "h2, h3, h4, h5",
      "properties": [
        {
          "name": "font-family",
          "value": "'Yanone Kaffeesatz', sans-serif"
        }
      ]
    },
    {
      "selector": "a, a:visited",
      "properties": [
        {
          "name": "color",
          "value": "$linkColor"
        }
      ]
    },
    {
      "selector": "a:hover, a:active",
      "properties": [
        {
          "name": "text-decoration",
          "value": "underline"
        },
        {
          "name": "color",
          "value": "$linkHoverColor"
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
      "name": "Bliss UI Website",
      "element": "div",
      "text": null,
      "attributes": [
        {
          "name": "class",
          "value": "container-fluid"
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
      "name": "header",
      "element": "h1",
      "text": "Bliss UI",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "header"
        }
      ],
      "css": [
        {
          "selector": ".header",
          "properties": [
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "background-color",
              "value": "rgba(0, 0, 0, 0.8)"
            },
            {
              "name": "margin",
              "value": "0"
            },
            {
              "name": "padding",
              "value": "20px 0"
            },
            {
              "name": "font-family",
              "value": "'Pacifico', cursive;"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "8",
      "parent": "42"
    },
    "8": {
      "id": "8",
      "name": "small header",
      "element": "small",
      "text": "Inspired App Platform",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "small"
        }
      ],
      "css": [
        {
          "selector": ".small",
          "properties": [
            {
              "name": "display",
              "value": "block"
            },
            {
              "name": "font-size",
              "value": "0.5em"
            },
            {
              "name": "font-family",
              "value": "'Quicksand', sans-serif;"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "2"
    },
    "9": {
      "id": "9",
      "name": "content col",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-8 offset-md-2 content"
        }
      ],
      "css": [
        {
          "selector": ".content",
          "properties": [
            {
              "name": "background-color",
              "value": "rgba(255, 255, 255, 0.8)"
            },
            {
              "name": "color",
              "value": "#333333"
            },
            {
              "name": "padding",
              "value": "20px"
            },
            {
              "name": "border-bottom-left-radius",
              "value": "5px"
            },
            {
              "name": "border-bottom-right-radius",
              "value": "5px"
            },
            {
              "name": "margin-bottom",
              "value": "2em"
            },
            {
              "name": "box-shadow",
              "value": "0 0 5px 3px rgba(0,0,0,.35)"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "75",
      "parent": "45"
    },
    "22": {
      "id": "22",
      "name": "para",
      "element": "p",
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
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "margin-bottom",
              "value": "0"
            },
            {
              "name": "margin-top",
              "value": "2em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "80",
      "child": "23",
      "parent": "9"
    },
    "23": {
      "id": "23",
      "name": "span",
      "element": "span",
      "text": "Let's get connected!  ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "24",
      "previous": null,
      "child": null,
      "parent": "22"
    },
    "24": {
      "id": "24",
      "name": "link",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "mailto: buddy@blissui.com"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "25",
      "previous": "23",
      "child": "56",
      "parent": "22"
    },
    "25": {
      "id": "25",
      "name": "span",
      "element": "span",
      "text": " or ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "26",
      "previous": "24",
      "child": null,
      "parent": "22"
    },
    "26": {
      "id": "26",
      "name": "link",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "https://twitter.com/buwilliams"
        },
        {
          "name": "target",
          "value": "_blank"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "25",
      "child": "54",
      "parent": "22"
    },
    "40": {
      "id": "40",
      "name": "header row",
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
      "next": "45",
      "previous": null,
      "child": "42",
      "parent": "1"
    },
    "42": {
      "id": "42",
      "name": "header col",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col header-col"
        }
      ],
      "css": [
        {
          "selector": ".header-col",
          "properties": [
            {
              "name": "padding-left",
              "value": "0"
            },
            {
              "name": "padding-right",
              "value": "0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "2",
      "parent": "40"
    },
    "45": {
      "id": "45",
      "name": "content row",
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
      "previous": "40",
      "child": "9",
      "parent": "1"
    },
    "54": {
      "id": "54",
      "name": "twitter icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-twitter"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "55",
      "previous": null,
      "child": null,
      "parent": "26"
    },
    "55": {
      "id": "55",
      "name": "twitter handle",
      "element": "span",
      "text": "twitter",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-left",
              "value": "2px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "54",
      "child": null,
      "parent": "26"
    },
    "56": {
      "id": "56",
      "name": "email icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-envelope"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "57",
      "previous": null,
      "child": null,
      "parent": "24"
    },
    "57": {
      "id": "57",
      "name": "email address",
      "element": "span",
      "text": "email",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-left",
              "value": "2px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "56",
      "child": null,
      "parent": "24"
    },
    "73": {
      "id": "73",
      "name": "browse link",
      "element": "a",
      "text": "Browse",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "/hosted/"
        },
        {
          "name": "target",
          "value": "_blank"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "76",
      "previous": "77",
      "child": null,
      "parent": "75"
    },
    "75": {
      "id": "75",
      "name": "menu item_copy",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#"
        }
      ],
      "css": [
        {
          "selector": "$id a",
          "properties": [
            {
              "name": "height",
              "value": "4em"
            },
            {
              "name": "background-color",
              "value": "$linkColor"
            },
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "padding",
              "value": "5px 12px"
            },
            {
              "name": "margin",
              "value": "0 3px"
            }
          ]
        },
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-bottom",
              "value": "20px"
            },
            {
              "name": "text-align",
              "value": "center"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "79",
      "previous": null,
      "child": "77",
      "parent": "9"
    },
    "76": {
      "id": "76",
      "name": "play link",
      "element": "a",
      "text": "Sign-in",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "/bliss/"
        },
        {
          "name": "target",
          "value": "_blank"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "73",
      "child": null,
      "parent": "75"
    },
    "77": {
      "id": "77",
      "name": "watch link",
      "element": "a",
      "text": "Watch",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#"
        }
      ],
      "css": [],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var currentValue = app.state.settings.showVideo\n  return function(e) {\n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n      key: 'showVideo',\n      value: !currentValue\n    })\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "73",
      "previous": null,
      "child": null,
      "parent": "75"
    },
    "78": {
      "id": "78",
      "name": "todo video",
      "element": "iframe",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "name",
          "value": ""
        },
        {
          "name": "width",
          "value": "560"
        },
        {
          "name": "height",
          "value": "315"
        },
        {
          "name": "src",
          "value": "https://www.youtube.com/embed/j7bxCtu3SVo?rel=0&controls=0&showinfo=0&autoplay=1"
        },
        {
          "name": "frameBorder",
          "value": "0"
        },
        {
          "name": "allowFullScreen",
          "value": "true"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "border",
              "value": "none"
            },
            {
              "name": "margin",
              "value": "0 auto"
            },
            {
              "name": "width",
              "value": "560px"
            },
            {
              "name": "display",
              "value": "block"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "79"
    },
    "79": {
      "id": "79",
      "name": "video container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "position",
              "value": "relative"
            },
            {
              "name": "padding-bottom",
              "value": "56.25%"
            },
            {
              "name": "padding-top",
              "value": "30px"
            },
            {
              "name": "height",
              "value": "0"
            },
            {
              "name": "overflow",
              "value": "hidden"
            }
          ]
        },
        {
          "selector": "$id iframe, $id object, $id embed",
          "properties": [
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
              "name": "width",
              "value": "100%"
            },
            {
              "name": "height",
              "value": "100%"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return app.state.settings.showVideo;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "80",
      "previous": "75",
      "child": "78",
      "parent": "9"
    },
    "80": {
      "id": "80",
      "name": "Layout container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "22",
      "previous": "79",
      "child": "82",
      "parent": "9"
    },
    "81": {
      "id": "81",
      "name": "Content",
      "element": "content",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "80"
    },
    "82": {
      "id": "82",
      "name": "index",
      "element": "div",
      "text": null,
      "attributes": [
        {
          "name": "class",
          "value": "container-fluid"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "126",
      "parent": null
    },
    "83": {
      "id": "83",
      "name": "What is BlissUI?",
      "element": "h2",
      "text": "What is BlissUI?",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "90",
      "previous": null,
      "child": null,
      "parent": "126"
    },
    "84": {
      "id": "84",
      "name": "The inspiration for BlissUI",
      "element": "h2",
      "text": "The inspiration for BlissUI",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "91",
      "previous": null,
      "child": null,
      "parent": "129"
    },
    "85": {
      "id": "85",
      "name": "ideas for the future",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "131",
      "child": "89",
      "parent": "82"
    },
    "86": {
      "id": "86",
      "name": "Quick Prototypes",
      "element": "h2",
      "text": "Quick Prototypes",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "113",
      "previous": null,
      "child": null,
      "parent": "130"
    },
    "87": {
      "id": "87",
      "name": "Current State of BlissUI",
      "element": "h2",
      "text": "Current State of BlissUI",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "93",
      "previous": null,
      "child": null,
      "parent": "131"
    },
    "88": {
      "id": "88",
      "name": "Getting Started",
      "element": "h2",
      "text": "Getting Started",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "95",
      "previous": null,
      "child": null,
      "parent": "128"
    },
    "89": {
      "id": "89",
      "name": "Ideas for future development",
      "element": "h2",
      "text": "Ideas for future development",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "102",
      "previous": null,
      "child": null,
      "parent": "85"
    },
    "90": {
      "id": "90",
      "name": "para",
      "element": "p",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "119",
      "previous": "83",
      "child": "116",
      "parent": "126"
    },
    "91": {
      "id": "91",
      "name": "para",
      "element": "p",
      "text": "Years ago, we have visual tools for creating applications. Back then if you wanted a button in your program, you dragged it there. You could edit properties in a visual tool. Those tools were before web apps took hold. It feels that we’ve taken a step backwards really. Now everything is code, frameworks, burdensome processes, and more code. We want to bring back that visual experience and see just how freeing it could really be. Instead of a general purpose IDE, BlissUI gives you a full featured toolkit for building web apps.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "94",
      "previous": "84",
      "child": null,
      "parent": "129"
    },
    "92": {
      "id": "92",
      "name": "para",
      "element": "p",
      "text": "BlissUI helps you rapidly prototype and experiment with the ideas you have. You can realistically build and publish an app in a few short minutes. So it’s a great way to explore your ideas and it’s fun to experience.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "113",
      "child": null,
      "parent": "130"
    },
    "93": {
      "id": "93",
      "name": "para",
      "element": "p",
      "text": "The first version of BlissUI is ready for experimental use. You can build apps with BlissUI right now. At this time, there’s no documentation so it’s pure play. If more folks become interested, there’s a lot we can do.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "87",
      "child": null,
      "parent": "131"
    },
    "94": {
      "id": "94",
      "name": "para",
      "element": "p",
      "text": "BlissUI is so inspired it built itself. I know that’s confusing but let me say it a different way, we used BlissUI to create BlissUI. How inspired is that?!",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "115",
      "previous": "91",
      "child": null,
      "parent": "129"
    },
    "95": {
      "id": "95",
      "name": "ol",
      "element": "ol",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "88",
      "child": "121",
      "parent": "128"
    },
    "96": {
      "id": "96",
      "name": "li",
      "element": "li",
      "text": "Watch ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "98",
      "previous": "121",
      "child": "97",
      "parent": "95"
    },
    "97": {
      "id": "97",
      "name": "link",
      "element": "a",
      "text": "creating a Todo App",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "https://www.youtube.com/watch?v=j7bxCtu3SVo"
        },
        {
          "name": "target",
          "value": "_blank"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "96"
    },
    "98": {
      "id": "98",
      "name": "li",
      "element": "li",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "100",
      "previous": "96",
      "child": "124",
      "parent": "95"
    },
    "99": {
      "id": "99",
      "name": "link",
      "element": "a",
      "text": "free account",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "https://blissui.com/bliss/"
        },
        {
          "name": "target",
          "value": "_blank"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "125",
      "previous": "124",
      "child": null,
      "parent": "98"
    },
    "100": {
      "id": "100",
      "name": "li",
      "element": "li",
      "text": "Experiment!",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "101",
      "previous": "98",
      "child": null,
      "parent": "95"
    },
    "101": {
      "id": "101",
      "name": "li",
      "element": "li",
      "text": "Share what you make, we'd love to see it",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "100",
      "child": null,
      "parent": "95"
    },
    "102": {
      "id": "102",
      "name": "ul",
      "element": "ul",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "89",
      "child": "103",
      "parent": "85"
    },
    "103": {
      "id": "103",
      "name": "li",
      "element": "li",
      "text": "An Education version of BlissUI to help folks learn how to program",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "104",
      "previous": null,
      "child": null,
      "parent": "102"
    },
    "104": {
      "id": "104",
      "name": "li_copy",
      "element": "li",
      "text": "Marketplace to share components",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "105",
      "previous": "103",
      "child": null,
      "parent": "102"
    },
    "105": {
      "id": "105",
      "name": "li_copy_copy",
      "element": "li",
      "text": "Publish apps to existing products",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "106",
      "previous": "104",
      "child": null,
      "parent": "102"
    },
    "106": {
      "id": "106",
      "name": "li_copy_copy_copy",
      "element": "li",
      "text": "Tight integration with cloud-based products such as Firebase",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "105",
      "child": null,
      "parent": "102"
    },
    "107": {
      "id": "107",
      "name": "image",
      "element": "img",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "src",
          "value": "https://i.imgur.com/ood3FcY.png"
        },
        {
          "name": "width",
          "value": "100%"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "108"
    },
    "108": {
      "id": "108",
      "name": "screenshot",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "screenshot"
        }
      ],
      "css": [
        {
          "selector": ".screenshot",
          "properties": [
            {
              "name": "margin-top",
              "value": "15px"
            },
            {
              "name": "margin-bottom",
              "value": "45px"
            },
            {
              "name": "text-align",
              "value": "center"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "111",
      "previous": "110",
      "child": "107",
      "parent": "127"
    },
    "109": {
      "id": "109",
      "name": "chevron down icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-chevron-down"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "110"
    },
    "110": {
      "id": "110",
      "name": "chevron bottom",
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
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "108",
      "previous": "114",
      "child": "109",
      "parent": "127"
    },
    "111": {
      "id": "111",
      "name": "ellipses",
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
              "name": "opacity",
              "value": "0.2"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "margin",
              "value": "24px 0"
            },
            {
              "name": "display",
              "value": "none"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "108",
      "child": "112",
      "parent": "127"
    },
    "112": {
      "id": "112",
      "name": "ellipses image",
      "element": "img",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "src",
          "value": "https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/svg/ellipses.svg"
        },
        {
          "name": "width",
          "value": "50"
        },
        {
          "name": "alt",
          "value": "separating content"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "111"
    },
    "113": {
      "id": "113",
      "name": "para",
      "element": "p",
      "text": "Presently, BlissUI creates React.js apps and pairs nicely with Firebase. You don’t need to worry about those details. BlissUI takes standard technologies such as HTML, CSS, JavaScript, React, Data Management and puts them into a nice visual tool so that you can focus on exploring concepts, ideas, and beauty.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "92",
      "previous": "86",
      "child": null,
      "parent": "130"
    },
    "114": {
      "id": "114",
      "name": "para",
      "element": "p",
      "text": "The mission is simple yet enormous, we want to remove all barriers that get in the way of inspiration. To touch that part of us  makes us uniquely human. This mission is our mojo.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "110",
      "previous": "122",
      "child": null,
      "parent": "127"
    },
    "115": {
      "id": "115",
      "name": "para",
      "element": "p",
      "text": "I can almost hear you now… people have tried that. These solutions are always less than ideal. There’s always a greatly limiting architecture. Do not be afraid! BlissUI is an open system. It’s built with open-source and supports the community. We try hard not to lock you in. It’s is not a black box. It’s not even a box. It’s a spaceship. Aren’t you curious? A harmony of code and visual tooling is waiting for you. Are you ready to go exploring?",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "94",
      "child": null,
      "parent": "129"
    },
    "116": {
      "id": "116",
      "name": "span",
      "element": "span",
      "text": "Simply put, it’s an ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "118",
      "previous": null,
      "child": null,
      "parent": "90"
    },
    "117": {
      "id": "117",
      "name": "span",
      "element": "span",
      "text": ", think content management system but for apps. It's built to remove technical barriers so that you can focus on creating and delivering. It's in the cloud so all you need is a browser to publish apps (no IDEs, servers, source control, etc). Click the publish button and it's live.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "118",
      "child": null,
      "parent": "90"
    },
    "118": {
      "id": "118",
      "name": "span",
      "element": "span",
      "text": "AMS",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-decoration",
              "value": "underline"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "117",
      "previous": "116",
      "child": null,
      "parent": "90"
    },
    "119": {
      "id": "119",
      "name": "para",
      "element": "p",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "90",
      "child": null,
      "parent": "126"
    },
    "120": {
      "id": "120",
      "name": "published apps link",
      "element": "a",
      "text": "published apps",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "/hosted/"
        },
        {
          "name": "target",
          "value": "_blank"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "123",
      "child": null,
      "parent": "121"
    },
    "121": {
      "id": "121",
      "name": "li",
      "element": "li",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "96",
      "previous": null,
      "child": "123",
      "parent": "95"
    },
    "122": {
      "id": "122",
      "name": "Mission",
      "element": "h2",
      "text": "The mission",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-top",
              "value": "20px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "114",
      "previous": null,
      "child": null,
      "parent": "127"
    },
    "123": {
      "id": "123",
      "name": "browse span",
      "element": "span",
      "text": "Browse ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "120",
      "previous": null,
      "child": null,
      "parent": "121"
    },
    "124": {
      "id": "124",
      "name": "span",
      "element": "span",
      "text": "Create your ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "99",
      "previous": null,
      "child": null,
      "parent": "98"
    },
    "125": {
      "id": "125",
      "name": "span_copy",
      "element": "span",
      "text": " to use it right away",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "99",
      "child": null,
      "parent": "98"
    },
    "126": {
      "id": "126",
      "name": "what is bliss",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "127",
      "previous": null,
      "child": "83",
      "parent": "82"
    },
    "127": {
      "id": "127",
      "name": "the mission",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "128",
      "previous": "126",
      "child": "122",
      "parent": "82"
    },
    "128": {
      "id": "128",
      "name": "getting started",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "129",
      "previous": "127",
      "child": "88",
      "parent": "82"
    },
    "129": {
      "id": "129",
      "name": "the inspiration",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "130",
      "previous": "128",
      "child": "84",
      "parent": "82"
    },
    "130": {
      "id": "130",
      "name": "quick prototypes",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "131",
      "previous": "129",
      "child": "86",
      "parent": "82"
    },
    "131": {
      "id": "131",
      "name": "current state",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "85",
      "previous": "130",
      "child": "87",
      "parent": "82"
    }
  },
  "schemas": [
    {
      "path": "/settings",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    showVideo: false\n  }\n  return newData;\n}"
        },
        {
          "action": "set",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData[args.key] = args.value\n  return newData;\n}"
        }
      ]
    }
  ],
  "filename": "index",
  "pageTitle": "BlissUI - Inspired App Platform"
}
if(typeof module !== "undefined") module.exports = blissProject;
