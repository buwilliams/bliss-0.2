var blissProject = {
  "name": "Demo",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 42,
  "rootId": "1",
  "externalCss": [
    "https://fonts.googleapis.com/css?family=Roboto",
    "node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js",
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js"
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
      "name": "bootstrap",
      "version": "3.3.7"
    },
    {
      "name": "jquery",
      "version": "3.2.1"
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
      "name": "color1",
      "value": "#C4D6B0"
    },
    {
      "name": "color2",
      "value": "#477998"
    },
    {
      "name": "color3",
      "value": "#291F1E"
    },
    {
      "name": "color5",
      "value": "#F64740"
    },
    {
      "name": "color6",
      "value": "#A3333D"
    },
    {
      "name": "color4",
      "value": "#DABFFF"
    },
    {
      "name": "panelPadding",
      "value": "30px 15px"
    },
    {
      "name": "color1text",
      "value": "#494e44"
    },
    {
      "name": "color2text",
      "value": "#eef9ff"
    },
    {
      "name": "color3text",
      "value": "#ffe0db"
    },
    {
      "name": "color4text",
      "value": "#534b5e"
    },
    {
      "name": "color5text",
      "value": "#6a2923"
    },
    {
      "name": "color6text",
      "value": "#4e1f22"
    }
  ],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "font-size",
          "value": "14pt"
        },
        {
          "name": "font-family",
          "value": "'Roboto', sans-serif"
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
      "name": "Demo BlissUI",
      "element": "div",
      "text": null,
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
      "child": "2",
      "parent": null
    },
    "2": {
      "id": "2",
      "name": "Row 1 - Title",
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
      "next": "4",
      "previous": null,
      "child": "11",
      "parent": "1"
    },
    "3": {
      "id": "3",
      "name": "Column 1 - Speed",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-3"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$color1"
            },
            {
              "name": "padding",
              "value": "$panelPadding"
            },
            {
              "name": "font-weight",
              "value": "bold"
            },
            {
              "name": "color",
              "value": "$color1text"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "6",
      "previous": null,
      "child": "15",
      "parent": "4"
    },
    "4": {
      "id": "4",
      "name": "Row 2 - Benefits",
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
              "name": "margin-top",
              "value": "15px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "9",
      "previous": "2",
      "child": "3",
      "parent": "1"
    },
    "5": {
      "id": "5",
      "name": "Column 3 - Power",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-3"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$color3"
            },
            {
              "name": "padding",
              "value": "$panelPadding"
            },
            {
              "name": "color",
              "value": "$color3text"
            },
            {
              "name": "font-weight",
              "value": "bold"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "10",
      "previous": "6",
      "child": "27",
      "parent": "4"
    },
    "6": {
      "id": "6",
      "name": "Column 2 - Simplicity",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-3"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$color2"
            },
            {
              "name": "padding",
              "value": "$panelPadding"
            },
            {
              "name": "font-weight",
              "value": "bold"
            },
            {
              "name": "color",
              "value": "$color2text"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "5",
      "previous": "3",
      "child": "20",
      "parent": "4"
    },
    "7": {
      "id": "7",
      "name": "Column 4",
      "element": "div",
      "text": "",
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
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$color5"
            },
            {
              "name": "padding",
              "value": "$panelPadding"
            },
            {
              "name": "color",
              "value": "$color5text"
            },
            {
              "name": "font-weight",
              "value": "bold"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "36",
      "parent": "9"
    },
    "8": {
      "id": "8",
      "name": "Column 6",
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
              "name": "background-color",
              "value": "$color6"
            },
            {
              "name": "padding",
              "value": "$panelPadding"
            },
            {
              "name": "color",
              "value": "$color6text"
            },
            {
              "name": "font-weight",
              "value": "bold"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "37",
      "parent": "14"
    },
    "9": {
      "id": "9",
      "name": "Row 3 - Play",
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
      "next": "14",
      "previous": "4",
      "child": "7",
      "parent": "1"
    },
    "10": {
      "id": "10",
      "name": "Column 5",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col-md-3"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$color4"
            },
            {
              "name": "padding",
              "value": "$panelPadding"
            },
            {
              "name": "color",
              "value": "$color4text"
            },
            {
              "name": "font-weight",
              "value": "bold"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "5",
      "child": "35",
      "parent": "4"
    },
    "11": {
      "id": "11",
      "name": "Intro Container",
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
      "child": "12",
      "parent": "2"
    },
    "12": {
      "id": "12",
      "name": "Header",
      "element": "h1",
      "text": "BlissUI",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "13",
      "parent": "11"
    },
    "13": {
      "id": "13",
      "name": "subtitle",
      "element": "small",
      "text": " User interfaces in the cloud.",
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
      "parent": "12"
    },
    "14": {
      "id": "14",
      "name": "Row 4 - Play",
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
      "previous": "9",
      "child": "8",
      "parent": "1"
    },
    "15": {
      "id": "15",
      "name": "Header",
      "element": "div",
      "text": "Speed",
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
      "next": "16",
      "previous": null,
      "child": null,
      "parent": "3"
    },
    "16": {
      "id": "16",
      "name": "List",
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
      "previous": "15",
      "child": "17",
      "parent": "3"
    },
    "17": {
      "id": "17",
      "name": "dev env",
      "element": "li",
      "text": "No development environment setup",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "38",
      "previous": null,
      "child": null,
      "parent": "16"
    },
    "18": {
      "id": "18",
      "name": "ui framework",
      "element": "li",
      "text": "Small learning curve",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "19",
      "child": null,
      "parent": "16"
    },
    "19": {
      "id": "19",
      "name": "marketplace",
      "element": "li",
      "text": "Marketplace for reusable components and themes",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "18",
      "previous": "38",
      "child": null,
      "parent": "16"
    },
    "20": {
      "id": "20",
      "name": "Header",
      "element": "div",
      "text": "Simplicity",
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
      "next": "21",
      "previous": null,
      "child": null,
      "parent": "6"
    },
    "21": {
      "id": "21",
      "name": "List",
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
      "previous": "20",
      "child": "22",
      "parent": "6"
    },
    "22": {
      "id": "22",
      "name": "clean ui",
      "element": "li",
      "text": "Clean UI where designers can be involved",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "23",
      "previous": null,
      "child": null,
      "parent": "21"
    },
    "23": {
      "id": "23",
      "name": "properties",
      "element": "li",
      "text": "Elements have properties",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "24",
      "previous": "22",
      "child": null,
      "parent": "21"
    },
    "24": {
      "id": "24",
      "name": "javascript",
      "element": "li",
      "text": "Elements also have JavaScript",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "25",
      "previous": "23",
      "child": null,
      "parent": "21"
    },
    "25": {
      "id": "25",
      "name": "simple data management",
      "element": "li",
      "text": "Easy data management",
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
      "parent": "21"
    },
    "26": {
      "id": "26",
      "name": "all you need is a browser",
      "element": "li",
      "text": "All you need is a browser",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "25",
      "child": null,
      "parent": "21"
    },
    "27": {
      "id": "27",
      "name": "Header",
      "element": "div",
      "text": "Power",
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
      "next": "28",
      "previous": null,
      "child": null,
      "parent": "5"
    },
    "28": {
      "id": "28",
      "name": "List",
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
      "previous": "27",
      "child": "30",
      "parent": "5"
    },
    "29": {
      "id": "29",
      "name": "move elements",
      "element": "li",
      "text": "Move elements anytime",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "31",
      "previous": "30",
      "child": null,
      "parent": "28"
    },
    "30": {
      "id": "30",
      "name": "real stateful",
      "element": "li",
      "text": "Real stateful UIs",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "29",
      "previous": null,
      "child": null,
      "parent": "28"
    },
    "31": {
      "id": "31",
      "name": "supports node modules",
      "element": "li",
      "text": "Supports node modules (open source)",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "32",
      "previous": "29",
      "child": null,
      "parent": "28"
    },
    "32": {
      "id": "32",
      "name": "css variables",
      "element": "li",
      "text": "CSS variables",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "34",
      "previous": "31",
      "child": null,
      "parent": "28"
    },
    "33": {
      "id": "33",
      "name": "Bootstrapped",
      "element": "li",
      "text": "Bootstrapped architecture",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "34",
      "child": null,
      "parent": "28"
    },
    "34": {
      "id": "34",
      "name": "Mobile ready",
      "element": "li",
      "text": "Mobile ready",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "33",
      "previous": "32",
      "child": null,
      "parent": "28"
    },
    "35": {
      "id": "35",
      "name": "text",
      "element": "div",
      "text": "Column 5",
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
      "parent": "10"
    },
    "36": {
      "id": "36",
      "name": "text",
      "element": "div",
      "text": "Column 4",
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
      "parent": "7"
    },
    "37": {
      "id": "37",
      "name": "text",
      "element": "div",
      "text": "Column 6",
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
      "parent": "8"
    },
    "38": {
      "id": "38",
      "name": "re-usable components",
      "element": "li",
      "text": "Make your own re-usable components",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "19",
      "previous": "17",
      "child": null,
      "parent": "16"
    }
  }
}
if(typeof module !== "undefined") module.exports = blissProject;
