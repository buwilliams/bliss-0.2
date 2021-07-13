var blissProject = {
  "name": "index2",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 90,
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
      "name": "index2",
      "element": "div",
      "text": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "85",
      "parent": null
    },
    "83": {
      "id": "83",
      "name": "spa slow",
      "element": "h1",
      "text": "Building single page apps is slow and complicated.",
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
              "name": "font-family",
              "value": "$fontHeader"
            },
            {
              "name": "margin-top",
              "value": "1em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "84",
      "previous": null,
      "child": null,
      "parent": "85"
    },
    "84": {
      "id": "84",
      "name": "text editors",
      "element": "h2",
      "text": "Texts editors were not designed for the web.",
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
              "name": "color",
              "value": "#808282"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "86",
      "previous": "83",
      "child": null,
      "parent": "85"
    },
    "85": {
      "id": "85",
      "name": "why",
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
      "previous": null,
      "child": "83",
      "parent": "82"
    },
    "86": {
      "id": "86",
      "name": "flexbox",
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
            },
            {
              "name": "justify-content",
              "value": "space-around"
            }
          ]
        },
        {
          "selector": "$id > div",
          "properties": [
            {
              "name": "flex-grow",
              "value": "1"
            },
            {
              "name": "padding",
              "value": "0.5em"
            },
            {
              "name": "margin",
              "value": "0 0.25em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "84",
      "child": "87",
      "parent": "85"
    },
    "87": {
      "id": "87",
      "name": "visual design",
      "element": "div",
      "text": "Visual Design",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "card"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "88",
      "previous": null,
      "child": null,
      "parent": "86"
    },
    "88": {
      "id": "88",
      "name": "experiment",
      "element": "div",
      "text": "Experiment",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "card"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "89",
      "previous": "87",
      "child": null,
      "parent": "86"
    },
    "89": {
      "id": "89",
      "name": "share",
      "element": "div",
      "text": "Share",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "card"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "88",
      "child": null,
      "parent": "86"
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
  "filename": "index2",
  "pageTitle": "index2",
  "rootProps": {
    "index2": {}
  }
}
if(typeof module !== "undefined") module.exports = blissProject;
