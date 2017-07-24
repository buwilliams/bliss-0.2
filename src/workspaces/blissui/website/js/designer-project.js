var blissProject = {
  "name": "Bliss UI Website",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 27,
  "rootId": "1",
  "externalCss": [
    "https://fonts.googleapis.com/css?family=Roboto"
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
      "name": "background",
      "value": "#f1f1f1"
    },
    {
      "name": "border",
      "value": "#7b95a1"
    },
    {
      "name": "link",
      "value": "#00709b"
    }
  ],
  "css": [
    {
      "selector": "body",
      "properties": [
        {
          "name": "margin",
          "value": "0"
        },
        {
          "name": "padding",
          "value": "0"
        },
        {
          "name": "background-color",
          "value": "$background"
        },
        {
          "name": "font-family",
          "value": "'Roboto', sans-serif"
        },
        {
          "name": "color",
          "value": "#333"
        }
      ]
    },
    {
      "selector": "*",
      "properties": [
        {
          "name": "box-sizing",
          "value": "border-box"
        }
      ]
    },
    {
      "selector": "a",
      "properties": [
        {
          "name": "color",
          "value": "$link"
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
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "7",
      "parent": null
    },
    "4": {
      "id": "4",
      "name": "header",
      "element": "h1",
      "text": "Bliss UI",
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
              "value": "0"
            },
            {
              "name": "padding",
              "value": "0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "5",
      "previous": null,
      "child": "20",
      "parent": "7"
    },
    "5": {
      "id": "5",
      "name": "seperator",
      "element": "hr",
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
              "name": "border-top",
              "value": "solid 2px"
            },
            {
              "name": "margin",
              "value": "0 0 25px 0"
            },
            {
              "name": "border-top-color",
              "value": "$border"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "25",
      "previous": "4",
      "child": null,
      "parent": "7"
    },
    "6": {
      "id": "6",
      "name": "brief",
      "element": "span",
      "text": "You are the heart of Bliss UI. The private beta is expected to start on August 1st, 2017! I'll be in touch with you around that time. Looking forward to building a great future together.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "8",
      "previous": "25",
      "child": null,
      "parent": "7"
    },
    "7": {
      "id": "7",
      "name": "container",
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
              "name": "width",
              "value": "75%"
            },
            {
              "name": "margin",
              "value": "50px auto 0 auto"
            },
            {
              "name": "border-radius",
              "value": "10px"
            },
            {
              "name": "padding",
              "value": "20px"
            },
            {
              "name": "border-width",
              "value": "3px"
            },
            {
              "name": "border-style",
              "value": "solid"
            },
            {
              "name": "border-color",
              "value": "$border"
            },
            {
              "name": "background-color",
              "value": "#fff"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "4",
      "parent": "1"
    },
    "8": {
      "id": "8",
      "name": "features header",
      "element": "div",
      "text": "Private Beta Features",
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
            },
            {
              "name": "margin-top",
              "value": "30px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "9",
      "previous": "6",
      "child": null,
      "parent": "7"
    },
    "9": {
      "id": "9",
      "name": "feature list",
      "element": "ul",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "16",
      "previous": "8",
      "child": "10",
      "parent": "7"
    },
    "10": {
      "id": "10",
      "name": "feature 1",
      "element": "li",
      "text": "Your own playground to build whatever you want",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "12",
      "previous": null,
      "child": null,
      "parent": "9"
    },
    "11": {
      "id": "11",
      "name": "feature 3",
      "element": "li",
      "text": "Request any feature and be taken seriously",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "14",
      "previous": "12",
      "child": null,
      "parent": "9"
    },
    "12": {
      "id": "12",
      "name": "feature 2",
      "element": "li",
      "text": "Free application hosting",
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
    "13": {
      "id": "13",
      "name": "feature 5",
      "element": "li",
      "text": "You help decide what Bliss UI becomes",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "14",
      "child": null,
      "parent": "9"
    },
    "14": {
      "id": "14",
      "name": "feature 4",
      "element": "li",
      "text": "Shape what building apps looks like in the future",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "13",
      "previous": "11",
      "child": null,
      "parent": "9"
    },
    "15": {
      "id": "15",
      "name": "backlog list",
      "element": "ul",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "23",
      "previous": "16",
      "child": "18",
      "parent": "7"
    },
    "16": {
      "id": "16",
      "name": "planned features header",
      "element": "div",
      "text": "What's in the development backlog?",
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
            },
            {
              "name": "margin-top",
              "value": "30px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "15",
      "previous": "9",
      "child": null,
      "parent": "7"
    },
    "17": {
      "id": "17",
      "name": "backlog 5",
      "element": "li",
      "text": "Firebase Support. The goal is to make Bliss the leading choice in building Firebase apps.",
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
      "parent": "15"
    },
    "18": {
      "id": "18",
      "name": "backlog 1",
      "element": "li",
      "text": "Data/state management. The goal here is to make the 'hard part' of apps easy.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "22",
      "previous": null,
      "child": null,
      "parent": "15"
    },
    "19": {
      "id": "19",
      "name": "backlog 4",
      "element": "li",
      "text": "Marketplace. Make components and sell them on the marketplace.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "17",
      "previous": "21",
      "child": null,
      "parent": "15"
    },
    "20": {
      "id": "20",
      "name": "subheader",
      "element": "small",
      "text": "Create UIs in the cloud",
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
              "value": "gray"
            },
            {
              "name": "margin-left",
              "value": "10px"
            },
            {
              "name": "font-size",
              "value": "14pt"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "4"
    },
    "21": {
      "id": "21",
      "name": "backlog 3",
      "element": "li",
      "text": "Subscriptions. Allow users to sign-up to use the product.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "19",
      "previous": "22",
      "child": null,
      "parent": "15"
    },
    "22": {
      "id": "22",
      "name": "backlog 2",
      "element": "li",
      "text": "Authentication and authorization.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "21",
      "previous": "18",
      "child": null,
      "parent": "15"
    },
    "23": {
      "id": "23",
      "name": "private beta sign-up",
      "element": "div",
      "text": "Want to participate? Send an email to buddy [at] blissui [dot] com.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "15",
      "child": null,
      "parent": "7"
    },
    "24": {
      "id": "24",
      "name": "YouTube Video",
      "element": "iframe",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "src",
          "value": "https://www.youtube.com/embed/YRtg_aVpdqA"
        },
        {
          "name": "frameborder",
          "value": "0"
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
          "name": "allowfullscreen",
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
              "name": "position",
              "value": "relative"
            },
            {
              "name": "width",
              "value": "560px"
            },
            {
              "name": "height",
              "value": "315px"
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
      "parent": "25"
    },
    "25": {
      "id": "25",
      "name": "Video Container",
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
              "name": "float",
              "value": "right"
            },
            {
              "name": "margin-left",
              "value": "30px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "6",
      "previous": "5",
      "child": "24",
      "parent": "7"
    }
  }
}
if(typeof module !== "undefined") module.exports = blissProject;
