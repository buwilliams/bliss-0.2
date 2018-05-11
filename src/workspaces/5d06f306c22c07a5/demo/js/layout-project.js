var blissProject = {
  "name": "layout",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "layout": "",
  "nextId": 33,
  "rootId": "1",
  "externalCss": [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
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
  "cssVars": [],
  "css": [],
  "load": [
    "init"
  ],
  "components": {
    "1": {
      "id": "1",
      "name": "layout",
      "element": "div",
      "text": "",
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
      "name": "nav",
      "element": "nav",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "navbar navbar-expand-lg navbar-light"
        }
      ],
      "dynamicAttributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "#780403"
            },
            {
              "name": "color",
              "value": "white"
            }
          ]
        }
      ],
      "js": [],
      "next": "29",
      "previous": null,
      "child": "3",
      "parent": "1"
    },
    "3": {
      "id": "3",
      "name": "a",
      "element": "a",
      "text": "Chicken Fried",
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
              "name": "color",
              "value": "white"
            }
          ]
        }
      ],
      "js": [],
      "next": "4",
      "previous": null,
      "child": null,
      "parent": "2"
    },
    "4": {
      "id": "4",
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
              "name": "color",
              "value": "white"
            },
            {
              "name": "border",
              "value": "solid 1px white"
            }
          ]
        }
      ],
      "js": [],
      "next": "6",
      "previous": "3",
      "child": "5",
      "parent": "2"
    },
    "5": {
      "id": "5",
      "name": "span",
      "element": "span",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "navbar-toggler-icon"
        }
      ],
      "dynamicAttributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "color",
              "value": "white"
            }
          ]
        }
      ],
      "js": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "4"
    },
    "6": {
      "id": "6",
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
      "css": [],
      "js": [],
      "next": null,
      "previous": "4",
      "child": "7",
      "parent": "2"
    },
    "7": {
      "id": "7",
      "name": "ul",
      "element": "ul",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "navbar-nav mr-auto"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": "22",
      "previous": null,
      "child": "8",
      "parent": "6"
    },
    "8": {
      "id": "8",
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
      "next": "11",
      "previous": null,
      "child": "9",
      "parent": "7"
    },
    "9": {
      "id": "9",
      "name": "a",
      "element": "a",
      "text": "Home",
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
      "child": "10",
      "parent": "8"
    },
    "10": {
      "id": "10",
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
      "parent": "9"
    },
    "11": {
      "id": "11",
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
      "next": "13",
      "previous": "8",
      "child": "12",
      "parent": "7"
    },
    "12": {
      "id": "12",
      "name": "a",
      "element": "a",
      "text": "About",
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
      "parent": "11"
    },
    "13": {
      "id": "13",
      "name": "li",
      "element": "li",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "nav-item dropdown"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": "20",
      "previous": "11",
      "child": "14",
      "parent": "7"
    },
    "14": {
      "id": "14",
      "name": "a",
      "element": "a",
      "text": "Locations",
      "attributes": [
        {
          "name": "class",
          "value": "nav-link dropdown-toggle"
        },
        {
          "name": "href",
          "value": "#"
        },
        {
          "name": "id",
          "value": "navbarDropdown"
        },
        {
          "name": "role",
          "value": "button"
        },
        {
          "name": "data-toggle",
          "value": "dropdown"
        },
        {
          "name": "aria-haspopup",
          "value": "true"
        },
        {
          "name": "aria-expanded",
          "value": "false"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": "15",
      "previous": null,
      "child": null,
      "parent": "13"
    },
    "15": {
      "id": "15",
      "name": "div",
      "element": "div",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "dropdown-menu"
        },
        {
          "name": "aria-labelledby",
          "value": "navbarDropdown"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": "14",
      "child": "16",
      "parent": "13"
    },
    "16": {
      "id": "16",
      "name": "a",
      "element": "a",
      "text": "Atlanta, Ga (Midtown)",
      "attributes": [
        {
          "name": "class",
          "value": "dropdown-item"
        },
        {
          "name": "href",
          "value": "#"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": "17",
      "previous": null,
      "child": null,
      "parent": "15"
    },
    "17": {
      "id": "17",
      "name": "a",
      "element": "a",
      "text": "Locust Grove, GA",
      "attributes": [
        {
          "name": "class",
          "value": "dropdown-item"
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
      "previous": "16",
      "child": null,
      "parent": "15"
    },
    "20": {
      "id": "20",
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
      "next": null,
      "previous": "13",
      "child": "21",
      "parent": "7"
    },
    "21": {
      "id": "21",
      "name": "a",
      "element": "a",
      "text": "Contact",
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
      "parent": "20"
    },
    "22": {
      "id": "22",
      "name": "form",
      "element": "form",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "form-inline my-2 my-lg-0"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": "7",
      "child": "23",
      "parent": "6"
    },
    "23": {
      "id": "23",
      "name": "input",
      "element": "input",
      "text": "",
      "attributes": [
        {
          "name": "class",
          "value": "form-control mr-sm-2"
        },
        {
          "name": "type",
          "value": "search"
        },
        {
          "name": "placeholder",
          "value": "Search"
        },
        {
          "name": "aria-label",
          "value": "Search"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": "24",
      "previous": null,
      "child": null,
      "parent": "22"
    },
    "24": {
      "id": "24",
      "name": "button",
      "element": "button",
      "text": "Search",
      "attributes": [
        {
          "name": "class",
          "value": "btn btn-outline-success my-2 my-sm-0"
        },
        {
          "name": "type",
          "value": "submit"
        }
      ],
      "dynamicAttributes": [],
      "css": [],
      "js": [],
      "next": null,
      "previous": "23",
      "child": null,
      "parent": "22"
    },
    "25": {
      "id": "25",
      "name": "first row",
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
              "name": "background-image",
              "value": "url(https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/5/27/0/0125629_03_chicken-in-skillet_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371589386937.jpeg)"
            },
            {
              "name": "background-size",
              "value": "cover"
            },
            {
              "name": "min-height",
              "value": "600px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "27",
      "previous": null,
      "child": "28",
      "parent": "29"
    },
    "27": {
      "id": "27",
      "name": "row",
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
      "previous": "25",
      "child": "31",
      "parent": "29"
    },
    "28": {
      "id": "28",
      "name": "new_28",
      "element": "div",
      "text": "World's Best Fried Chicken",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "color",
              "value": "white"
            },
            {
              "name": "font-size",
              "value": "3em"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "background",
              "value": "rgba(0, 0, 0, 0.5)"
            },
            {
              "name": "margin",
              "value": "1em"
            },
            {
              "name": "border-radius",
              "value": "15px"
            },
            {
              "name": "padding",
              "value": "2em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "25"
    },
    "29": {
      "id": "29",
      "name": "content",
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
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "2",
      "child": "25",
      "parent": "1"
    },
    "30": {
      "id": "30",
      "name": "header",
      "element": "h1",
      "text": "World's Best Fried Chicken",
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
              "value": "#333"
            },
            {
              "name": "font-size",
              "value": "2em"
            },
            {
              "name": "text-align",
              "value": "center"
            },
            {
              "name": "margin ",
              "value": "1em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "32",
      "previous": null,
      "child": null,
      "parent": "31"
    },
    "31": {
      "id": "31",
      "name": "new_31",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "col"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "30",
      "parent": "27"
    },
    "32": {
      "id": "32",
      "name": "paragraph",
      "element": "p",
      "text": "Welcome the home of the best freakin' fried chicken that your momma never made.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "30",
      "child": null,
      "parent": "31"
    }
  },
  "filename": "layout",
  "pageTitle": "layout"
}
if(typeof module !== "undefined") module.exports = blissProject;
