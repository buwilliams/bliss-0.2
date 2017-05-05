var blissProject = {
  "project": {
    "name": "simple table",
    "type": "designer",
    "build": "designer",
    "compiler": "react",
    "next_id": 16,
    "root_id": "1",
    "externalCss": [],
    "externalJs": [
      "node_modules/react/dist/react.js",
      "node_modules/react-dom/dist/react-dom.js"
    ],
    "state": {},
    "js": {
      "init": "function() { app.render(); }"
    },
    "load": [
      "init"
    ],
    "components": {
      "1": {
        "id": "1",
        "name": "simple table",
        "element": "div",
        "text": null,
        "attributes": {},
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": "2",
        "parent": null
      },
      "2": {
        "id": "2",
        "name": "table",
        "element": "table",
        "text": null,
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": "3",
        "parent": "1"
      },
      "3": {
        "id": "3",
        "name": "thead",
        "element": "thead",
        "text": null,
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {
          "id": "tableHead"
        },
        "css": {
          "background": "lightgrey",
          "color": "black"
        },
        "js": {},
        "dynamicAttributes": {},
        "next": "4",
        "previous": null,
        "child": "5",
        "parent": "2"
      },
      "4": {
        "id": "4",
        "name": "tbody",
        "element": "tbody",
        "text": null,
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": "3",
        "child": "14",
        "parent": "2"
      },
      "5": {
        "id": "5",
        "name": "row",
        "element": "tr",
        "text": null,
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": "7",
        "parent": "3"
      },
      "6": {
        "id": "6",
        "name": "row",
        "element": "tr",
        "text": null,
        "textFn": null,
        "ifFn": null,
        "repeatFn": "repeatRows",
        "attributes": {},
        "css": {},
        "js": {
          "repeatRows": "function(scope, attributes) {\n  return app.props.rows || [];\n};\n"
        },
        "dynamicAttributes": {},
        "next": null,
        "previous": "14",
        "child": "11",
        "parent": "4"
      },
      "7": {
        "id": "7",
        "name": "id",
        "element": "th",
        "text": "id",
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": "9",
        "previous": null,
        "child": null,
        "parent": "5"
      },
      "8": {
        "id": "8",
        "name": "name",
        "element": "th",
        "text": "name",
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": "9",
        "child": null,
        "parent": "5"
      },
      "9": {
        "id": "9",
        "name": "email",
        "element": "th",
        "text": "email",
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": "8",
        "previous": "7",
        "child": null,
        "parent": "5"
      },
      "10": {
        "id": "10",
        "name": "name",
        "element": "td",
        "text": "",
        "textFn": "getName",
        "ifFn": null,
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {
          "getName": "function(scope, attributes) {\n  return scope.repeatRows[scope.repeatRows_index].name || '';\n};"
        },
        "dynamicAttributes": {},
        "next": null,
        "previous": "12",
        "child": null,
        "parent": "6"
      },
      "11": {
        "id": "11",
        "name": "id",
        "element": "td",
        "text": "",
        "textFn": "getId",
        "ifFn": null,
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {
          "getId": "function(scope, attributes) {\n  return scope.repeatRows[scope.repeatRows_index].id || '';\n};\n"
        },
        "dynamicAttributes": {},
        "next": "12",
        "previous": null,
        "child": null,
        "parent": "6"
      },
      "12": {
        "id": "12",
        "name": "email",
        "element": "td",
        "text": "",
        "textFn": "getEmail",
        "ifFn": null,
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {
          "getEmail": "function(scope, attributes) {\n  return scope.repeatRows[scope.repeatRows_index].email || '';\n};\n"
        },
        "dynamicAttributes": {},
        "next": "10",
        "previous": "11",
        "child": null,
        "parent": "6"
      },
      "14": {
        "id": "14",
        "name": "empty row",
        "element": "tr",
        "text": null,
        "textFn": null,
        "ifFn": "shouldShowEmptyRow",
        "repeatFn": null,
        "attributes": {},
        "css": {},
        "js": {
          "shouldShowEmptyRow": "function(scope, attributes) {\n  var collection = app.props.rows || [];\n  return (collection.length === 0);\n}"
        },
        "dynamicAttributes": {},
        "next": "6",
        "previous": null,
        "child": "15",
        "parent": "4"
      },
      "15": {
        "id": "15",
        "name": "empty col",
        "element": "td",
        "text": null,
        "textFn": "emptyText",
        "ifFn": null,
        "repeatFn": null,
        "attributes": {
          "colSpan": "3"
        },
        "css": {},
        "js": {
          "emptyText": "function(scope, attributes) {\n  return app.state.emptyText || \"No results to show.\";\n};\n"
        },
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": null,
        "parent": "14"
      }
    },
    "export": "simple_table"
  }
};
if(typeof module !== "undefined") module.exports = blissProject;
