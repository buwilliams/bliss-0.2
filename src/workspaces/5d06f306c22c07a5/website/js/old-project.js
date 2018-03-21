var blissProject = {
  "name": "bliss_ui_website_2",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 41,
  "rootId": "1",
  "externalCss": [
    "https://fonts.googleapis.com/css?family=Lato"
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
  "cssVars": [],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "background-image",
          "value": "url(\"https://www.transparenttextures.com/patterns/arabesque.png\"), linear-gradient(to right, #1fc8db, #2cb5e8)"
        },
        {
          "name": "color",
          "value": "white"
        },
        {
          "name": "font-family",
          "value": "'Lato', sans-serif;"
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
    }
  ],
  "load": [
    "init"
  ],
  "components": {
    "1": {
      "id": "1",
      "name": "bliss_ui_website_2",
      "element": "div",
      "text": null,
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
              "value": "rgba(0, 0, 0, 0.2)"
            },
            {
              "name": "margin",
              "value": "10px 0 0 0"
            },
            {
              "name": "padding",
              "value": "20px 0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "9",
      "previous": null,
      "child": "8",
      "parent": "1"
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
      "previous": null,
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
      "previous": "15",
      "child": null,
      "parent": "9"
    },
    "8": {
      "id": "8",
      "name": "new_8",
      "element": "small",
      "text": "App Creation Toolkit",
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
      "name": "content",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "content"
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
              "name": "margin",
              "value": "20px 15%"
            },
            {
              "name": "padding",
              "value": "20px"
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
      "previous": "2",
      "child": "4",
      "parent": "1"
    },
    "10": {
      "id": "10",
      "name": "The niche",
      "element": "h2",
      "text": "The niche",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "17",
      "previous": "21",
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
      "previous": "22",
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
      "previous": "27",
      "child": null,
      "parent": "9"
    },
    "15": {
      "id": "15",
      "name": "para",
      "element": "p",
      "text": "Simply put, it’s a webapp creation toolkit. It presently builds React.js applications and pairs nicely with Firebase. But these are just the technical details. What’s interesting is that you don’t need to worry much about that. BlissUI takes standard technologies such as HTML, CSS, JavaScript, React, Data Management and puts them into a nice visual tool so that you can focus on creating and experimenting. That’s the kind of environment I want to work in.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "6",
      "previous": "4",
      "child": null,
      "parent": "9"
    },
    "16": {
      "id": "16",
      "name": "para",
      "element": "p",
      "text": "Years ago, we have nice visual tools for creating applications. I remember back when if you wanted a button in your program, you dragged it there. You could edit the properties of it in some visual tool. Those tools were before web apps surfaced. It feels that we’ve taken a step backwards really. Now everything is code, code, and more code. I wanted to bring back that visual experience and see just how nice it could really be. A harmony of code and visual tooling.",
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
      "text": "BlissUI helps you rapidly prototype and experiment with the ideas you have. You can realistically build and publish an app in a few short minutes. So it’s a great way to explore your ideas. Through my research I haven’t been able to find anything quite like it. It’s actually a lot of fun to use.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "11",
      "previous": "10",
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
      "next": "22",
      "previous": "11",
      "child": null,
      "parent": "9"
    },
    "21": {
      "id": "21",
      "name": "para",
      "element": "p",
      "text": "Instead of a general purpose IDE, BlissUI gives you a full featured toolkit for building web apps.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "10",
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
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "13",
      "previous": "18",
      "child": "23",
      "parent": "9"
    },
    "23": {
      "id": "23",
      "name": "span",
      "element": "span",
      "text": "Feel free to reach out for help - ",
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
      "text": "bliss@blissui.com",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "mailto: bliss@blissui.com"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "25",
      "previous": "23",
      "child": null,
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
      "text": "@buwilliams",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "bliss@blissui.com"
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
      "child": null,
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
      "next": "14",
      "previous": "13",
      "child": "28",
      "parent": "9"
    },
    "28": {
      "id": "28",
      "name": "li",
      "element": "li",
      "text": "Watch the video for  ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "30",
      "previous": null,
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
      "next": null,
      "previous": null,
      "child": null,
      "parent": "28"
    },
    "30": {
      "id": "30",
      "name": "li",
      "element": "li",
      "text": "Create your ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "32",
      "previous": "28",
      "child": "31",
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
      "next": null,
      "previous": null,
      "child": null,
      "parent": "30"
    },
    "32": {
      "id": "32",
      "name": "li",
      "element": "li",
      "text": "Build something fun",
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
      "text": "Publish to share with friends",
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
      "next": null,
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
    }
  },
  "filename": "old",
  "pageTitle": "Old Website - BlissUI"
}
if(typeof module !== "undefined") module.exports = blissProject;
