var blissProject = {
  "name": "Bliss UI",
  "type": "bliss",
  "build": "bliss",
  "compiler": "react",
  "nextId": 237,
  "rootId": "1",
  "externalCss": [
    "node_modules/tether/dist/css/tether.min.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "node_modules/font-awesome/css/font-awesome.css",
    "node_modules/codemirror/lib/codemirror.css",
    "node_modules/codemirror/theme/solarized.css",
    "components/bliss-tree/css/bliss-tree.css",
    "components/bliss-properties/css/bliss-properties.css",
    "components/bliss-javascript/css/bliss-javascript.css",
    "https://cdn.rawgit.com/konpa/devicon/4f6a4b08efdad6bb29f9cc801f5c07e263b39907/devicon.min.css"
  ],
  "externalJs": [
    "node_modules/tether/dist/js/tether.min.js",
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/codemirror/lib/codemirror.js",
    "node_modules/codemirror/mode/javascript/javascript.js",
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js",
    "node_modules/react-code-mirror/standalone.js",
    "node_modules/lodash/lodash.min.js",
    "components/bliss-tree/js/bliss-tree.js",
    "components/bliss-properties/js/bliss-property.js",
    "components/bliss-properties/js/bliss-properties.js",
    "components/bliss-properties/js/bliss-properties-generic.js",
    "components/bliss-properties/js/bliss-properties-css.js",
    "components/bliss-javascript/js/bliss-javascript.js",
    "components/bliss-utils/js/state.js"
  ],
  "state": {
    "timer": null,
    "shouldSave": false
  },
  "packages": [
    {
      "name": "bootstrap",
      "version": "^4.0.0-alpha.6"
    },
    {
      "name": "codemirror",
      "version": "^5.24.2"
    },
    {
      "name": "font-awesome",
      "version": "^4.7.0"
    },
    {
      "name": "lodash",
      "version": "^4.17.4"
    },
    {
      "name": "react",
      "version": "15.4.2"
    },
    {
      "name": "react-code-mirror",
      "version": "^3.1.0"
    },
    {
      "name": "react-dom",
      "version": "15.4.2"
    }
  ],
  "js": [
    {
      "name": "init",
      "body": "function() {\n  app._state = state();\n  app.js.cleanState(newBlissProject, false);\n}"
    },
    {
      "name": "build",
      "body": "function() {\n  app.js.log('app.js.build() invoked.');\n  if(app.buildProject.type === \"bliss\") {\n    app.buildProject.build = \"designer\";\n  }\n  \n  var data = JSON.stringify(app.buildProject);\n\n  $.ajax({\n    type: 'POST',\n    url: '/build',\n    data: data,\n    success: function(data) {\n      app.js.refreshIframe();\n    },\n    error: function(jqXHR, textStatus, errorThrown) {\n      console.error('POST /build', jqXHR, textStatus, errorThrown);\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
    },
    {
      "name": "selectComponent",
      "body": "function(id) {\n  app.js.log('app.js.selectComponent() invoked.');\n  app.setState(function() {\n    var internal = app._state.get('internal');\n  \tinternal.setData('activeComponent', id);\n  });\n}"
    },
    {
      "name": "update",
      "body": "function(fn) {\n  app.js.log('app.js.update() invoked.');\n  app.setState(function() {\n    app.state.shouldSave = true;\n    clearTimeout(app.state.timer);\n    try { fn(); } catch(e) { console.error('app.js.update', e); }\n    app.state.timer = setTimeout(function() {\n    \tif(app.state.shouldBuild === true) {\n        app.js.build();\n      } else {\n        app.js.saveAndReloadProject();\n      }\n  \t}, 500);\n  });\n}"
    },
    {
      "name": "server",
      "body": "function(path, success, data, requestType) {\n  app.js.log('app.js.server() invoked.');\n  if(_.isNil(data)) data = {};\n  if(_.isNil(requestType)) requestType = 'GET';\n  \n  $.ajax({\n    type: requestType,\n    url: '/' + path,\n    data: data,\n    success: function(data) {\n      success(data);\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
    },
    {
      "name": "getProjects",
      "body": "function(scope, attributes) {\n  app.js.log('app.js.getProjects() invoked.');\n  var projects = app._state.get('projects');\n  app.js.server('list', function(data) {\n    projects.removeAll();\n    app.setState(function() {\n      data.projects.forEach(function(project) {\n        projects.create({name: project});\n      });\n    });\n  });\n}"
    },
    {
      "name": "loadProject",
      "body": "function(projectName, shouldConfirm) {\n  app.js.log('app.js.loadProjects() invoked.');\n  if(_.isNil(shouldConfirm)) shouldConfirm = true;\n  if(shouldConfirm === true) {\n  \tif(!confirm('Are you sure you want to load a different project?')) return;\n  }\n  \n  app.setState(function() {\n  \tapp.js.setStatus('Loading project ' + projectName + '...');\n  });\n  \n  app.js.server('load', function(data) {\n    app.setState(function() {\n      app.js.setStatus('Loaded project ' + data.project.name + '.');\n    });\n    app.js.cleanState(data.project, true);\n    app.js.build();\n  }, {name: projectName});\n}"
    },
    {
      "name": "setStatus",
      "body": "function(message) {\n  app.js.log('app.js.setStatus() invoked.');\n  app.setState(function() {\n  \tapp.state.status = message;\n  });\n}"
    },
    {
      "name": "getCssVar",
      "body": "function(dollarName) {\n  var name = dollarName.substring(1);\n  var found = _.find(blissProject.cssVars, {'name': name});\n  return (_.isNil(found)) ? '' : found.value;\n}"
    },
    {
      "name": "saveProject",
      "body": "function(success) {\n  app.js.log('app.js.saveProject() invoked.');\n  var proj = app.buildProject;\n  var data = JSON.stringify(proj);\n  app.js.setStatus('Saving project ' + proj.name + '...');\n  \n  $.ajax({\n    type: 'POST',\n    url: '/save',\n    data: data,\n    success: function(data) {\n      app.js.setStatus('Saved project ' + proj.name + '.');\n      if(!_.isNil(success)) success(data);\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
    },
    {
      "name": "createNewProject",
      "body": "function(shouldConfirm) {\n  app.js.log('app.js.createNewProject() invoked.');\n  if(_.isNil(shouldConfirm)) shouldConfirm = true;\n\n  if(shouldConfirm === true) {\n    if(!confirm('Are you sure you want to create a new project?')) return;\n  }\n  \n  app.setState(function() {\n    app.buildProject = newBlissProject;\n\t\tapp.state.shouldBuild = false;\n  });\n}"
    },
    {
      "name": "saveAndReloadProject",
      "body": "function() {\n  app.js.log('app.js.saveAndReloadProject() invoked.');\n  // save current json\n  app.js.saveProject(function() {\n    // load project\n    app.js.loadProject(app.buildProject.name, false);\n  });\n}"
    },
    {
      "name": "refreshIframe",
      "body": "function() {\n  app.js.log('app.js.refreshIframe() invoked.');\n  var iframe = $('#preview');\n  var currentSrc = iframe.attr('src');\n  if(_.isUndefined(currentSrc)) return;\n  \n  var url = location.origin + '/designer/designer.html';\n  iframe.attr('src', url);\n}"
    },
    {
      "name": "refresh",
      "body": "function() {\n  app.js.log('app.js.refresh() invoked.');\n  // refresh the project list\n  app.js.getProjects();\n  \n  // refresh iframe\n  app.js.refreshIframe();\n}"
    },
    {
      "name": "cleanState",
      "body": "function(buildProject, shouldBuildProject) {\n  app.js.log('app.js.cleanState() invoked.');\n  app.setState(function() {\n    // Clean existing state\n    //app._state.reset();\n    app._state = state();\n    \n    // Set build project\n    app.js.log('setting build', buildProject);\n    app.buildProject = buildProject;\n\n    // Set State\n    app.state.shouldSave = false;\n    app.state.shouldBuild = shouldBuildProject;\n    \n    // Set internal state\n    var internal = app._state.create('internal');\n    internal.setData('activeComponent', app.buildProject.rootId);\n    \n    var view = app._state.create('view');\n    view.create({name: 'designer', label: 'Designer'});\n    view.create({name: 'js', label: 'JavaScript'});\n    view.create({name: 'global_js', label: 'Global JS'});\n    view.create({name: 'global_css', label: 'Global CSS'});\n    view.create({name: 'css_vars', label: 'CSS Variables'});\n    view.create({name: 'page_load', label: 'Page Load'});\n    view.create({name: 'node_packages', label: 'Node Packages'});\n    view.create({name: 'settings', label: 'Settings'});\n    view.setData('selected', 'designer');\n\n    var color = app._state.create('color');\n    color.setData('currentColor', '#ffffff');\n\n    var res = app._state.create('res');\n    res.create({value: 'full', label: 'Viewport', width: '100%', height: 'calc(100% - 32px)', previewWidth: '100%', previewHeight: 'calc(100vh - 100px)'});\n    res.create({value: 'galaxys5', label: 'Galaxy S5', width: '360px', height: '640px', previewWidth: 'calc(360px + 20px)', previewHeight: 'calc(640px + 52px)'});\n    res.create({value: 'nexus5x', label: 'Nexus 5X', width: '412px', height: '732px', previewWidth: 'calc(412px + 20px)', previewHeight: 'calc(732px + 52px)'});\n    res.create({value: 'nexus6p', label: 'Nexus 6P', width: '412px', height: '732px', previewWidth: 'calc(412px + 20px)', previewHeight: 'calc(732px + 52px)'});\n    res.create({value: 'iphone5', label: 'iPhone 5', width: '320px', height: '568px', previewWidth: 'calc(320px + 20px)', previewHeight: 'calc(568px + 52px)'});\n    res.create({value: 'iphone6', label: 'iPhone 6', width: '375px', height: '667px', previewWidth: 'calc(375px + 20px)', previewHeight: 'calc(667px + 52px)'});\n    res.create({value: 'iphone6plus', label: 'iPhone 6 Plus', width: '414px', height: '736px', previewWidth: 'calc(414px + 20px)', previewHeight: 'calc(736px + 52px)'});\n    res.create({value: 'ipad', label: 'iPad', width: '768px', height: '1024px', previewWidth: 'calc(768px + 20px)', previewHeight: 'calc(1024px + 52px)'});\n    res.create({value: 'ipadpro', label: 'iPad Pro', width: '1024px', height: '1366px', previewWidth: 'calc(1024px + 20px)', previewHeight: 'calc(1366px + 52px)'});\n    res.setData('selected', 'full');\n\n    var display = app._state.create('display');\n    display.create({name: 'components', width: '20%', active: true});\n    display.create({name: 'designer', width: '60%', width2: '80%', width3: '100%', active: true});\n    display.create({name: 'properties', width: '20%', active: true});\n\n    var projects = app._state.create('projects');\n    app.js.getProjects();\n  });\n}"
    },
    {
      "name": "log",
      "body": "function() {\n  return;\n  if(typeof app.buildProject !== 'undefined') {\n    if(app.buildProject.build === 'bliss') {\n      var args = Array.prototype.slice.call(arguments);\n      console.log.apply(this, args);\n    }\n\t}\n}"
    }
  ],
  "cssVars": [
    {
      "name": "menuFg",
      "value": "#e0ebf0"
    },
    {
      "name": "menuBg",
      "value": "#313e45"
    },
    {
      "name": "menuHighlight",
      "value": "#0c5c88"
    },
    {
      "name": "headerBg",
      "value": "#698290"
    },
    {
      "name": "menuWarn",
      "value": "#9b0000"
    },
    {
      "name": "lightBg",
      "value": "#dbe2e5"
    }
  ],
  "css": [],
  "load": [
    "init"
  ],
  "components": {
    "1": {
      "id": "1",
      "name": "Bliss UI",
      "element": "div",
      "text": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "min-width",
              "value": "1400px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "111",
      "parent": null
    },
    "2": {
      "id": "2",
      "name": "row",
      "element": "div",
      "text": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "3",
      "parent": "96"
    },
    "3": {
      "id": "3",
      "name": "elements",
      "element": "div",
      "text": null,
      "attributes": [
        {
          "name": "class",
          "value": "float-left"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "#eee;"
            },
            {
              "name": "width",
              "value": "20%"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            },
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "border-right-color",
              "value": "$headerBg"
            },
            {
              "name": "border-right-width",
              "value": "1px"
            },
            {
              "name": "border-right-style",
              "value": "solid"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  var display = app._state.get('display');\n  var show = display.findBy('name', 'components').active;\n  return show;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "4",
      "previous": null,
      "child": "20",
      "parent": "2",
      "ifFn": "shouldShow"
    },
    "4": {
      "id": "4",
      "name": "designer",
      "element": "div",
      "text": null,
      "attributes": [
        {
          "name": "id",
          "value": "designer"
        },
        {
          "name": "className",
          "value": "float-left"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "width",
              "value": "60%"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var designer = app._state.get('display').findBy('name', 'designer');\n  var properties = app._state.get('display').findBy('name', 'properties');\n  var components = app._state.get('display').findBy('name', 'components');\n  \n  var newWidth = designer.width;\n  \n  if(!properties.active && !components.active) {\n    newWidth = designer.width3;\n  } else if(!properties.active || !components.active) {\n    newWidth = designer.width2;\n  }\n  \n  var styles = {\n    'width': newWidth\n  };\n  \n  return styles;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyles"
        }
      ],
      "next": "77",
      "previous": "3",
      "child": "80",
      "parent": "2"
    },
    "11": {
      "id": "11",
      "name": "bliss properties",
      "element": "BlissProperties.component",
      "text": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [
        {
          "name": "setComponentProp",
          "body": "function(scope, props) {\n  var internal = app._state.get('internal');\n  return app.buildProject.components[internal.getData('activeComponent')];\n}"
        },
        {
          "name": "setOnChangeProp",
          "body": "function(scope, props) {\n  return function(newComponent) {\n    var internal = app._state.get('internal');\n  \tvar activeComponent = internal.getData('activeComponent');\n    app.js.update(function() {\n      app.buildProject.components[activeComponent] = newComponent;\n    });\n  }\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "component",
          "value": "setComponentProp"
        },
        {
          "name": "onChange",
          "value": "setOnChangeProp"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "151"
    },
    "17": {
      "id": "17",
      "name": "designerIframe",
      "element": "iframe",
      "designMode": false,
      "text": null,
      "attributes": [
        {
          "name": "id",
          "value": "preview"
        },
        {
          "name": "src",
          "value": "about:blank"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "width",
              "value": "100%"
            },
            {
              "name": "height",
              "value": "99%"
            },
            {
              "name": "border",
              "value": "none"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var styles = {\n    width: '100%',\n    height: 'calc(100vh - 50px)'\n  };\n  \n  var res = app._state.get('res');\n  var selected = res.findBy('value', res.getData('selected'));\n  \n  styles.width = selected.width;\n  styles.height = selected.height;\n  \n  return styles;\n}"
        },
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  return (app.state.shouldBuild === true);\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyles"
        }
      ],
      "next": null,
      "previous": "204",
      "child": null,
      "parent": "205",
      "ifFn": "shouldShow"
    },
    "18": {
      "id": "18",
      "name": "Element Tree",
      "element": "BlissTree.component",
      "text": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [
        {
          "name": "setDataProp",
          "body": "function(scope, props){\n  return app.buildProject;\n}"
        },
        {
          "name": "setOnSelectProp",
          "body": "function(scope, props) {\n  return function(id) {\n    app.js.selectComponent(id);\n  };\n}"
        },
        {
          "name": "setOnCreateProp",
          "body": "function(scope, props) {\n  return function(toId) {\n    var proj = BlissTree.createComponent(app.buildProject, toId);\n    app.js.update(function() { app.buildProject = proj; });\n  };\n}"
        },
        {
          "name": "setOnCloneProp",
          "body": "function(scope, props) {\n  return function(cloneId) {\n    var proj = BlissTree.cloneComponent(app.buildProject, cloneId);\n    app.js.update(function() { app.buildProject = proj; });\n  };\n}"
        },
        {
          "name": "setOnDeleteProp",
          "body": "function(scope, props) {\n  return function(id) {\n    var proj = BlissTree.deleteComponent(app.buildProject, id);\n    app.js.update(function() { app.buildProject = proj; });\n  };\n}"
        },
        {
          "name": "setOnMoveProp",
          "body": "function(scope, props) {\n  return function(fromId, toId, shouldBeChild) {\n    var proj = BlissTree.moveComponent(app.buildProject, fromId, toId, shouldBeChild);\n    app.js.update(function() { app.buildProject = proj; });\n  }\n}"
        },
        {
          "name": "setThis",
          "body": "function(scope, props) {\n  var that = app;\n  return function() {\n    return that;\n  };\n}"
        },
        {
          "name": "getSelected",
          "body": "function(scope, attributes) {\n  var selected = app._state.get('internal').getData('activeComponent');\n  return selected;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "data",
          "value": "setDataProp"
        },
        {
          "name": "onSelect",
          "value": "setOnSelectProp"
        },
        {
          "name": "onCreate",
          "value": "setOnCreateProp"
        },
        {
          "name": "onClone",
          "value": "setOnCloneProp"
        },
        {
          "name": "onDelete",
          "value": "setOnDeleteProp"
        },
        {
          "name": "onMove",
          "value": "setOnMoveProp"
        },
        {
          "name": "_this",
          "value": "setThis"
        },
        {
          "name": "selected",
          "value": "getSelected"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "110"
    },
    "20": {
      "id": "20",
      "name": "Elements header",
      "element": "h3",
      "text": "Elements",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "12pt"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "margin",
              "value": "0"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            }
          ]
        }
      ],
      "dynamicAttributes": [],
      "js": [],
      "next": "110",
      "previous": null,
      "child": null,
      "parent": "3"
    },
    "54": {
      "id": "54",
      "name": "JS Editor",
      "element": "div",
      "text": null,
      "attributes": [
        {
          "name": "id",
          "value": "jsEditor"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            },
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "js": [
        {
          "name": "getStyle",
          "body": "function() {\n  var selected = app._state.get('view').getData('selected');\n  var displayValue = (selected === 'js') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "next": "97",
      "previous": "80",
      "child": "55",
      "parent": "4",
      "ifFn": ""
    },
    "55": {
      "id": "55",
      "name": "h3Js",
      "element": "h3",
      "text": "",
      "attributes": [
        {
          "name": "id",
          "value": "h3Js"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "dynamicAttributes": [],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var internal = app._state.get('internal');\n  var activeComponent = internal.getData('activeComponent');\n  return (app.buildProject.components[activeComponent].name || '') + \" - JS\";\n};\n"
        }
      ],
      "next": "56",
      "previous": null,
      "child": null,
      "parent": "54",
      "textFn": "getText"
    },
    "56": {
      "id": "56",
      "name": "code",
      "element": "div",
      "text": "",
      "attributes": [
        {
          "name": "id",
          "value": "code"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background",
              "value": "#fff"
            },
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "height",
              "value": "auto"
            }
          ]
        }
      ],
      "dynamicAttributes": [],
      "js": [],
      "next": null,
      "previous": "55",
      "child": "79",
      "parent": "54"
    },
    "77": {
      "id": "77",
      "name": "properties",
      "element": "div",
      "text": null,
      "attributes": [
        {
          "name": "id",
          "value": "propertiesContainer"
        },
        {
          "name": "className",
          "value": "float-left"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "#eee"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            },
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "width",
              "value": "20%"
            },
            {
              "name": "border-left-color",
              "value": "$headerBg"
            },
            {
              "name": "border-left-style",
              "value": "solid"
            },
            {
              "name": "border-left-width",
              "value": "1px"
            }
          ]
        }
      ],
      "dynamicAttributes": [],
      "js": [
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  var display = app._state.get('display');\n  var show = display.findBy('name', 'properties').active;\n  return show;\n}"
        }
      ],
      "next": null,
      "previous": "4",
      "child": "182",
      "parent": "2",
      "ifFn": "shouldShow"
    },
    "79": {
      "id": "79",
      "name": "Bliss JavaScript",
      "element": "BlissJavascript.component",
      "text": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [
        {
          "name": "setComponentProp",
          "body": "function(scope, props) {\n  var internal = app._state.get('internal');\n  var activeComponent = internal.getData('activeComponent');\n  return app.buildProject.components[activeComponent];\n}"
        },
        {
          "name": "setOnChangeProp",
          "body": "function(scope, props) {\n  return function(newComponent) {\n    app.js.update(function() {\n      var internal = app._state.get('internal');\n  \t\tvar activeComponent = internal.getData('activeComponent');\n      app.buildProject.components[activeComponent] = newComponent;\n    });\n  }\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "component",
          "value": "setComponentProp"
        },
        {
          "name": "onChange",
          "value": "setOnChangeProp"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "56"
    },
    "80": {
      "id": "80",
      "name": "Designer Container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$lightBg"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyle",
          "body": "function() {\n  var selected = app._state.get('view').getData('selected');\n  var displayValue = (selected === 'designer') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "54",
      "previous": null,
      "child": "205",
      "parent": "4"
    },
    "85": {
      "id": "85",
      "name": "new project",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "newButton"
        },
        {
          "name": "className",
          "value": "dropdown-item"
        },
        {
          "name": "href",
          "value": "#"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-right",
              "value": "5px"
            },
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "font-size",
              "value": "10pt"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.js.createNewProject();\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "158",
      "previous": null,
      "child": "163",
      "parent": "107"
    },
    "88": {
      "id": "88",
      "name": "Project options",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "float-left"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-left",
              "value": "15px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "101",
      "previous": "181",
      "child": "105",
      "parent": "111"
    },
    "93": {
      "id": "93",
      "name": "save button",
      "element": "button",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "saveButton"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "background-color",
              "value": "$menuBg"
            },
            {
              "name": "border-color",
              "value": "$menuBg"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "saveProject",
          "body": "function() {\n  var comp = this;\n  var proj = app.buildProject;\n  var data = JSON.stringify(proj);\n  comp.setStatus('Saving project ' + proj.name + '...');\n  \n  $.ajax({\n    type: 'POST',\n    url: '/save',\n    data: data,\n    success: function(data) {\n      comp.setStatus('Saved project ' + proj.name + '.');\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var comp = this;\n  return function(e) {\n    comp.saveProject();\n  }\n};"
        },
        {
          "name": "setStatus",
          "body": "function(message) {\n  app.setState(function() {\n    app.state.shouldSave = false;\n  \tapp.state.status = message;\n  });\n}"
        },
        {
          "name": "getClass",
          "body": "function(scope, attributes) {\n  if(app.state.shouldSave === true) {\n    return \"btn btn-primary btn-sm\";\n  } else {\n    return \"btn btn-default btn-sm\";\n  }\n}"
        },
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var styles = {};\n  if(app.state.shouldSave === true) {\n  \tstyles.backgroundColor = app.js.getCssVar('$menuWarn');\n    styles.borderColor = app.js.getCssVar('$menuWarn');\n  }\n  return styles;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        },
        {
          "name": "className",
          "value": "getClass"
        },
        {
          "name": "style",
          "value": "getStyles"
        }
      ],
      "next": "201",
      "previous": "105",
      "child": "94",
      "parent": "88"
    },
    "94": {
      "id": "94",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "className",
          "value": "fa fa-floppy-o"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "93"
    },
    "95": {
      "id": "95",
      "name": "status bar",
      "element": "div",
      "text": "",
      "textFn": "showStatus",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "statusBar"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "position",
              "value": "fixed"
            },
            {
              "name": "bottom",
              "value": "0"
            },
            {
              "name": "border-top",
              "value": "solid 3px #ddd"
            },
            {
              "name": "left",
              "value": "0"
            },
            {
              "name": "right",
              "value": "0"
            },
            {
              "name": "font-size",
              "value": ".8em"
            },
            {
              "name": "background-color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "5px 10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "showStatus",
          "body": "function(scope, attributes) {\n  return app.state.status || 'Ready.';\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "96",
      "child": null,
      "parent": "1"
    },
    "96": {
      "id": "96",
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
              "name": "margin-top",
              "value": "48px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "95",
      "previous": "111",
      "child": "2",
      "parent": "1"
    },
    "97": {
      "id": "97",
      "name": "Settings Editor",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "",
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "generalEditor"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            },
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyle",
          "body": "function() {\n  var selected = app._state.get('view').getData('selected');\n  var displayValue = (selected === 'settings') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "179",
      "previous": "54",
      "child": "98",
      "parent": "4"
    },
    "98": {
      "id": "98",
      "name": "settings header",
      "element": "h3",
      "text": "Settings",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "h3General"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "199",
      "previous": null,
      "child": null,
      "parent": "97"
    },
    "101": {
      "id": "101",
      "name": "View container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "className",
          "value": "pull-left"
        },
        {
          "name": "id",
          "value": "toggleContent"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-left",
              "value": "15px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "147",
      "previous": "88",
      "child": "189",
      "parent": "111"
    },
    "102": {
      "id": "102",
      "name": "project name",
      "element": "input",
      "text": null,
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "form-control pull-left input-sm"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "width",
              "value": "50%"
            },
            {
              "name": "margin-left",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.buildProject.name;\n};\n"
        },
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.setState(function() {\n      app.state.shouldSave = true;\n      app.buildProject.name = e.target.value;\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onChange",
          "value": "handleChange"
        },
        {
          "name": "value",
          "value": "getValue"
        }
      ],
      "next": "196",
      "previous": "103",
      "child": null,
      "parent": "199"
    },
    "103": {
      "id": "103",
      "name": "name label",
      "element": "span",
      "text": "Project name: ",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "pull-left"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-top",
              "value": "8px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "102",
      "previous": null,
      "child": null,
      "parent": "199"
    },
    "104": {
      "id": "104",
      "name": "export project",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "exportButton"
        },
        {
          "name": "href",
          "value": "#"
        },
        {
          "name": "className",
          "value": "dropdown-item"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "margin-right",
              "value": "5px"
            },
            {
              "name": "font-size",
              "value": "10pt"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var comp = this;\n  return function(e) {\n    comp.createProjectDist();\n  }\n};"
        },
        {
          "name": "setStatus",
          "body": "function(message) {\n  app.setState(function() {\n  \tapp.state.status = message;\n  });\n}"
        },
        {
          "name": "createProjectDist",
          "body": "function() {\n  var comp = this;\n  var proj = app.buildProject;\n  var data = JSON.stringify(proj);\n  comp.setStatus('Exporting project ' + proj.name + '...');\n  \n  $.ajax({\n    type: 'POST',\n    url: '/dist',\n    data: data,\n    success: function(data) {\n      comp.setStatus('Finished export of project ' + proj.name + '.');\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": "190",
      "child": "167",
      "parent": "107"
    },
    "105": {
      "id": "105",
      "name": "project dropdown",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "projectDropdown"
        },
        {
          "name": "className",
          "value": "btn-group"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-right",
              "value": "5px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "93",
      "previous": null,
      "child": "106",
      "parent": "88"
    },
    "106": {
      "id": "106",
      "name": "dropdown button",
      "element": "button",
      "text": "Projects",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "type",
          "value": "button"
        },
        {
          "name": "data-toggle",
          "value": "dropdown"
        },
        {
          "name": "className",
          "value": "btn btn-default dropdown-toggle btn-sm"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$menuBg"
            },
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "outline",
              "value": "0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "107",
      "previous": null,
      "child": null,
      "parent": "105"
    },
    "107": {
      "id": "107",
      "name": "options",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "className",
          "value": "dropdown-menu"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "106",
      "child": "85",
      "parent": "105"
    },
    "108": {
      "id": "108",
      "name": "proj js",
      "element": "BlissJavascript.component",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [
        {
          "name": "setComponentProp",
          "body": "function(scope, props) {\n  return app.buildProject;\n}"
        },
        {
          "name": "setOnChangeProp",
          "body": "function(scope, props) {\n  return function(newComponent) {\n    app.js.update(function() {\n      app.buildProject.js = newComponent.js;\n    });\n  }\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "component",
          "value": "setComponentProp"
        },
        {
          "name": "onChange",
          "value": "setOnChangeProp"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "137"
    },
    "109": {
      "id": "109",
      "name": "global js header",
      "element": "h3",
      "text": "Global JavaScript",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "h3GeneralJs"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "137",
      "previous": null,
      "child": null,
      "parent": "179"
    },
    "110": {
      "id": "110",
      "name": "Tree Container",
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
              "name": "position",
              "value": "relative"
            },
            {
              "name": "display",
              "value": "block"
            },
            {
              "name": "height",
              "value": "calc(100vh - 117px)"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "20",
      "child": "18",
      "parent": "3"
    },
    "111": {
      "id": "111",
      "name": "main navigation",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "mainNav"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "position",
              "value": "absolute"
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
            },
            {
              "name": "z-index",
              "value": "100"
            },
            {
              "name": "background-color",
              "value": "#263036"
            },
            {
              "name": "border-bottom",
              "value": "solid 5px #435560"
            },
            {
              "name": "padding",
              "value": "7px 14px"
            },
            {
              "name": "height",
              "value": "auto"
            },
            {
              "name": "min-width",
              "value": "1400px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "96",
      "previous": null,
      "child": "181",
      "parent": "1"
    },
    "135": {
      "id": "135",
      "name": "script properties",
      "element": "BlissPropertiesGeneric.component",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [
        {
          "name": "setObjectContainer",
          "body": "function(scope, props) {\n  return app.buildProject;\n};\n"
        },
        {
          "name": "setObjectKey",
          "body": "function(scope, props) {\n  return \"externalJs\";\n};\n"
        },
        {
          "name": "setObjectType",
          "body": "function(scope, props) {\n  return \"primitive\";\n};\n"
        },
        {
          "name": "setOnChange",
          "body": "function(scope, attributes) {\n  return function(newExternalJs) {\n    app.js.update(function() {\n      app.buildProject.externalJs = newExternalJs;\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "objectContainer",
          "value": "setObjectContainer"
        },
        {
          "name": "objectKey",
          "value": "setObjectKey"
        },
        {
          "name": "objectType",
          "value": "setObjectType"
        },
        {
          "name": "onChange",
          "value": "setOnChange"
        }
      ],
      "next": null,
      "previous": "136",
      "child": null,
      "parent": "226"
    },
    "136": {
      "id": "136",
      "name": "scripts header",
      "element": "h3",
      "text": "Scripts",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "margin-top",
              "value": "15px"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "135",
      "previous": "139",
      "child": null,
      "parent": "226"
    },
    "137": {
      "id": "137",
      "name": "general js editor container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "109",
      "child": "108",
      "parent": "179"
    },
    "138": {
      "id": "138",
      "name": "stylesheet header",
      "element": "h3",
      "text": "Stylesheets",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "margin-top",
              "value": "15px"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "139",
      "previous": "156",
      "child": null,
      "parent": "226"
    },
    "139": {
      "id": "139",
      "name": "stylesheet properties",
      "element": "BlissPropertiesGeneric.component",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [
        {
          "name": "setObjectContainer",
          "body": "function(scope, props) {\n  return app.buildProject;\n};\n"
        },
        {
          "name": "setObjectKey",
          "body": "function(scope, props) {\n  return \"externalCss\";\n};\n"
        },
        {
          "name": "setObjectType",
          "body": "function(scope, props) {\n  return \"primitive\";\n};\n"
        },
        {
          "name": "setOnChange",
          "body": "function(scope, attributes) {\n  return function(newExternalCss) {\n    app.js.update(function() {\n      app.buildProject.externalCss = newExternalCss;\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "objectContainer",
          "value": "setObjectContainer"
        },
        {
          "name": "objectKey",
          "value": "setObjectKey"
        },
        {
          "name": "objectType",
          "value": "setObjectType"
        },
        {
          "name": "onChange",
          "value": "setOnChange"
        }
      ],
      "next": "136",
      "previous": "138",
      "child": null,
      "parent": "226"
    },
    "140": {
      "id": "140",
      "name": "global css vars header",
      "element": "h3",
      "text": "Global CSS Vars",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "141",
      "previous": null,
      "child": null,
      "parent": "225"
    },
    "141": {
      "id": "141",
      "name": "global css vars",
      "element": "BlissPropertiesGeneric.component",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [
        {
          "name": "setObjectContainer",
          "body": "function(scope, props) {\n  return app.buildProject;\n};\n"
        },
        {
          "name": "setObjectKey",
          "body": "function(scope, props) {\n  return \"cssVars\";\n};\n"
        },
        {
          "name": "setObjectType",
          "body": "function(scope, props) {\n  return \"object\";\n};\n"
        },
        {
          "name": "setOnChange",
          "body": "function(scope, attributes) {\n  return function(newCssVars) {\n    app.js.update(function() {\n      app.buildProject.cssVars = newCssVars;\n    });\n  }\n};\n"
        },
        {
          "name": "setItemKey",
          "body": "function(scope, attributes) {\n  return \"name\";\n}"
        },
        {
          "name": "setItemValue",
          "body": "function(scope, attributes) {\n  return \"value\";\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "objectContainer",
          "value": "setObjectContainer"
        },
        {
          "name": "objectKey",
          "value": "setObjectKey"
        },
        {
          "name": "objectType",
          "value": "setObjectType"
        },
        {
          "name": "onChange",
          "value": "setOnChange"
        },
        {
          "name": "itemKey",
          "value": "setItemKey"
        },
        {
          "name": "itemValue",
          "value": "setItemValue"
        }
      ],
      "next": null,
      "previous": "140",
      "child": null,
      "parent": "225"
    },
    "142": {
      "id": "142",
      "name": "packages header",
      "element": "h3",
      "text": "node packages (name, version)",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "143",
      "previous": null,
      "child": null,
      "parent": "227"
    },
    "143": {
      "id": "143",
      "name": "packages properties",
      "element": "BlissPropertiesGeneric.component",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [
        {
          "name": "setObjectContainer",
          "body": "function(scope, props) {\n  return app.buildProject;\n};\n"
        },
        {
          "name": "setObjectKey",
          "body": "function(scope, props) {\n  return \"packages\";\n};\n"
        },
        {
          "name": "setObjectType",
          "body": "function(scope, props) {\n  return \"object\";\n};\n"
        },
        {
          "name": "setOnChange",
          "body": "function(scope, attributes) {\n  return function(newPackages) {\n    app.js.update(function() {\n      app.buildProject.packages = newPackages;\n    });\n  }\n};\n"
        },
        {
          "name": "setItemKey",
          "body": "function(scope, attributes) {\n  return \"name\";\n}"
        },
        {
          "name": "setItemValue",
          "body": "function(scope, attributes) {\n  return \"version\";\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "objectContainer",
          "value": "setObjectContainer"
        },
        {
          "name": "objectKey",
          "value": "setObjectKey"
        },
        {
          "name": "objectType",
          "value": "setObjectType"
        },
        {
          "name": "onChange",
          "value": "setOnChange"
        },
        {
          "name": "itemKey",
          "value": "setItemKey"
        },
        {
          "name": "itemValue",
          "value": "setItemValue"
        }
      ],
      "next": null,
      "previous": "142",
      "child": null,
      "parent": "227"
    },
    "147": {
      "id": "147",
      "name": "Resolution container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "pull-left"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-left",
              "value": "15px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "187",
      "previous": "101",
      "child": "185",
      "parent": "111"
    },
    "150": {
      "id": "150",
      "name": "Show Elements",
      "element": "button",
      "text": "Elements",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "margin-left",
              "value": "5px"
            },
            {
              "name": "background-color",
              "value": "$menuBg"
            },
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "border-color",
              "value": "$menuBg"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getClass",
          "body": "function() {\n  var show = app._state.get('display').findBy('name', 'components').active;\n  if(show === true) {\n    return \"btn btn-sm btn-primary\";\n  } else {\n    return \"btn btn-sm btn-default\";\n  }\n}"
        },
        {
          "name": "setContentValue",
          "body": "function() {\n  return function() {\n    var components = app._state.get('display').findBy('name', 'components');\n    app.setState(function() {\n      app._state.get('display').update(components.id, {active: !components.active});\n  \t});\n  };\n}"
        },
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var styles = {};\n  var show = app._state.get('display').findBy('name', 'components').active;\n  if(show === true) {\n  \tstyles.backgroundColor = app.js.getCssVar('$menuHighlight');\n    styles.borderColor = app.js.getCssVar('$menuHighlight');\n  }\n  return styles;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "setContentValue"
        },
        {
          "name": "className",
          "value": "getClass"
        },
        {
          "name": "style",
          "value": "getStyles"
        }
      ],
      "next": "157",
      "previous": "188",
      "child": null,
      "parent": "187"
    },
    "151": {
      "id": "151",
      "name": "properties padding",
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
              "name": "padding",
              "value": "5px"
            },
            {
              "name": "position",
              "value": "relative"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "182",
      "child": "11",
      "parent": "77"
    },
    "152": {
      "id": "152",
      "name": "color picker",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "pull-right"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "width",
              "value": "153px"
            },
            {
              "name": "overflow",
              "value": "hidden"
            },
            {
              "name": "height",
              "value": "29px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "186",
      "previous": "187",
      "child": "153",
      "parent": "111"
    },
    "153": {
      "id": "153",
      "name": "input text",
      "element": "input",
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
              "value": "110px"
            },
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "background-color",
              "value": "$menuBg"
            },
            {
              "name": "border",
              "value": "none"
            },
            {
              "name": "padding",
              "value": "4px 5px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  var color = app._state.get('color');\n  return color.getData('currentColor');\n}"
        },
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    var color = app._state.get('color');\n    app.setState(function() {\n      color.setData('currentColor', e.target.value);\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "value",
          "value": "getValue"
        },
        {
          "name": "onChange",
          "value": "handleChange"
        }
      ],
      "next": "154",
      "previous": null,
      "child": null,
      "parent": "152"
    },
    "154": {
      "id": "154",
      "name": "input color",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "type",
          "value": "color"
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
              "name": "-webkit-appearance",
              "value": "none"
            },
            {
              "name": "background-color",
              "value": "transparent"
            },
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "height",
              "value": "46px"
            },
            {
              "name": "width",
              "value": "46px"
            },
            {
              "name": "margin",
              "value": "-13px 0 -14px -3px"
            },
            {
              "name": "overflow",
              "value": "hidden"
            },
            {
              "name": "padding",
              "value": "0px"
            },
            {
              "name": "top",
              "value": "5px"
            },
            {
              "name": "display",
              "value": "inline-block"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.setState(function() {\n      var color = app._state.get('color');\n      color.setData('currentColor', e.target.value);\n    });\n  };\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  var color = app._state.get('color');\n  return color.getData('currentColor');\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onChange",
          "value": "handleChange"
        },
        {
          "name": "value",
          "value": "getValue"
        }
      ],
      "next": null,
      "previous": "153",
      "child": null,
      "parent": "152"
    },
    "155": {
      "id": "155",
      "name": "load header",
      "element": "h3",
      "text": "Page Load Functions",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "156",
      "previous": null,
      "child": null,
      "parent": "226"
    },
    "156": {
      "id": "156",
      "name": "load functions",
      "element": "BlissPropertiesGeneric.component",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [
        {
          "name": "setObjectContainer",
          "body": "function(scope, props) {\n  return app.buildProject;\n};\n"
        },
        {
          "name": "setObjectKey",
          "body": "function(scope, props) {\n  return \"load\";\n};\n"
        },
        {
          "name": "setObjectType",
          "body": "function(scope, props) {\n  return \"primitive\";\n};\n"
        },
        {
          "name": "setOnChange",
          "body": "function(scope, attributes) {\n  return function(newLoad) {\n    app.js.update(function() {\n      app.buildProject.load = newLoad;\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "objectContainer",
          "value": "setObjectContainer"
        },
        {
          "name": "objectKey",
          "value": "setObjectKey"
        },
        {
          "name": "objectType",
          "value": "setObjectType"
        },
        {
          "name": "onChange",
          "value": "setOnChange"
        }
      ],
      "next": "138",
      "previous": "155",
      "child": null,
      "parent": "226"
    },
    "157": {
      "id": "157",
      "name": "Show Properties",
      "element": "button",
      "text": "Properties",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "margin-left",
              "value": "5px"
            },
            {
              "name": "background-color",
              "value": "$menuBg"
            },
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "border-color",
              "value": "$menuBg"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getClass",
          "body": "function() {\n  var show = app._state.get('display').findBy('name', 'properties').active;\n  if(show === true) {\n    return \"btn btn-sm btn-primary\";\n  } else {\n    return \"btn btn-sm btn-default\";\n  }\n}"
        },
        {
          "name": "setContentValue",
          "body": "function() {\n  return function() {\n    var properties = app._state.get('display').findBy('name', 'properties');\n    app.setState(function() {\n      app._state.get('display').update(properties.id, {active: !properties.active});\n  \t});\n  };\n}"
        },
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var styles = {};\n  var show = app._state.get('display').findBy('name', 'properties').active;\n  if(show === true) {\n  \tstyles.backgroundColor = app.js.getCssVar('$menuHighlight');\n    styles.borderColor = app.js.getCssVar('$menuHighlight');\n  }\n  return styles;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "setContentValue"
        },
        {
          "name": "className",
          "value": "getClass"
        },
        {
          "name": "style",
          "value": "getStyles"
        }
      ],
      "next": null,
      "previous": "150",
      "child": null,
      "parent": "187"
    },
    "158": {
      "id": "158",
      "name": "divider",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "dropdown-divider"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "162",
      "previous": "85",
      "child": null,
      "parent": "107"
    },
    "159": {
      "id": "159",
      "name": "divider 2",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "dropdown-divider"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "194",
      "previous": "161",
      "child": null,
      "parent": "107"
    },
    "161": {
      "id": "161",
      "name": "existing project",
      "element": "a",
      "text": "",
      "textFn": "",
      "ifFn": null,
      "repeatFn": "repeater",
      "attributes": [
        {
          "name": "href",
          "value": "#"
        },
        {
          "name": "className",
          "value": "dropdown-item"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-right",
              "value": "5px"
            },
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "font-size",
              "value": "10pt"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  return app._state.get('projects').getAll();\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index].name;\n};\n"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var project = scope.repeater[scope.repeater_index].name;\n  return function(e) {\n    app.setState(function() {\n      app.js.loadProject(project);\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "159",
      "previous": "162",
      "child": "166",
      "parent": "107"
    },
    "162": {
      "id": "162",
      "name": "existing project labels",
      "element": "h6",
      "text": "Open project",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "dropdown-header"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "10px"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "161",
      "previous": "158",
      "child": null,
      "parent": "107"
    },
    "163": {
      "id": "163",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-plus"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "164",
      "previous": null,
      "child": null,
      "parent": "85"
    },
    "164": {
      "id": "164",
      "name": "label",
      "element": "span",
      "text": "New project",
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
              "value": "inline-block"
            },
            {
              "name": "margin-left",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "163",
      "child": null,
      "parent": "85"
    },
    "165": {
      "id": "165",
      "name": "label",
      "element": "span",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "display",
              "value": "inline-block"
            },
            {
              "name": "margin-left",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index].name;\n};"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "166",
      "child": null,
      "parent": "161"
    },
    "166": {
      "id": "166",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-file-o"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "165",
      "previous": null,
      "child": null,
      "parent": "161"
    },
    "167": {
      "id": "167",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-download"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "168",
      "previous": null,
      "child": null,
      "parent": "104"
    },
    "168": {
      "id": "168",
      "name": "label",
      "element": "span",
      "text": "Export project",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "display",
              "value": "inline-block"
            },
            {
              "name": "margin-left",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "167",
      "child": null,
      "parent": "104"
    },
    "179": {
      "id": "179",
      "name": "Global Javascript Editor",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            },
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyle",
          "body": "function() {\n  var selected = app._state.get('view').getData('selected');\n  var displayValue = (selected === 'global_js') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "180",
      "previous": "97",
      "child": "109",
      "parent": "4"
    },
    "180": {
      "id": "180",
      "name": "Global CSS Editor",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            },
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyle",
          "body": "function() {\n  var selected = app._state.get('view').getData('selected');\n  var displayValue = (selected === 'global_css') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "225",
      "previous": "179",
      "child": "223",
      "parent": "4"
    },
    "181": {
      "id": "181",
      "name": "app header",
      "element": "div",
      "text": "Bliss UI",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "pull-left"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "display",
              "value": "inline-block"
            },
            {
              "name": "font-size",
              "value": "14pt"
            },
            {
              "name": "font-weight",
              "value": "bold"
            },
            {
              "name": "color",
              "value": "#5fc0ec"
            },
            {
              "name": "padding-top",
              "value": "1px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "88",
      "previous": null,
      "child": null,
      "parent": "111"
    },
    "182": {
      "id": "182",
      "name": "Property header",
      "element": "h3",
      "text": "properties",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "12pt"
            },
            {
              "name": "background-color",
              "value": "#698290"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "margin",
              "value": "0"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            }
          ]
        }
      ],
      "dynamicAttributes": [],
      "js": [],
      "next": "151",
      "previous": null,
      "child": null,
      "parent": "77"
    },
    "185": {
      "id": "185",
      "name": "resolution label",
      "element": "div",
      "text": "Resolution",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "pull-left"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "margin-right",
              "value": "10px"
            },
            {
              "name": "margin-top",
              "value": "7px"
            },
            {
              "name": "white-space",
              "value": "nowrap"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "233",
      "previous": null,
      "child": null,
      "parent": "147"
    },
    "186": {
      "id": "186",
      "name": "color picker label",
      "element": "div",
      "text": "Color picker",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "pull-right"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "margin-right",
              "value": "10px"
            },
            {
              "name": "margin-top",
              "value": "7px"
            },
            {
              "name": "white-space",
              "value": "nowrap"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "152",
      "child": null,
      "parent": "111"
    },
    "187": {
      "id": "187",
      "name": "Toggle Layout Container",
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
              "name": "margin-left",
              "value": "15px"
            },
            {
              "name": "display",
              "value": "inline-flex"
            },
            {
              "name": "vertical-align",
              "value": "middle"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "152",
      "previous": "147",
      "child": "188",
      "parent": "111"
    },
    "188": {
      "id": "188",
      "name": "layout label",
      "element": "div",
      "text": "Layout",
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
              "value": "$menuFg"
            },
            {
              "name": "margin-right",
              "value": "5px"
            },
            {
              "name": "margin-top",
              "value": "7px"
            },
            {
              "name": "white-space",
              "value": "nowrap"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "150",
      "previous": null,
      "child": null,
      "parent": "187"
    },
    "189": {
      "id": "189",
      "name": "toggle label",
      "element": "div",
      "text": "Current View",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "pull-left"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "margin-top",
              "value": "7px"
            },
            {
              "name": "white-space",
              "value": "nowrap"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "10px"
            },
            {
              "name": "margin-right",
              "value": "5px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "228",
      "previous": null,
      "child": null,
      "parent": "101"
    },
    "190": {
      "id": "190",
      "name": "export component",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "exportButton"
        },
        {
          "name": "href",
          "value": "#"
        },
        {
          "name": "className",
          "value": "dropdown-item"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "margin-right",
              "value": "5px"
            },
            {
              "name": "font-size",
              "value": "10pt"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var comp = this;\n  return function(e) {\n    comp.exportProject();\n  }\n};"
        },
        {
          "name": "setStatus",
          "body": "function(message) {\n  app.setState(function() {\n  \tapp.state.status = message;\n  });\n}"
        },
        {
          "name": "exportProject",
          "body": "function() {\n  var comp = this;\n  var proj = app.buildProject;\n  var data = JSON.stringify(proj);\n  comp.setStatus('Exporting component ' + proj.name + '...');\n  \n  $.ajax({\n    type: 'POST',\n    url: '/export',\n    data: data,\n    success: function(data) {\n      comp.setStatus('Exported component ' + proj.name + '.');\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "104",
      "previous": "194",
      "child": "191",
      "parent": "107"
    },
    "191": {
      "id": "191",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-puzzle-piece"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "192",
      "previous": null,
      "child": null,
      "parent": "190"
    },
    "192": {
      "id": "192",
      "name": "label",
      "element": "span",
      "text": "Export component",
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "display",
              "value": "inline-block"
            },
            {
              "name": "margin-left",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "191",
      "child": null,
      "parent": "190"
    },
    "194": {
      "id": "194",
      "name": "export label",
      "element": "h6",
      "text": "export",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "dropdown-header"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "10px"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "190",
      "previous": "159",
      "child": null,
      "parent": "107"
    },
    "196": {
      "id": "196",
      "name": "delete project",
      "element": "button",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "btn btn-default btn-sm pull-right"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$menuWarn"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "margin-top",
              "value": "6px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "102",
      "child": "197",
      "parent": "199"
    },
    "197": {
      "id": "197",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-trash"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "198",
      "previous": null,
      "child": null,
      "parent": "196"
    },
    "198": {
      "id": "198",
      "name": "delete label",
      "element": "span",
      "text": "Delete project",
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
              "value": "inline-block"
            },
            {
              "name": "margin-left",
              "value": "5px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "197",
      "child": null,
      "parent": "196"
    },
    "199": {
      "id": "199",
      "name": "project details container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "98",
      "child": "103",
      "parent": "97"
    },
    "201": {
      "id": "201",
      "name": "refresh button",
      "element": "button",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "btn btn-default btn-sm"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "cursor",
              "value": "pointer"
            },
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "background-color",
              "value": "$menuBg"
            },
            {
              "name": "border-color",
              "value": "$menuBg"
            },
            {
              "name": "margin-left",
              "value": "5px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    //var iframe = $('#preview');\n    try {\n      //iframe[0].contentWindow.location.reload();\n      $('#preview').attr(\"src\", $('#preview').attr(\"src\"));\n    } catch(e){\n      console.log('Unable to refresh preview iframe', e);\n    }\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": "93",
      "child": "202",
      "parent": "88"
    },
    "202": {
      "id": "202",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "className",
          "value": "fa fa-refresh"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": []
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "201"
    },
    "204": {
      "id": "204",
      "name": "iframe header",
      "element": "h3",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "5px 10px 10px 10px"
            },
            {
              "name": "margin",
              "value": "0"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var res = app._state.get('res');\n  var currentRes = res.findBy('value', res.getData('selected'));\n  return currentRes.label;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "17",
      "previous": null,
      "child": null,
      "parent": "205"
    },
    "205": {
      "id": "205",
      "name": "preview container",
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
              "name": "border-color",
              "value": "$headerBg"
            },
            {
              "name": "border-width",
              "value": "10px"
            },
            {
              "name": "border-style",
              "value": "solid"
            },
            {
              "name": "border-radius",
              "value": "10px"
            },
            {
              "name": "background-color",
              "value": "#fff"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var styles = {\n    width: 'auto',\n    height: 'auto'\n  };\n  \n  var res = app._state.get('res');\n  var selected = res.findBy('value', res.getData('selected'));\n  \n  styles.width = selected.previewWidth;\n  styles.height = selected.previewHeight;\n  \n  return styles;\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyles"
        }
      ],
      "next": null,
      "previous": null,
      "child": "204",
      "parent": "80"
    },
    "223": {
      "id": "223",
      "name": "global css header",
      "element": "h3",
      "text": "Global CSS",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "clearfix"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "1em"
            },
            {
              "name": "background-color",
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#fff"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "224",
      "previous": null,
      "child": null,
      "parent": "180"
    },
    "224": {
      "id": "224",
      "name": "global css",
      "element": "BlissPropertiesCss.component",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "setComponent",
          "body": "function(scope, props) {\n  return app.buildProject;\n};\n"
        },
        {
          "name": "setOnChange",
          "body": "function(scope, attributes) {\n  return function(newBuildProject) {\n    app.js.update(function() {\n      app.buildProject = newBuildProject;\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onChange",
          "value": "setOnChange"
        },
        {
          "name": "component",
          "value": "setComponent"
        }
      ],
      "next": null,
      "previous": "223",
      "child": null,
      "parent": "180"
    },
    "225": {
      "id": "225",
      "name": "CSS Vars Editor",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            },
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyle",
          "body": "function() {\n  var selected = app._state.get('view').getData('selected');\n  var displayValue = (selected === 'css_vars') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "226",
      "previous": "180",
      "child": "140",
      "parent": "4"
    },
    "226": {
      "id": "226",
      "name": "Page Load Editor",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            },
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyle",
          "body": "function() {\n  var selected = app._state.get('view').getData('selected');\n  var displayValue = (selected === 'page_load') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "227",
      "previous": "225",
      "child": "155",
      "parent": "4"
    },
    "227": {
      "id": "227",
      "name": "Packages Editor",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "",
      "repeatFn": null,
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "overflow",
              "value": "auto"
            },
            {
              "name": "height",
              "value": "calc(100vh - 80px)"
            },
            {
              "name": "padding",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyle",
          "body": "function() {\n  var selected = app._state.get('view').getData('selected');\n  var displayValue = (selected === 'node_packages') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": null,
      "previous": "226",
      "child": "142",
      "parent": "4"
    },
    "228": {
      "id": "228",
      "name": "view dropdown",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "projectDropdown"
        },
        {
          "name": "className",
          "value": "btn-group"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-right",
              "value": "5px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "189",
      "child": "229",
      "parent": "101"
    },
    "229": {
      "id": "229",
      "name": "view button",
      "element": "button",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "type",
          "value": "button"
        },
        {
          "name": "data-toggle",
          "value": "dropdown"
        },
        {
          "name": "className",
          "value": "btn btn-default dropdown-toggle btn-sm"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$menuBg"
            },
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "outline",
              "value": "0"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var viewState = app._state.get('view');\n\tvar view = viewState.findBy('name', viewState.getData('selected'));\n  return view.label;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "230",
      "previous": null,
      "child": null,
      "parent": "228"
    },
    "230": {
      "id": "230",
      "name": "view options",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "className",
          "value": "dropdown-menu"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "10pt"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "229",
      "child": "231",
      "parent": "228"
    },
    "231": {
      "id": "231",
      "name": "view item",
      "element": "a",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": "repeater",
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
      "css": [],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  var views = app._state.get('view').getAll();\n  return views;\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index].label;\n}"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var view = app._state.get('view');\n  var name = scope.repeater[scope.repeater_index].name;\n  \n  return function(e) {\n    //var value = e.target.value;\n    app.setState(function() {\n      view.setData('selected', name);\n    });\n  }\n};"
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
      "parent": "230"
    },
    "233": {
      "id": "233",
      "name": "res dropdown",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "projectDropdown"
        },
        {
          "name": "className",
          "value": "btn-group"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-right",
              "value": "5px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "185",
      "child": "234",
      "parent": "147"
    },
    "234": {
      "id": "234",
      "name": "res button",
      "element": "button",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "type",
          "value": "button"
        },
        {
          "name": "data-toggle",
          "value": "dropdown"
        },
        {
          "name": "className",
          "value": "btn btn-default dropdown-toggle btn-sm"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "background-color",
              "value": "$menuBg"
            },
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "outline",
              "value": "0"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var viewState = app._state.get('res');\n\tvar view = viewState.findBy('value', viewState.getData('selected'));\n  return view.label;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "235",
      "previous": null,
      "child": null,
      "parent": "233"
    },
    "235": {
      "id": "235",
      "name": "res options",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "className",
          "value": "dropdown-menu"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "10pt"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "234",
      "child": "236",
      "parent": "233"
    },
    "236": {
      "id": "236",
      "name": "res item",
      "element": "a",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": "repeater",
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
      "css": [],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  var res = app._state.get('res').getAll();\n  return res;\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index].label;\n}"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var view = app._state.get('res');\n  var name = scope.repeater[scope.repeater_index].value;\n  \n  return function(e) {\n    //var value = e.target.value;\n    app.setState(function() {\n      view.setData('selected', name);\n    });\n  }\n};"
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
      "parent": "235"
    }
  }
}
if(typeof module !== "undefined") module.exports = blissProject;