module.exports = function() {
  var data = {
    "name": "test",
    "compiler": "react",
    "version": "v0.2",
    "type": "bliss",
    "build": "designer",
    "filename": "index",
    "pageTitle": "BlissUI",
    "nextId": 4,
    "rootId": "1",
    "packages": [],
    "externalCss": [],
    "externalJs": [],
    "state": {},
    "schemas": [],
    "js": [
      {
        "name": "someFn",
        "body": "function() { return null; }"
      },
      {
        "name": "sayHello",
        "body": "function(message) { console.log(message); }"
      }
    ],
    "cssVars": [
      {
        "name": "background",
        "value": "#fff"
      }
    ],
    "css": [
      {
        "selector": "body",
        "properties": [
          {
            "name": "font-family",
            "value": "courier"
          },
          {
            "name": "font-size",
            "value": "12px"
          },
          {
            "name": "background-color",
            "value": "$background"
          }
        ]
      },
      {
        "selector": "a:hover",
        "properties": [
          {
            "name": "background-color",
            "value": "#ccc",
            "variable": null
          }
        ]
      }
    ],
    "load": [],
    "components": {
      "1": {
        "id": "1",
        "name": "Bliss",
        "element": "div",
        "text": null,
        "attributes": [],
        "dynamicAttributes": [],
        "css": [],
        "js": [],
        "next": null,
        "previous": null,
        "child": "2",
        "parent": null
      },
      "2": {
        "id": "2",
        "name": "Bliss",
        "element": "div",
        "text": null,
        "attributes": [],
        "dynamicAttributes": [],
        "css": [],
        "js": [],
        "next": "3",
        "previous": null,
        "child": null,
        "parent": "1"
      },
      "3": {
        "id": "3",
        "name": "Bliss",
        "element": "div",
        "text": null,
        "attributes": [],
        "dynamicAttributes": [],
        "css": [],
        "js": [],
        "next": null,
        "previous": "2",
        "child": null,
        "parent": "1"
      }
    }
  };
  return data;
}
