var blissProject = {
  "name": "Bliss UI Website",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 80,
  "rootId": "1",
  "externalCss": [
    "https://fonts.googleapis.com/css?family=Roboto",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  ],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js",
    "node_modules/jquery/dist/jquery.min.js"
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
      "name": "jquery",
      "version": "3.2.1"
    }
  ],
  "js": [
    {
      "name": "init",
      "body": "function() {\n  app.render();\n  \n  window.addEventListener(\"hashchange\", function(event) {\n    app.dispatch({\n      path: '/nav',\n      action: 'setCurrentPage',\n      value: location.hash\n    })\n  });\n}"
    }
  ],
  "cssVars": [
    {
      "name": "background",
      "value": "#f1f1f1"
    },
    {
      "name": "dark",
      "value": "#323f46"
    },
    {
      "name": "blue",
      "value": "#01a5e0"
    },
    {
      "name": "links",
      "value": "#75bbd4"
    }
  ],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "font-family",
          "value": "'Roboto', sans-serif;"
        },
        {
          "name": "background-color",
          "value": "#333"
        },
        {
          "name": "color",
          "value": "#333"
        },
        {
          "name": "margin",
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
      "child": "14",
      "parent": null
    },
    "14": {
      "id": "14",
      "name": "Header",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "header clearfix"
        }
      ],
      "css": [
        {
          "selector": ".header",
          "properties": [
            {
              "name": "padding",
              "value": "10px 20px"
            },
            {
              "name": "background-color",
              "value": "$dark"
            },
            {
              "name": "margin-left",
              "value": "-15px"
            },
            {
              "name": "margin-right",
              "value": "-15px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "30",
      "previous": null,
      "child": "22",
      "parent": "1"
    },
    "16": {
      "id": "16",
      "name": "Footer",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "footer"
        }
      ],
      "css": [
        {
          "selector": ".footer",
          "properties": [
            {
              "name": "background-color",
              "value": "#333"
            },
            {
              "name": "color",
              "value": "#bcbcbc"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "padding",
              "value": "1rem"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "70",
      "child": "51",
      "parent": "1"
    },
    "17": {
      "id": "17",
      "name": "Nav",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "float-right home-menu"
        }
      ],
      "css": [
        {
          "selector": ".home-menu",
          "properties": [
            {
              "name": "background-color",
              "value": "$dark"
            }
          ]
        },
        {
          "selector": ".home-menu a",
          "properties": [
            {
              "name": "color",
              "value": "$links"
            },
            {
              "name": "margin",
              "value": "0 10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "22",
      "child": "54",
      "parent": "14"
    },
    "19": {
      "id": "19",
      "name": "Try for 30-days",
      "element": "a",
      "text": "Try for 30-days",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#30daytrial"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "28",
      "previous": "54",
      "child": null,
      "parent": "17"
    },
    "20": {
      "id": "20",
      "name": "Contact",
      "element": "a",
      "text": "Contact",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#contact"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "73",
      "child": null,
      "parent": "17"
    },
    "22": {
      "id": "22",
      "name": "Brand",
      "element": "a",
      "text": "Bliss UI",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "menu-brand pull-left"
        },
        {
          "name": "href",
          "value": "#home"
        }
      ],
      "css": [
        {
          "selector": "a.menu-brand",
          "properties": [
            {
              "name": "background-color",
              "value": "transparent"
            },
            {
              "name": "font-size",
              "value": "18px"
            },
            {
              "name": "color",
              "value": "#5fc0ec"
            },
            {
              "name": "text-decoration",
              "value": "none"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "17",
      "previous": null,
      "child": "29",
      "parent": "14"
    },
    "28": {
      "id": "28",
      "name": "Docs",
      "element": "a",
      "text": "Docs",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "/hosted/5d06f306c22c07a5/bliss_docs/"
        },
        {
          "name": "target",
          "value": "_blank"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "55",
      "previous": "19",
      "child": null,
      "parent": "17"
    },
    "29": {
      "id": "29",
      "name": "subbrand",
      "element": "small",
      "text": "create apps visually",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "brand-small"
        }
      ],
      "css": [
        {
          "selector": ".brand-small",
          "properties": [
            {
              "name": "color",
              "value": "#cecece"
            },
            {
              "name": "margin-left",
              "value": "9px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "22"
    },
    "30": {
      "id": "30",
      "name": "Home Page",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": ""
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "white"
            },
            {
              "name": "margin-left",
              "value": "-15px"
            },
            {
              "name": "margin-right",
              "value": "-15px"
            }
          ]
        },
        {
          "selector": ".l-box",
          "properties": [
            {
              "name": "padding",
              "value": "20px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return (app.state.nav.currentPage === \"#home\");\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "59",
      "previous": "14",
      "child": "31",
      "parent": "1"
    },
    "31": {
      "id": "31",
      "name": "Hero Text",
      "element": "div",
      "text": "Create Beautiful UI/UX in mintues.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "hero col-md-12"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$blue"
            },
            {
              "name": "padding",
              "value": "100px 0"
            },
            {
              "name": "color",
              "value": "#ffffff"
            },
            {
              "name": "font-size",
              "value": "30px"
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
      "next": "46",
      "previous": null,
      "child": "53",
      "parent": "30"
    },
    "32": {
      "id": "32",
      "name": "copy 1",
      "element": "p",
      "text": "We are changing the way you think about creating interfaces. In today's model, designers create wireframes and mockups until the product team is happy. Next, developers to turn those beautiful designs into code, lots and lots of code.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "40",
      "previous": "39",
      "child": null,
      "parent": "38"
    },
    "35": {
      "id": "35",
      "name": "copy 1",
      "element": "p",
      "text": "Changing how you work requires new tooling. Bliss UI provides that tooling by distributing the control eventually across your team. Now designers can design. Programers can program. Product folks can argue who is right. All on the same platform.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "42",
      "previous": "36",
      "child": null,
      "parent": "37"
    },
    "36": {
      "id": "36",
      "name": "Requires a Better Tool",
      "element": "h3",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "35",
      "previous": null,
      "child": "47",
      "parent": "37"
    },
    "37": {
      "id": "37",
      "name": "column 2",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-5"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding",
              "value": "40px 0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "38",
      "child": "36",
      "parent": "46"
    },
    "38": {
      "id": "38",
      "name": "column 1",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-5"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding",
              "value": "40px 0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "37",
      "previous": null,
      "child": "39",
      "parent": "46"
    },
    "39": {
      "id": "39",
      "name": "A New Model",
      "element": "h3",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "32",
      "previous": null,
      "child": "49",
      "parent": "38"
    },
    "40": {
      "id": "40",
      "name": "copy 2",
      "element": "p",
      "text": "What if there's another way? What if a product manager, designer, and developer could sit in the same room and collaborate in a true agile fashion?",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "41",
      "previous": "32",
      "child": null,
      "parent": "38"
    },
    "41": {
      "id": "41",
      "name": "copy 3",
      "element": "p",
      "text": "Introducing, Bliss UI, that better way.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "40",
      "child": null,
      "parent": "38"
    },
    "42": {
      "id": "42",
      "name": "copy 2",
      "element": "p",
      "text": "No creating prototypes that get thrown away. No more creating static mockups. No more boilerplate code.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "43",
      "previous": "35",
      "child": null,
      "parent": "37"
    },
    "43": {
      "id": "43",
      "name": "copy 3",
      "element": "p",
      "text": "Yes to pushing a single button to make it real. Yes to designers making changes after code has been written. Yes to fast. Yes to Bliss UI.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "42",
      "child": null,
      "parent": "37"
    },
    "46": {
      "id": "46",
      "name": "marketing copy",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "row justify-content-around"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin",
              "value": "0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "74",
      "previous": "31",
      "child": "38",
      "parent": "30"
    },
    "47": {
      "id": "47",
      "name": "new_47",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-cogs"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "48",
      "previous": null,
      "child": null,
      "parent": "36"
    },
    "48": {
      "id": "48",
      "name": "new_48",
      "element": "span",
      "text": " Requires a Better Tool",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "47",
      "child": null,
      "parent": "36"
    },
    "49": {
      "id": "49",
      "name": "new_49",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-bullhorn"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "50",
      "previous": null,
      "child": null,
      "parent": "39"
    },
    "50": {
      "id": "50",
      "name": "new_50",
      "element": "span",
      "text": " A New Model",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "49",
      "child": null,
      "parent": "39"
    },
    "51": {
      "id": "51",
      "name": "new_51",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-copyright"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "52",
      "previous": null,
      "child": null,
      "parent": "16"
    },
    "52": {
      "id": "52",
      "name": "new_52",
      "element": "span",
      "text": " 2017 Bliss UI - Buddy Lee Technology LLC",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "51",
      "child": null,
      "parent": "16"
    },
    "53": {
      "id": "53",
      "name": "new_53",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-picture-o"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "opacity",
              "value": ".2"
            },
            {
              "name": "position",
              "value": "absolute"
            },
            {
              "name": "top",
              "value": "calc(50% - 80px)"
            },
            {
              "name": "left",
              "value": "calc(50% - 80px)"
            },
            {
              "name": "font-size",
              "value": "5em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "31"
    },
    "54": {
      "id": "54",
      "name": "Home",
      "element": "a",
      "text": "Home",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#home"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "19",
      "previous": null,
      "child": null,
      "parent": "17"
    },
    "55": {
      "id": "55",
      "name": "The Story",
      "element": "a",
      "text": "The Story",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#thestory"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "73",
      "previous": "28",
      "child": null,
      "parent": "17"
    },
    "59": {
      "id": "59",
      "name": "Contact Page",
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
              "name": "margin-left",
              "value": "-15px"
            },
            {
              "name": "margin-right",
              "value": "-15px"
            },
            {
              "name": "background-color",
              "value": "#ffffff"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return (app.state.nav.currentPage === \"#contact\");\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "68",
      "previous": "30",
      "child": "60",
      "parent": "1"
    },
    "60": {
      "id": "60",
      "name": "Hero Text_copy",
      "element": "div",
      "text": "Need help? Want to say hello? We're here.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "hero col-md-12"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "#e6b100"
            },
            {
              "name": "padding",
              "value": "100px 0"
            },
            {
              "name": "color",
              "value": "#ffffff"
            },
            {
              "name": "font-size",
              "value": "30px"
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
      "next": "62",
      "previous": null,
      "child": "61",
      "parent": "59"
    },
    "61": {
      "id": "61",
      "name": "new_53_copy",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-microphone"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "opacity",
              "value": ".2"
            },
            {
              "name": "position",
              "value": "absolute"
            },
            {
              "name": "top",
              "value": "calc(50% - 80px)"
            },
            {
              "name": "left",
              "value": "calc(50% - 40px)"
            },
            {
              "name": "font-size",
              "value": "5em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "60"
    },
    "62": {
      "id": "62",
      "name": "marketing copy_copy",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "row justify-content-around"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin",
              "value": "0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "60",
      "child": "63",
      "parent": "59"
    },
    "63": {
      "id": "63",
      "name": "column 1",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-6"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding",
              "value": "40px 0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "64",
      "parent": "62"
    },
    "64": {
      "id": "64",
      "name": "email link",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "mailto:bliss@blissui.com"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "display",
              "value": "block"
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
      "next": "65",
      "previous": null,
      "child": "66",
      "parent": "63"
    },
    "65": {
      "id": "65",
      "name": "email copy",
      "element": "div",
      "text": "Getting in touch with us for any reason is easy. Just shoot us an email at bliss@blissui.com. We read. We care. We will respond directly, no canned answers.",
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
              "value": "25px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "64",
      "child": null,
      "parent": "63"
    },
    "66": {
      "id": "66",
      "name": "new_66",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-envelope-o"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "67",
      "previous": null,
      "child": null,
      "parent": "64"
    },
    "67": {
      "id": "67",
      "name": "new_67",
      "element": "span",
      "text": " bliss@blissui.com",
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
      "parent": "64"
    },
    "68": {
      "id": "68",
      "name": "Try Page",
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
              "name": "margin-left",
              "value": "-15px"
            },
            {
              "name": "margin-right",
              "value": "-15px"
            },
            {
              "name": "background-color",
              "value": "#ffffff"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return (app.state.nav.currentPage === \"#30daytrial\");\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "70",
      "previous": "59",
      "child": "69",
      "parent": "1"
    },
    "69": {
      "id": "69",
      "name": "coming soon",
      "element": "div",
      "text": "You've reached the \"Try for 30-days\" page. I'm not quite ready yet. #patience",
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
              "value": "75px 0"
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
      "next": null,
      "previous": null,
      "child": null,
      "parent": "68"
    },
    "70": {
      "id": "70",
      "name": "The Story Page",
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
              "name": "margin-left",
              "value": "-15px"
            },
            {
              "name": "margin-right",
              "value": "-15px"
            },
            {
              "name": "background-color",
              "value": "#ffffff"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return (app.state.nav.currentPage === \"#thestory\");\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "16",
      "previous": "68",
      "child": "72",
      "parent": "1"
    },
    "72": {
      "id": "72",
      "name": "coming soon",
      "element": "div",
      "text": "You've reached \"The Story\" page. I'm not quite ready yet. #patience",
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
              "value": "75px 0"
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
      "next": null,
      "previous": null,
      "child": null,
      "parent": "70"
    },
    "73": {
      "id": "73",
      "name": "Video",
      "element": "a",
      "text": "Sample Video",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "https://www.youtube.com/watch?v=Ka9OJSGVpvo"
        },
        {
          "name": "target",
          "value": "_blank"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "20",
      "previous": "55",
      "child": null,
      "parent": "17"
    },
    "74": {
      "id": "74",
      "name": "Hero Text_copy",
      "element": "div",
      "text": "Latest News",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "hero col-md-12"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "#00e6a1"
            },
            {
              "name": "padding",
              "value": "50px 0"
            },
            {
              "name": "color",
              "value": "#ffffff"
            },
            {
              "name": "font-size",
              "value": "30px"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "border-top",
              "value": "solid 5px #009f7a"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "76",
      "previous": "46",
      "child": "75",
      "parent": "30"
    },
    "75": {
      "id": "75",
      "name": "new_53_copy",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-newspaper-o"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "opacity",
              "value": ".2"
            },
            {
              "name": "position",
              "value": "absolute"
            },
            {
              "name": "top",
              "value": "calc(50% - 40px)"
            },
            {
              "name": "left",
              "value": "calc(50% - 50px)"
            },
            {
              "name": "font-size",
              "value": "3em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "74"
    },
    "76": {
      "id": "76",
      "name": "marketing copy_copy",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "row justify-content-around"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin",
              "value": "0"
            },
            {
              "name": "background-color",
              "value": "#defff3"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "74",
      "child": "77",
      "parent": "30"
    },
    "77": {
      "id": "77",
      "name": "column 1_copy",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-5"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding",
              "value": "40px 0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "78",
      "parent": "76"
    },
    "78": {
      "id": "78",
      "name": "A New Model_copy",
      "element": "h5",
      "text": "Thursday - 9.14.2017",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "79",
      "previous": null,
      "child": null,
      "parent": "77"
    },
    "79": {
      "id": "79",
      "name": "9/14/2017",
      "element": "p",
      "text": "Well, well, well. We are finally ready for the public release of Bliss UI. How exciting! If you've reached out you'll receive an email with your invitation. In the meantime, take a look at our new website and if you have any questions shoot us an email at bliss@blissui.com",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "78",
      "child": null,
      "parent": "77"
    }
  },
  "schemas": [
    {
      "path": "/nav",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    currentPage: '#home'\n  }\n  \n  if(location.hash !== '') {\n    newData.currentPage = location.hash\n  }\n  \n  return newData;\n}"
        },
        {
          "action": "setCurrentPage",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  var newCurrentPage = args.value\n  \n  if(newCurrentPage === \"\") {\n    newCurrentPage = \"#home\"\n  }\n  \n  newData.currentPage = newCurrentPage\n  \n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
