var blissProject = {
  "name": "website_v2",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "layout": "",
  "nextId": 61,
  "rootId": "1",
  "externalCss": [
    "https://fonts.googleapis.com/css?family=Pacifico|Quicksand|Yanone+Kaffeesatz"
  ],
  "externalJs": [
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js"
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
      "name": "blue",
      "value": "#0c5c88"
    },
    {
      "name": "red",
      "value": "#db2b39"
    },
    {
      "name": "yellow",
      "value": "#ffd166"
    },
    {
      "name": "green",
      "value": "#06d6a0"
    },
    {
      "name": "bluelight",
      "value": "#44a1a0"
    },
    {
      "name": "white",
      "value": "#FFFFFF"
    },
    {
      "name": "black",
      "value": "#999999"
    },
    {
      "name": "bluedark",
      "value": "#073d5a"
    },
    {
      "name": "maxwidth",
      "value": "1000px"
    }
  ],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "padding",
          "value": "0"
        },
        {
          "name": "margin",
          "value": "0"
        },
        {
          "name": "color",
          "value": "#333333"
        },
        {
          "name": "font-family",
          "value": "'Quicksand', sans-serif"
        },
        {
          "name": "font-size",
          "value": "18px"
        },
        {
          "name": "background-image",
          "value": "url(https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble-outline.png)"
        },
        {
          "name": "background-repeat",
          "value": "repeat"
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
      "name": "website_v2",
      "element": "div",
      "text": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "6",
      "parent": null
    },
    "2": {
      "id": "2",
      "name": "BlissUI",
      "element": "div",
      "text": "BlissUI - ",
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
      "parent": "58"
    },
    "4": {
      "id": "4",
      "name": "header",
      "element": "h1",
      "text": "Building web apps shouldn’t be a pain.",
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
      "next": "5",
      "previous": null,
      "child": null,
      "parent": "14"
    },
    "5": {
      "id": "5",
      "name": "subheader",
      "element": "h2",
      "text": "So, why are we making apps the same old way?",
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
      "next": null,
      "previous": "4",
      "child": null,
      "parent": "14"
    },
    "6": {
      "id": "6",
      "name": "header container",
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
              "name": "justify-content",
              "value": "space-between"
            },
            {
              "name": "padding",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$bluedark"
            },
            {
              "name": "position",
              "value": "fixed"
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
              "name": "right",
              "value": "0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "14",
      "previous": null,
      "child": "58",
      "parent": "1"
    },
    "7": {
      "id": "7",
      "name": "menu container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        },
        {
          "selector": "$id > a",
          "properties": [
            {
              "name": "margin",
              "value": "0.5em"
            },
            {
              "name": "text-decoration",
              "value": "none"
            },
            {
              "name": "background-color",
              "value": "$red"
            },
            {
              "name": "padding",
              "value": "0.5em 0.75em"
            },
            {
              "name": "font-size",
              "value": "0.75em"
            },
            {
              "name": "color",
              "value": "#ffffff"
            },
            {
              "name": "border-radius",
              "value": "0.2em"
            }
          ]
        },
        {
          "selector": "$id > a:hover",
          "properties": [
            {
              "name": "background-color",
              "value": "$bluelight"
            },
            {
              "name": "color",
              "value": "#ffffff"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "58",
      "child": "10",
      "parent": "6"
    },
    "9": {
      "id": "9",
      "name": "Docs",
      "element": "a",
      "text": "Docs",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "/hosted/5d06f306c22c07a5/bliss_docs/index.html"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "12",
      "previous": "10",
      "child": null,
      "parent": "7"
    },
    "10": {
      "id": "10",
      "name": "Intro Video",
      "element": "a",
      "text": "Intro Video",
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
      "next": "9",
      "previous": null,
      "child": null,
      "parent": "7"
    },
    "11": {
      "id": "11",
      "name": "Launch",
      "element": "a",
      "text": "Launch",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "/bliss/"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "12",
      "child": null,
      "parent": "7"
    },
    "12": {
      "id": "12",
      "name": "Browse",
      "element": "a",
      "text": "Browse",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "/hosted/"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "11",
      "previous": "9",
      "child": null,
      "parent": "7"
    },
    "13": {
      "id": "13",
      "name": "removing barriers",
      "element": "small",
      "text": "removing barriers to your creativity",
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
      "parent": "2"
    },
    "14": {
      "id": "14",
      "name": "hero",
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
              "name": "margin",
              "value": "9rem auto 3rem auto"
            },
            {
              "name": "max-width",
              "value": "$maxwidth"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "15",
      "previous": "6",
      "child": "4",
      "parent": "1"
    },
    "15": {
      "id": "15",
      "name": "three big problems",
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
              "name": "justify-content",
              "value": "center"
            },
            {
              "name": "margin",
              "value": "0 auto"
            },
            {
              "name": "max-width",
              "value": "$maxwidth"
            }
          ]
        },
        {
          "selector": "$id .problem",
          "properties": [
            {
              "name": "background-color",
              "value": "$yellow"
            },
            {
              "name": "border-radius",
              "value": "0.5em"
            },
            {
              "name": "padding",
              "value": "1em"
            },
            {
              "name": "margin",
              "value": "0.5em"
            },
            {
              "name": "width",
              "value": "30%"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "28",
      "previous": "14",
      "child": "16",
      "parent": "1"
    },
    "16": {
      "id": "16",
      "name": "visual container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "problem"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "22",
      "previous": null,
      "child": "17",
      "parent": "15"
    },
    "17": {
      "id": "17",
      "name": "Visual Design",
      "element": "h3",
      "text": "Visual Design",
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
      "next": "18",
      "previous": null,
      "child": null,
      "parent": "16"
    },
    "18": {
      "id": "18",
      "name": "Visual Design Text",
      "element": "div",
      "text": "Current editors put code front and center. Does it make sense to be staring at text when your creation is visual? With Bliss, design is the focal point enabling you to see the experience you’re work.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "17",
      "child": null,
      "parent": "16"
    },
    "22": {
      "id": "22",
      "name": "prototype container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "problem"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "25",
      "previous": "16",
      "child": "23",
      "parent": "15"
    },
    "23": {
      "id": "23",
      "name": "Prototype",
      "element": "h3",
      "text": "Prototype",
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
      "next": "24",
      "previous": null,
      "child": null,
      "parent": "22"
    },
    "24": {
      "id": "24",
      "name": "Prototype Text",
      "element": "div",
      "text": "The best way to test ideas isn’t static mockups. Bliss allows you to try your ideas on the fly, minimizing the amount of time spent coding.",
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
      "parent": "22"
    },
    "25": {
      "id": "25",
      "name": "collaborate container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "problem"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "22",
      "child": "26",
      "parent": "15"
    },
    "26": {
      "id": "26",
      "name": "Collaborate",
      "element": "h3",
      "text": "Collaborate",
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
      "next": "27",
      "previous": null,
      "child": null,
      "parent": "25"
    },
    "27": {
      "id": "27",
      "name": "Collaborate Text",
      "element": "div",
      "text": "Current collaboration processes assumes a developer will deploy code to a Dev or QA infrastructure which is already in place. When you use Bliss, all you need to do is click publish and share the URL.",
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
      "parent": "25"
    },
    "28": {
      "id": "28",
      "name": "introducing bliss container",
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
              "value": "$blue"
            },
            {
              "name": "padding",
              "value": "1rem 0 5rem 0"
            },
            {
              "name": "margin",
              "value": "4rem 0 1rem 0"
            },
            {
              "name": "color",
              "value": "$white"
            },
            {
              "name": "max-width",
              "value": "$maxwidth"
            },
            {
              "name": "margin",
              "value": "4rem auto"
            },
            {
              "name": "border-radius",
              "value": "0.5rem"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "56",
      "previous": "15",
      "child": "29",
      "parent": "1"
    },
    "29": {
      "id": "29",
      "name": "Introducing BlissUI",
      "element": "h2",
      "text": "Introducing BlissUI",
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
      "next": "30",
      "previous": null,
      "child": null,
      "parent": "28"
    },
    "30": {
      "id": "30",
      "name": "Revolutionize",
      "element": "h3",
      "text": "A platform designed to revolutionize digital development.",
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
      "next": "31",
      "previous": "29",
      "child": null,
      "parent": "28"
    },
    "31": {
      "id": "31",
      "name": "Feature container",
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
              "name": "justify-content",
              "value": "center"
            },
            {
              "name": "margin",
              "value": "0 4em 4em 2em"
            },
            {
              "name": "flex-wrap",
              "value": "wrap"
            },
            {
              "name": "max-width",
              "value": "$maxwidth"
            },
            {
              "name": "margin",
              "value": "0 auto"
            }
          ]
        },
        {
          "selector": "$id .feature",
          "properties": [
            {
              "name": "margin",
              "value": "0.5em"
            },
            {
              "name": "width",
              "value": "40%"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "30",
      "child": "33",
      "parent": "28"
    },
    "32": {
      "id": "32",
      "name": "Organized",
      "element": "h3",
      "text": "Organized",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "34",
      "previous": null,
      "child": null,
      "parent": "33"
    },
    "33": {
      "id": "33",
      "name": "Organized Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "feature"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "35",
      "previous": null,
      "child": "32",
      "parent": "31"
    },
    "34": {
      "id": "34",
      "name": "Organized Text",
      "element": "div",
      "text": "Code shown at the right places. Everything is organized. No more opening JavaScript files, CSS files, and HTML templates. Bliss UI brings them together. ",
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
      "parent": "33"
    },
    "35": {
      "id": "35",
      "name": "Auto-compile Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "feature"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "38",
      "previous": "33",
      "child": "36",
      "parent": "31"
    },
    "36": {
      "id": "36",
      "name": "Auto-compile",
      "element": "h3",
      "text": "Auto-compile",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "37",
      "previous": null,
      "child": null,
      "parent": "35"
    },
    "37": {
      "id": "37",
      "name": "Auto-compile Text",
      "element": "div",
      "text": "No build tools or configuration because who needs them? Make changes and watch them come to life.",
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
      "parent": "35"
    },
    "38": {
      "id": "38",
      "name": "Data Editor Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "feature"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "41",
      "previous": "35",
      "child": "39",
      "parent": "31"
    },
    "39": {
      "id": "39",
      "name": "Data Editor",
      "element": "h3",
      "text": "Data Editor",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "40",
      "previous": null,
      "child": null,
      "parent": "38"
    },
    "40": {
      "id": "40",
      "name": "Data Editor Text",
      "element": "div",
      "text": "BlissUI makes handling data a breeze. With our editor, you can manage it all from one place.",
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
      "parent": "38"
    },
    "41": {
      "id": "41",
      "name": "Layouts & Plugins Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "feature"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "44",
      "previous": "38",
      "child": "42",
      "parent": "31"
    },
    "42": {
      "id": "42",
      "name": "Layouts and Components",
      "element": "h3",
      "text": "Layouts and Components",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "43",
      "previous": null,
      "child": null,
      "parent": "41"
    },
    "43": {
      "id": "43",
      "name": "Layouts & Plugins Text",
      "element": "div",
      "text": "Create layout pages and use them in other places. Publish any page as a component to re-use in other pages.",
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
      "parent": "41"
    },
    "44": {
      "id": "44",
      "name": "RESTful Integration",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "feature"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "47",
      "previous": "41",
      "child": "45",
      "parent": "31"
    },
    "45": {
      "id": "45",
      "name": "API Integration",
      "element": "h3",
      "text": "API  Integration",
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
      "parent": "44"
    },
    "46": {
      "id": "46",
      "name": "API Integration Text",
      "element": "div",
      "text": "Integrate with any API or backend over REST. Bliss compiles to a single-page app so it can talk with any web technology you already know.",
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
      "parent": "44"
    },
    "47": {
      "id": "47",
      "name": "Open Source Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "feature"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "53",
      "previous": "44",
      "child": "48",
      "parent": "31"
    },
    "48": {
      "id": "48",
      "name": "Open Source",
      "element": "h3",
      "text": "Open Source",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "49",
      "previous": null,
      "child": null,
      "parent": "47"
    },
    "49": {
      "id": "49",
      "name": "Open Source Text",
      "element": "div",
      "text": "Have a library you want to use? No problem. Bliss UI supports node packages from npm.",
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
      "parent": "47"
    },
    "50": {
      "id": "50",
      "name": "Hosting Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "feature"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "53",
      "child": "51",
      "parent": "31"
    },
    "51": {
      "id": "51",
      "name": "Cloud Hosting",
      "element": "h3",
      "text": "Cloud Hosting",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "52",
      "previous": null,
      "child": null,
      "parent": "50"
    },
    "52": {
      "id": "52",
      "name": "Cloud Hosting Text",
      "element": "div",
      "text": "Want to share your work with friends? Bliss UI will host your projects for free.",
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
      "parent": "50"
    },
    "53": {
      "id": "53",
      "name": "Download Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "feature"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "50",
      "previous": "47",
      "child": "54",
      "parent": "31"
    },
    "54": {
      "id": "54",
      "name": "Download",
      "element": "h3",
      "text": "Download and Export",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "55",
      "previous": null,
      "child": null,
      "parent": "53"
    },
    "55": {
      "id": "55",
      "name": "Download Text",
      "element": "div",
      "text": "Want to eject? With a single-click you can download your entire website. The static files are ready for your favorite host.",
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
      "parent": "53"
    },
    "56": {
      "id": "56",
      "name": "use bliss container",
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
            },
            {
              "name": "margin",
              "value": "4em 0 4em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "28",
      "child": "57",
      "parent": "1"
    },
    "57": {
      "id": "57",
      "name": "use bliss",
      "element": "h2",
      "text": "How will you use Bliss UI?",
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
      "next": "59",
      "previous": null,
      "child": null,
      "parent": "56"
    },
    "58": {
      "id": "58",
      "name": "bliss link",
      "element": "a",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "/"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-decoration",
              "value": "none"
            },
            {
              "name": "color",
              "value": "#fff"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "7",
      "previous": null,
      "child": "2",
      "parent": "6"
    },
    "59": {
      "id": "59",
      "name": "start now link",
      "element": "a",
      "text": "Start Creating Now",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "/bliss/"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$red"
            },
            {
              "name": "padding",
              "value": "1em"
            },
            {
              "name": "text-decoration",
              "value": "none"
            },
            {
              "name": "border-radius",
              "value": "0.5em"
            },
            {
              "name": "display",
              "value": "inline-block"
            },
            {
              "name": "color",
              "value": "#ffffff"
            }
          ]
        },
        {
          "selector": "$id:hover",
          "properties": [
            {
              "name": "background-color",
              "value": "$bluelight"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "57",
      "child": null,
      "parent": "56"
    }
  },
  "filename": "index",
  "pageTitle": "Bliss UI - Inspired Web App Platform"
}
if(typeof module !== "undefined") module.exports = blissProject;
