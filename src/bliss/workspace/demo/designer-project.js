var blissProject = {
  "project": {
    "name": "todo",
    "type": "designer",
    "build": "designer",
    "compiler": "react",
    "next_id": 11,
    "root_id": "1",
    "externalCss": [
      "css/reset.css",
      "https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"
    ],
    "externalJs": [
      "node_modules/react/dist/react.js",
      "node_modules/react-dom/dist/react-dom.js"
    ],
    "state": {},
    "js": {
      "init": "function() {\n  // setup app state\n  app.state.currentColor = '#5f38a9';\n  app.state.currentTodo = '';\n  app.state.completedTodos = {};\n  app.state.todoColors = [];\n  app.state.todos = [];\n  \n  // render application\n  app.render();\n}",
      "createState": "function (rawName) {\n    var name = rawName.replace(/[^\\w]/gi, '');\n\n    var hasValue = function(item) {\n      return (typeof item !== \"undefined\" && item !== null);\n    };\n\n    if (!hasValue(app.state._managed)) app.state._managed = {};\n    if (!hasValue(app.state._managed[name])) app.state._managed[name] = {};\n\n    var managed = app.state._managed[name];\n\n    var getNewId = function() {\n      return managed.nextId++;\n    };\n\n    var getAll = function() {\n      return managed.data;\n    };\n\n    var find = function(id) {\n      var found = null;\n      for (var i = 0; i < managed.data.length; i++) {\n        var item = managed.data[i];\n        if (item.id === id) {\n          found = item;\n          break;\n        }\n      }\n      return found;\n    };\n\n    var findIndex = function(id) {\n      var found = -1;\n      for (var i = 0; i < managed.data.length; i++) {\n        var item = managed.data[i];\n        if (item.id === id) {\n          found = i;\n          break;\n        }\n      }\n      return found;\n    };\n\n    var create = function(data) {\n      if (!hasValue(data)) return;\n      if (!hasValue(data.id)) data.id = getNewId();\n      managed.data.push(data);\n    };\n\n    var update = function(id, data) {\n      var item = find(id);\n      for (key in data) {\n        if (data.hasOwnProperty(key)) {\n          item[key] = data[key];\n        }\n      }\n    };\n\n    var remove = function(id) {\n      var index = findIndex(id);\n      if (index) managed.data.splice(index, 1);\n    };\n\n    var removeAll = function() {\n      managed.data.splice(0, managed.data.length);\n    };\n\n    var replaceAll = function(dataArray) {\n      removeAll();\n      for (var i = 0; i < dataArray.length; i++) {\n        create(dataArray[i]);\n      }\n    };\n\n    var setData = function(key, value) {\n      managed.internalData[key] = value;\n    };\n\n    var getData = function(key) {\n      return managed.internalData[key];\n    };\n\n    managed.selected = null;\n    managed.nextId = 0;\n    managed.data = [];\n    managed.internalData = {};\n    managed.getNewId = getNewId;\n    managed.hasValue = hasValue;\n    managed.getAll = getAll;\n    managed.find = find;\n    managed.findIndex = findIndex;\n    managed.create = create;\n    managed.update = update;\n    managed.remove = remove;\n    managed.removeAll = removeAll;\n    managed.replaceAll = replaceAll;\n    managed.setData = setData;\n    managed.getData = getData;\n\n    return managed;\n  }",
      "getState": "function (rawName) {\n    var name = rawName.replace(/[^\\w]/gi, '');\n    return app.state._managed[name];\n  }"
    },
    "load": [
      "init"
    ],
    "components": {
      "1": {
        "id": "1",
        "name": "todo",
        "element": "div",
        "text": "",
        "attributes": {
          "id": "todoContainer"
        },
        "css": {
          "position": "absolute",
          "top": "0",
          "left": "0",
          "right": "0",
          "background-color": "#3c3338",
          "padding": "50px",
          "bottom": "0"
        },
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": "7",
        "parent": null
      },
      "3": {
        "id": "3",
        "name": "list item",
        "element": "div",
        "text": null,
        "textFn": "showTodo",
        "ifFn": null,
        "repeatFn": "repeatTodos",
        "attributes": {
          "id": "listItem"
        },
        "css": {
          "display": "block",
          "padding": "20px",
          "background-color": "blue",
          "color": "#fff",
          "font-size": "2em",
          "cursor": "pointer",
          "width": "100%"
        },
        "js": {
          "repeatTodos": "function(scope, attributes) {\n  return app.state.todos;\n};\n",
          "showTodo": "function(scope, attributes) {\n  return scope.repeatTodos[scope.repeatTodos_index];\n};\n",
          "getStyles": "function(scope, attributes) {\n  var styles = { 'backgroundColor': app.state.todoColors[scope.repeatTodos_index] };\n  if(app.state.completedTodos[scope.repeatTodos_index.toString()] === true) {\n    styles.backgroundColor = '#444';\n    styles.textDecoration = 'line-through';\n  }\n  return styles;\n}",
          "handleClick": "function(scope, attributes) {\n  var index = scope.repeatTodos_index.toString();\n  return function(e) {\n    app.setState(function() {\n      var todoClickVal = app.state.completedTodos[index];\n      if(todoClickVal === true) {\n        app.state.completedTodos[index] = false;\n      } else {\n      \tapp.state.completedTodos[index] = true;\n      }\n    });\n  }\n};\n"
        },
        "dynamicAttributes": {
          "style": "getStyles",
          "onClick": "handleClick"
        },
        "next": null,
        "previous": null,
        "child": "10",
        "parent": "8"
      },
      "4": {
        "id": "4",
        "name": "input",
        "element": "input",
        "text": null,
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {
          "id": "newTodo"
        },
        "css": {
          "display": "block",
          "padding": "20px",
          "border": "none",
          "color": "#fff",
          "font-size": "2em",
          "outline": "none",
          "background-color": "#3ba97b",
          "width": "100%"
        },
        "js": {
          "handleChange": "function(scope, attributes) {\n  return function(e) {\n    app.setState(function() {\n      app.state.currentTodo = e.target.value;\n    });\n  }\n};\n",
          "getValue": "function(scope, attributes) {\n  return app.state.currentTodo;\n}",
          "changeHue": "function(rgb, degree) {\n  function changeHue(rgb, degree) {\n    var hsl = rgbToHSL(rgb);\n    hsl.h += degree;\n    if (hsl.h > 360) {\n      hsl.h -= 360;\n    }\n    else if (hsl.h < 0) {\n      hsl.h += 360;\n    }\n    return hslToRGB(hsl);\n  }\n\n  // exepcts a string and returns an object\n  function rgbToHSL(rgb) {\n      // strip the leading # if it's there\n      rgb = rgb.replace(/^\\s*#|\\s*$/g, '');\n\n      // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`\n      if(rgb.length == 3){\n          rgb = rgb.replace(/(.)/g, '$1$1');\n      }\n\n      var r = parseInt(rgb.substr(0, 2), 16) / 255,\n          g = parseInt(rgb.substr(2, 2), 16) / 255,\n          b = parseInt(rgb.substr(4, 2), 16) / 255,\n          cMax = Math.max(r, g, b),\n          cMin = Math.min(r, g, b),\n          delta = cMax - cMin,\n          l = (cMax + cMin) / 2,\n          h = 0,\n          s = 0;\n\n      if (delta == 0) {\n          h = 0;\n      }\n      else if (cMax == r) {\n          h = 60 * (((g - b) / delta) % 6);\n      }\n      else if (cMax == g) {\n          h = 60 * (((b - r) / delta) + 2);\n      }\n      else {\n          h = 60 * (((r - g) / delta) + 4);\n      }\n\n      if (delta == 0) {\n          s = 0;\n      }\n      else {\n          s = (delta/(1-Math.abs(2*l - 1)))\n      }\n\n      return {\n          h: h,\n          s: s,\n          l: l\n      }\n  }\n\n  // expects an object and returns a string\n  function hslToRGB(hsl) {\n      var h = hsl.h,\n          s = hsl.s,\n          l = hsl.l,\n          c = (1 - Math.abs(2*l - 1)) * s,\n          x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),\n          m = l - c/ 2,\n          r, g, b;\n\n      if (h < 60) {\n          r = c;\n          g = x;\n          b = 0;\n      }\n      else if (h < 120) {\n          r = x;\n          g = c;\n          b = 0;\n      }\n      else if (h < 180) {\n          r = 0;\n          g = c;\n          b = x;\n      }\n      else if (h < 240) {\n          r = 0;\n          g = x;\n          b = c;\n      }\n      else if (h < 300) {\n          r = x;\n          g = 0;\n          b = c;\n      }\n      else {\n          r = c;\n          g = 0;\n          b = x;\n      }\n\n      r = normalize_rgb_value(r, m);\n      g = normalize_rgb_value(g, m);\n      b = normalize_rgb_value(b, m);\n\n      return rgbToHex(r,g,b);\n  }\n\n  function normalize_rgb_value(color, m) {\n      color = Math.floor((color + m) * 255);\n      if (color < 0) {\n          color = 0;\n      }\n      return color;\n  }\n\n  function rgbToHex(r, g, b) {\n      return \"#\" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);\n  }\n  \n  return changeHue(rgb, degree);\n}",
          "handleKeyDown": "function(scope, attributes) {\n  var comp = this;\n  return function(e) {\n    var key = e.which, ENTER = 13, ESCAPE = 27;\n    if(key !== ENTER && key !== ESCAPE) return;\n    \n    app.setState(function() {\n      if(key === ENTER) {\n        app.state.currentColor = comp.changeHue(app.state.currentColor, 15);\n        app.state.todoColors.push(app.state.currentColor);\n        app.state.todos.push(app.state.currentTodo);\n      }\n      app.state.currentTodo = '';\n    });\n  }\n};\n"
        },
        "dynamicAttributes": {
          "value": "getValue",
          "onChange": "handleChange",
          "onKeyDown": "handleKeyDown"
        },
        "next": "8",
        "previous": "9",
        "child": null,
        "parent": "7"
      },
      "6": {
        "id": "6",
        "name": "Label",
        "element": "h1",
        "text": "Todos",
        "textFn": "",
        "ifFn": null,
        "repeatFn": null,
        "attributes": {
          "id": "label",
          "className": "float-left"
        },
        "css": {
          "margin": "0 auto",
          "color": "#fff",
          "text-transform": "uppercase",
          "padding": "0 0 10px 0",
          "display": "inline-block"
        },
        "js": {},
        "dynamicAttributes": {},
        "next": "9",
        "previous": null,
        "child": null,
        "parent": "7"
      },
      "7": {
        "id": "7",
        "name": "todo list container",
        "element": "div",
        "text": null,
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {
          "id": "todoListContainer"
        },
        "css": {
          "margin": "0 auto",
          "width": "75%"
        },
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": "6",
        "parent": "1"
      },
      "8": {
        "id": "8",
        "name": "list container",
        "element": "div",
        "text": null,
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {
          "id": "listRepeatContainer"
        },
        "css": {
          "overflow": "auto",
          "height": "calc(100vh - 250px)"
        },
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": "4",
        "child": "3",
        "parent": "7"
      },
      "9": {
        "id": "9",
        "name": "clear completed",
        "element": "a",
        "text": "Clear Completed",
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {
          "href": "#",
          "id": "clearCompleted",
          "className": "float-right"
        },
        "css": {
          "color": "#fff",
          "display": "inline-block"
        },
        "js": {
          "handleClick": "function(scope, attributes) {\n  return function(e) {\n    app.setState(function() {\n      //Object.keys(app.state.completedTodos)\n      // get the list of completed\n      // remove them from the array\n      // update state\n    });\n  }\n};\n"
        },
        "dynamicAttributes": {},
        "next": "4",
        "previous": "6",
        "child": null,
        "parent": "7"
      },
      "10": {
        "id": "10",
        "name": "deleteButton",
        "element": "button",
        "text": "Delete",
        "textFn": null,
        "ifFn": null,
        "repeatFn": null,
        "attributes": {
          "id": "deleteButton"
        },
        "css": {
          "float": "right",
          "padding": "10px",
          "border-radius": "3px",
          "border": "1px solid #fff",
          "background-color": "#fff"
        },
        "js": {
          "handleDelete": "function(scope, attributes) {\n  return function(e) {\n    e.preventDefault();\n    var index = scope.repeatTodos_index;\n    app.setState(function() {\n      \n      app.state.todos\n    });\n  }\n};\n"
        },
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": null,
        "parent": "3"
      }
    }
  }
};
if(typeof module !== "undefined") module.exports = blissProject;
