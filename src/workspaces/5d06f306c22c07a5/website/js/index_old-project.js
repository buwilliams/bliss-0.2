var blissProject = {
  "name": "Bliss UI Website",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 82,
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
    "4": {
      "id": "4",
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
      "next": "15",
      "previous": "80",
      "child": null,
      "parent": "9"
    },
    "6": {
      "id": "6",
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
      "next": "16",
      "previous": "27",
      "child": null,
      "parent": "9"
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
    "10": {
      "id": "10",
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
      "next": "59",
      "previous": "61",
      "child": null,
      "parent": "9"
    },
    "11": {
      "id": "11",
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
      "next": "18",
      "previous": "17",
      "child": null,
      "parent": "9"
    },
    "13": {
      "id": "13",
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
      "next": "27",
      "previous": "52",
      "child": null,
      "parent": "9"
    },
    "14": {
      "id": "14",
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
      "next": "34",
      "previous": "18",
      "child": null,
      "parent": "9"
    },
    "15": {
      "id": "15",
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
      "next": "65",
      "previous": "4",
      "child": "62",
      "parent": "9"
    },
    "16": {
      "id": "16",
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
      "next": "21",
      "previous": "6",
      "child": null,
      "parent": "9"
    },
    "17": {
      "id": "17",
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
      "next": "11",
      "previous": "59",
      "child": null,
      "parent": "9"
    },
    "18": {
      "id": "18",
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
      "next": "14",
      "previous": "11",
      "child": null,
      "parent": "9"
    },
    "21": {
      "id": "21",
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
      "next": "61",
      "previous": "16",
      "child": null,
      "parent": "9"
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
      "previous": "34",
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
    "27": {
      "id": "27",
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
      "next": "6",
      "previous": "13",
      "child": "67",
      "parent": "9"
    },
    "28": {
      "id": "28",
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
      "next": "30",
      "previous": "67",
      "child": "29",
      "parent": "27"
    },
    "29": {
      "id": "29",
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
      "parent": "28"
    },
    "30": {
      "id": "30",
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
      "next": "32",
      "previous": "28",
      "child": "71",
      "parent": "27"
    },
    "31": {
      "id": "31",
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
      "next": "72",
      "previous": "71",
      "child": null,
      "parent": "30"
    },
    "32": {
      "id": "32",
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
      "next": "33",
      "previous": "30",
      "child": null,
      "parent": "27"
    },
    "33": {
      "id": "33",
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
      "previous": "32",
      "child": null,
      "parent": "27"
    },
    "34": {
      "id": "34",
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
      "next": "22",
      "previous": "14",
      "child": "35",
      "parent": "9"
    },
    "35": {
      "id": "35",
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
      "next": "36",
      "previous": null,
      "child": null,
      "parent": "34"
    },
    "36": {
      "id": "36",
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
      "next": "37",
      "previous": "35",
      "child": null,
      "parent": "34"
    },
    "37": {
      "id": "37",
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
      "next": "38",
      "previous": "36",
      "child": null,
      "parent": "34"
    },
    "38": {
      "id": "38",
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
      "previous": "37",
      "child": null,
      "parent": "34"
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
    "46": {
      "id": "46",
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
      "parent": "47"
    },
    "47": {
      "id": "47",
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
      "next": "52",
      "previous": "51",
      "child": "46",
      "parent": "9"
    },
    "50": {
      "id": "50",
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
      "parent": "51"
    },
    "51": {
      "id": "51",
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
      "next": "47",
      "previous": "60",
      "child": "50",
      "parent": "9"
    },
    "52": {
      "id": "52",
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
      "next": "13",
      "previous": "47",
      "child": "53",
      "parent": "9"
    },
    "53": {
      "id": "53",
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
      "parent": "52"
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
    "59": {
      "id": "59",
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
      "next": "17",
      "previous": "10",
      "child": null,
      "parent": "9"
    },
    "60": {
      "id": "60",
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
      "next": "51",
      "previous": "69",
      "child": null,
      "parent": "9"
    },
    "61": {
      "id": "61",
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
      "next": "10",
      "previous": "21",
      "child": null,
      "parent": "9"
    },
    "62": {
      "id": "62",
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
      "next": "64",
      "previous": null,
      "child": null,
      "parent": "15"
    },
    "63": {
      "id": "63",
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
      "previous": "64",
      "child": null,
      "parent": "15"
    },
    "64": {
      "id": "64",
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
      "next": "63",
      "previous": "62",
      "child": null,
      "parent": "15"
    },
    "65": {
      "id": "65",
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
      "next": "69",
      "previous": "15",
      "child": null,
      "parent": "9"
    },
    "66": {
      "id": "66",
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
      "previous": "70",
      "child": null,
      "parent": "67"
    },
    "67": {
      "id": "67",
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
      "next": "28",
      "previous": null,
      "child": "70",
      "parent": "27"
    },
    "69": {
      "id": "69",
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
      "next": "60",
      "previous": "65",
      "child": null,
      "parent": "9"
    },
    "70": {
      "id": "70",
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
      "next": "66",
      "previous": null,
      "child": null,
      "parent": "67"
    },
    "71": {
      "id": "71",
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
      "next": "31",
      "previous": null,
      "child": null,
      "parent": "30"
    },
    "72": {
      "id": "72",
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
      "previous": "31",
      "child": null,
      "parent": "30"
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
      "next": "4",
      "previous": "79",
      "child": "81",
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
  "filename": "index_old",
  "pageTitle": "BlissUI - Inspired App Platform"
}
if(typeof module !== "undefined") module.exports = blissProject;
