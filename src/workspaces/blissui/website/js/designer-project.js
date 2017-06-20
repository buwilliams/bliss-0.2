var blissProject = {
  "name": "Bliss UI Website",
  "compiler": "react",
  "version": "v0.2",
  "type": "app",
  "build": "designer",
  "nextId": 8,
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
      "child": null,
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
      "next": "6",
      "previous": "4",
      "child": null,
      "parent": "7"
    },
    "6": {
      "id": "6",
      "name": "coming soon",
      "element": "span",
      "text": "Private beta is expected to start on August 1st, 2017! I'll be in touch around that time.",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "5",
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
    }
  }
}
if(typeof module !== "undefined") module.exports = blissProject;