var blissProject = {
  "name": "Bliss Docs",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 44,
  "rootId": "1",
  "externalCss": [
    "node_modules/semantic-ui/dist/semantic.min.css"
  ],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js",
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/semantic-ui/dist/semantic.min.js"
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
      "name": "semantic-ui",
      "version": "2.2.13"
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
          "value": "ui grid container"
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
          "value": "ui secondary vertical pointing menu"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "3",
      "parent": "22"
    },
    "3": {
      "id": "3",
      "name": "Introducing Bliss UI",
      "element": "a",
      "text": "Introducing Bliss UI",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#introducing"
        },
        {
          "name": "class",
          "value": "item active"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "36",
      "previous": null,
      "child": null,
      "parent": "2"
    },
    "4": {
      "id": "4",
      "name": "Workspaces",
      "element": "a",
      "text": "Workspaces",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "5",
      "previous": "7",
      "child": null,
      "parent": "2"
    },
    "5": {
      "id": "5",
      "name": "Projects",
      "element": "a",
      "text": "Projects",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "6",
      "previous": "4",
      "child": null,
      "parent": "2"
    },
    "6": {
      "id": "6",
      "name": "Components",
      "element": "a",
      "text": "Components",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "8",
      "previous": "5",
      "child": null,
      "parent": "2"
    },
    "7": {
      "id": "7",
      "name": "Hosting",
      "element": "a",
      "text": "Hosting",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "4",
      "previous": "36",
      "child": null,
      "parent": "2"
    },
    "8": {
      "id": "8",
      "name": "Elements",
      "element": "a",
      "text": "Elements",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "10",
      "previous": "6",
      "child": null,
      "parent": "2"
    },
    "10": {
      "id": "10",
      "name": "CSS",
      "element": "a",
      "text": "CSS",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "17",
      "previous": "8",
      "child": null,
      "parent": "2"
    },
    "11": {
      "id": "11",
      "name": "JavaScript",
      "element": "a",
      "text": "JavaScript",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "20",
      "previous": "17",
      "child": null,
      "parent": "2"
    },
    "12": {
      "id": "12",
      "name": "Assets",
      "element": "a",
      "text": "Assets",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "13",
      "previous": "20",
      "child": null,
      "parent": "2"
    },
    "13": {
      "id": "13",
      "name": "Properties",
      "element": "a",
      "text": "Properties",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "18",
      "previous": "12",
      "child": null,
      "parent": "2"
    },
    "14": {
      "id": "14",
      "name": "Node Modules",
      "element": "a",
      "text": "Node Modules",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "15",
      "previous": "19",
      "child": null,
      "parent": "2"
    },
    "15": {
      "id": "15",
      "name": "Page Load",
      "element": "a",
      "text": "Page Load",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "16",
      "previous": "14",
      "child": null,
      "parent": "2"
    },
    "16": {
      "id": "16",
      "name": "Settings",
      "element": "a",
      "text": "Settings",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "21",
      "previous": "15",
      "child": null,
      "parent": "2"
    },
    "17": {
      "id": "17",
      "name": "CSS  Variables",
      "element": "a",
      "text": "CSS  Variables",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "11",
      "previous": "10",
      "child": null,
      "parent": "2"
    },
    "18": {
      "id": "18",
      "name": "Global JavaScript",
      "element": "a",
      "text": "Global JavaScript",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "19",
      "previous": "13",
      "child": null,
      "parent": "2"
    },
    "19": {
      "id": "19",
      "name": "Global CSS",
      "element": "a",
      "text": "Global JavaScript",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "14",
      "previous": "18",
      "child": null,
      "parent": "2"
    },
    "20": {
      "id": "20",
      "name": "Data Editor",
      "element": "a",
      "text": "Data Editor",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "12",
      "previous": "11",
      "child": null,
      "parent": "2"
    },
    "21": {
      "id": "21",
      "name": "Bliss JavaScript Reference",
      "element": "a",
      "text": "Bliss JavaScript Reference",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "16",
      "child": null,
      "parent": "2"
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
          "value": "four wide column"
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
          "value": "twelve wide column"
        }
      ],
      "css": [],
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
      "attributes": [
        {
          "name": "class",
          "value": "ui header dividing"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "25",
      "previous": "31",
      "child": null,
      "parent": "30"
    },
    "25": {
      "id": "25",
      "name": "copy 1",
      "element": "p",
      "text": "Hello. My name is Buddy, I'm the creator of Bliss UI and I'm very proud to share this labor of love with you. Let me start by sharing the inspiration for Bliss UI, in 2012, Bret Victor gave a talk entitled, \"Inventing on Principal\", in his talk he suggests that \"creators need an immediate connection with their creations.\" He said that as you work you need see what you're making right then as if you were drawing on paper. On paper, you can see what you draw instantly. This is not true for the UI/UX in web apps.",
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
      "text": "These docs are not finished yet. I expect to be finished with them by the end of September 2017.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "33",
      "child": null,
      "parent": "32"
    },
    "30": {
      "id": "30",
      "name": "Introducing Bliss UI Content",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "32",
      "previous": null,
      "child": "31",
      "parent": "23"
    },
    "31": {
      "id": "31",
      "name": "link",
      "element": "a",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "name",
          "value": "introducing"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "24",
      "previous": null,
      "child": null,
      "parent": "30"
    },
    "32": {
      "id": "32",
      "name": "Coming Soon Content",
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
      "previous": "30",
      "child": "34",
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
      "attributes": [
        {
          "name": "class",
          "value": "ui header dividing"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "29",
      "previous": "34",
      "child": null,
      "parent": "32"
    },
    "34": {
      "id": "34",
      "name": "link",
      "element": "a",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "name",
          "value": "comingsoon"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "33",
      "previous": null,
      "child": null,
      "parent": "32"
    },
    "36": {
      "id": "36",
      "name": "Getting Started",
      "element": "a",
      "text": "Getting Started",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#comingsoon"
        },
        {
          "name": "class",
          "value": "item"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "7",
      "previous": "3",
      "child": null,
      "parent": "2"
    },
    "38": {
      "id": "38",
      "name": "header",
      "element": "h1",
      "text": "Bliss UI Docs",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "sixteen wide column"
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
              "name": "margin-top",
              "value": "1rem"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    alert('hello there')\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "40"
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
          "value": "ui row"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "41",
      "previous": null,
      "child": "38",
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
          "value": "ui row"
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
    }
  },
  "schemas": [
    {
      "path": "/demo",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {'list':['One','Two']}\n  return newData;\n}"
        }
      ]
    }
  ]
}
if(typeof module !== "undefined") module.exports = blissProject;
