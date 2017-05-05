var blissProject = {
  "project": {
    "name": "new project",
    "type": "designer",
    "build": "designer",
    "compiler": "react",
    "next_id": 2,
    "root_id": "1",
    "externalCss": [],
    "externalJs": [
      "node_modules/react/dist/react.js",
      "node_modules/react-dom/dist/react-dom.js"
    ],
    "state": {},
    "js": {
      "init": "function() { app.render(); }",
      "createState": "function (rawName) {\n    var name = rawName.replace(/[^\\w]/gi, '');\n\n    var hasValue = function(item) {\n      return (typeof item !== \"undefined\" && item !== null);\n    };\n\n    if (!hasValue(app.state._managed)) app.state._managed = {};\n    if (!hasValue(app.state._managed[name])) app.state._managed[name] = {};\n\n    var managed = app.state._managed[name];\n\n    var getNewId = function() {\n      return managed.nextId++;\n    };\n\n    var getAll = function() {\n      return managed.data;\n    };\n\n    var find = function(id) {\n      var found = null;\n      for (var i = 0; i < managed.data.length; i++) {\n        var item = managed.data[i];\n        if (item.id === id) {\n          found = item;\n          break;\n        }\n      }\n      return found;\n    };\n\n    var findBy = function(key, value) {\n      var found = null;\n      for (var i = 0; i < managed.data.length; i++) {\n        var item = managed.data[i];\n        if (item[key] === value) {\n          found = item;\n          break;\n        }\n      }\n      return found;\n    };\n\n    var findIndex = function(id) {\n      var found = -1;\n      for (var i = 0; i < managed.data.length; i++) {\n        var item = managed.data[i];\n        if (item.id === id) {\n          found = i;\n          break;\n        }\n      }\n      return found;\n    };\n\n    var create = function(data) {\n      if (!hasValue(data)) return;\n      if (!hasValue(data.id)) data.id = getNewId();\n      managed.data.push(data);\n    };\n\n    var update = function(id, data) {\n      var item = find(id);\n      for (key in data) {\n        if (data.hasOwnProperty(key)) {\n          item[key] = data[key];\n        }\n      }\n    };\n\n    var remove = function(id) {\n      var index = findIndex(id);\n      if (index) managed.data.splice(index, 1);\n    };\n\n    var removeAll = function() {\n      managed.data.splice(0, managed.data.length);\n    };\n\n    var replaceAll = function(dataArray) {\n      removeAll();\n      for (var i = 0; i < dataArray.length; i++) {\n        create(dataArray[i]);\n      }\n    };\n\n    var setData = function(key, value) {\n      managed.internalData[key] = value;\n    };\n\n    var getData = function(key) {\n      return managed.internalData[key];\n    };\n\n    managed.selected = null;\n    managed.nextId = 0;\n    managed.data = [];\n    managed.internalData = {};\n    managed.getNewId = getNewId;\n    managed.hasValue = hasValue;\n    managed.getAll = getAll;\n    managed.find = find;\n    managed.findIndex = findIndex;\n    managed.findBy = findBy;\n    managed.create = create;\n    managed.update = update;\n    managed.remove = remove;\n    managed.removeAll = removeAll;\n    managed.replaceAll = replaceAll;\n    managed.setData = setData;\n    managed.getData = getData;\n\n    return managed;\n  }",
      "getState": "function (rawName) {\n    var name = rawName.replace(/[^\\w]/gi, '');\n    return app.state._managed[name];\n  }"
    },
    "load": [
      "init"
    ],
    "components": {
      "1": {
        "id": "1",
        "name": "new project",
        "element": "div",
        "text": null,
        "attributes": {},
        "css": {},
        "js": {},
        "dynamicAttributes": {},
        "next": null,
        "previous": null,
        "child": null,
        "parent": null
      }
    }
  }
};
if(typeof module !== "undefined") module.exports = blissProject;
