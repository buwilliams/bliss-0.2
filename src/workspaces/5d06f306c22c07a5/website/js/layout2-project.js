var blissProject = {
  "name": "layout2",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "layout": "",
  "nextId": 34,
  "rootId": "1",
  "externalCss": [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://use.fontawesome.com/releases/v5.0.9/css/all.css"
  ],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js",
    "https://code.jquery.com/jquery-3.2.1.slim.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
  ],
  "schemas": [],
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
      "name": "orange",
      "value": "#ff8700"
    }
  ],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "background-color",
          "value": "#fefff4"
        },
        {
          "name": "font-size",
          "value": "16px"
        }
      ]
    },
    {
      "selector": "a",
      "properties": [
        {
          "name": "color",
          "value": "$orange"
        },
        {
          "name": "text-decoration",
          "value": "none"
        },
        {
          "name": "text-transform",
          "value": "uppercase"
        },
        {
          "name": "font-size",
          "value": "0.8em"
        }
      ]
    },
    {
      "selector": "a:hover",
      "properties": [
        {
          "name": "color",
          "value": "$orange"
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
      "name": "layout2",
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
    "3": {
      "id": "3",
      "name": "nav",
      "element": "nav",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "navbar nav-down navbar-expand-lg navbar-transparent"
        }
      ],
      "dynamicAttributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding-top",
              "value": "25px"
            }
          ]
        }
      ],
      "js": [],
      "next": "32",
      "previous": null,
      "child": "26",
      "parent": "1"
    },
    "4": {
      "id": "4",
      "name": "a",
      "element": "a",
      "text": "Bliss UI",
      "attributes": [
        {
          "name": "class",
          "value": "navbar-brand"
        },
        {
          "name": "href",
          "value": "#"
        }
      ],
      "dynamicAttributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "0.8em"
            }
          ]
        }
      ],
      "js": [],
      "next": "5",
      "previous": null,
      "child": null,
      "parent": "26"
    },
    "5": {
      "id": "5",
      "name": "button",
      "element": "button",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "navbar-toggler"
        },
        {
          "name": "type",
          "value": "button"
        },
        {
          "name": "data-toggle",
          "value": "collapse"
        },
        {
          "name": "data-target",
          "value": "#navbarSupportedContent"
        },
        {
          "name": "aria-controls",
          "value": "navbarSupportedContent"
        },
        {
          "name": "aria-expanded",
          "value": "false"
        },
        {
          "name": "aria-label",
          "value": "Toggle navigation"
        }
      ],
      "dynamicAttributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            }
          ]
        }
      ],
      "js": [],
      "next": "7",
      "previous": "4",
      "child": "27",
      "parent": "26"
    },
    "7": {
      "id": "7",
      "name": "div",
      "element": "div",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "collapse navbar-collapse"
        },
        {
          "name": "id",
          "value": "navbarSupportedContent"
        }
      ],
      "dynamicAttributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "justify-content",
              "value": "flex-end"
            }
          ]
        }
      ],
      "js": [],
      "next": null,
      "previous": "5",
      "child": "8",
      "parent": "26"
    },
    "8": {
      "id": "8",
      "name": "ul",
      "element": "ul",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "navbar-nav"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": null,
      "child": "12",
      "parent": "7"
    },
    "9": {
      "id": "9",
      "name": "li",
      "element": "li",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "nav-item active"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": "28",
      "previous": "12",
      "child": "10",
      "parent": "8"
    },
    "10": {
      "id": "10",
      "name": "a",
      "element": "a",
      "text": "Docs",
      "attributes": [
        {
          "name": "class",
          "value": "nav-link"
        },
        {
          "name": "href",
          "value": "#"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": null,
      "child": "11",
      "parent": "9"
    },
    "11": {
      "id": "11",
      "name": "span",
      "element": "span",
      "text": "(current)",
      "attributes": [
        {
          "name": "class",
          "value": "sr-only"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "10"
    },
    "12": {
      "id": "12",
      "name": "li",
      "element": "li",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "nav-item"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": "9",
      "previous": null,
      "child": "13",
      "parent": "8"
    },
    "13": {
      "id": "13",
      "name": "a",
      "element": "a",
      "text": "Browse",
      "attributes": [
        {
          "name": "class",
          "value": "nav-link"
        },
        {
          "name": "href",
          "value": "#"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "12"
    },
    "26": {
      "id": "26",
      "name": "container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "container"
        }
      ],
      "css": [
        {
          "selector": "$id a",
          "properties": [
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
      "child": "4",
      "parent": "3"
    },
    "27": {
      "id": "27",
      "name": "bars icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fas fa-bars"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "color",
              "value": "$orange"
            },
            {
              "name": "font-size",
              "value": "0.8em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "5"
    },
    "28": {
      "id": "28",
      "name": "li",
      "element": "li",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "nav-item active"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": "9",
      "child": "29",
      "parent": "8"
    },
    "29": {
      "id": "29",
      "name": "a",
      "element": "a",
      "text": "Sign in",
      "attributes": [
        {
          "name": "class",
          "value": "nav-link"
        },
        {
          "name": "href",
          "value": "#"
        }
      ],
      "dynamicAttributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding",
              "value": "0.5em 1em"
            },
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "background-color",
              "value": "$orange"
            },
            {
              "name": "border-radius",
              "value": "1em"
            }
          ]
        }
      ],
      "js": [],
      "next": null,
      "previous": null,
      "child": "30",
      "parent": "28"
    },
    "30": {
      "id": "30",
      "name": "span",
      "element": "span",
      "text": "(current)",
      "attributes": [
        {
          "name": "class",
          "value": "sr-only"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "29"
    },
    "31": {
      "id": "31",
      "name": "footer",
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
              "name": "background-color",
              "value": "#333"
            },
            {
              "name": "min-height",
              "value": "5em"
            },
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
      "previous": "32",
      "child": null,
      "parent": "1"
    },
    "32": {
      "id": "32",
      "name": "content",
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
              "name": "min-height",
              "value": "500px"
            },
            {
              "name": "padding-top",
              "value": "25px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "31",
      "previous": "3",
      "child": "33",
      "parent": "1"
    },
    "33": {
      "id": "33",
      "name": "hero",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "container-fluid"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "#fff"
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
      "next": null,
      "previous": null,
      "child": null,
      "parent": "32"
    }
  },
  "filename": "layout2",
  "pageTitle": "layout2"
}
if(typeof module !== "undefined") module.exports = blissProject;
