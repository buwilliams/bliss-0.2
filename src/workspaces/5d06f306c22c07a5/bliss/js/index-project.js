var blissProject = {
  "name": "Bliss UI",
  "type": "bliss",
  "build": "designer",
  "compiler": "react",
  "nextId": 327,
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
    "https://cdn.rawgit.com/konpa/devicon/4f6a4b08efdad6bb29f9cc801f5c07e263b39907/devicon.min.css",
    "components/bliss-data/css/bliss-data.css"
  ],
  "externalJs": [
    "node_modules/tether/dist/js/tether.min.js",
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/popper.js/dist/umd/popper.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/codemirror/lib/codemirror.js",
    "node_modules/codemirror/mode/javascript/javascript.js",
    "node_modules/react/dist/react.js",
    "node_modules/react-dom/dist/react-dom.js",
    "node_modules/react-code-mirror/standalone.js",
    "node_modules/lodash/lodash.min.js",
    "components/bliss-utils/js/util-state.js",
    "components/bliss-utils/js/util-tree.js",
    "components/bliss-tree/js/bliss-tree.js",
    "components/bliss-properties/js/bliss-property.js",
    "components/bliss-properties/js/bliss-properties.js",
    "components/bliss-properties/js/bliss-properties-generic.js",
    "components/bliss-properties/js/bliss-properties-css.js",
    "components/bliss-javascript/js/bliss-javascript.js",
    "components/bliss-data/js/bliss-actions.js",
    "components/bliss-data/js/bliss-paths.js",
    "components/bliss-data/js/bliss-data.js"
  ],
  "state": {},
  "packages": [
    {
      "name": "jquery",
      "version": "3.2.1"
    },
    {
      "name": "tether",
      "version": "1.4.0"
    },
    {
      "name": "popper.js",
      "version": "^1.12.5"
    },
    {
      "name": "bootstrap",
      "version": "4.0.0"
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
      "body": "function() {\n  // Start Bliss with Empty Project\n  app.buildProject = newBlissProject\n  app.dispatch({\n    path: '/settings',\n    action: 'set',\n    key: 'activeComponent',\n    value: app.buildProject.rootId\n  })\n app.js.afterAuth()\n app.dispatch({path:'/firebase', action:'setUser', user: {email: 'bliss@blissui.com'}});\n}"
    },
    {
      "name": "build",
      "body": "function(clearState) {\n  app.js.log('app.js.build() invoked.');\n  \n  if(typeof clearState === 'undefined') clearState = false\n  \n  if(app.buildProject.type === \"bliss\") {\n    app.buildProject.build = \"designer\";\n  }\n  \n  var data = JSON.stringify(app.buildProject)\n  var workspace = app.state.settings.workspace\n\n  $.ajax({\n    type: 'POST',\n    url: '/compiler/build?workspace=' + workspace,\n    data: data,\n    success: function(data) {\n      app.js.refreshIframe(clearState);\n    },\n    error: function(jqXHR, textStatus, errorThrown) {\n      console.error('POST /build?workspace=' + workspace,\n                    jqXHR, textStatus, errorThrown);\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
    },
    {
      "name": "selectComponent",
      "body": "function(id) {\n  app.js.log('app.js.selectComponent() invoked.');\n  \n  app.dispatch({\n    path: '/settings',\n    action: 'set',\n    key: 'activeComponent',\n    value: id\n  })\n}"
    },
    {
      "name": "update",
      "body": "function(fn) {\n  app.js.log('app.js.update() invoked.');\n  \n  // execute the update state function\n  // this function should call dispatch internally\n  try {\n    fn();\n  } catch(e) {\n    console.error('app.js.update', e);\n    return;\n  }\n  \n  // reset timer so that it doesn't build too often\n  app.dispatch({\n    path: '/settings',\n    action: 'setTimer',\n    fn: function() {\n    \tif(app.state.settings.shouldReloadProject === true)\n        app.js.saveAndReloadProject();\n      else\n        app.js.build();\n  \t}\n  });\n  \n  // set shouldSave so that the icon lights up\n  app.dispatch({\n    path: '/settings',\n    action: 'set',\n    key: 'shouldSave',\n    value: true\n  });\n}"
    },
    {
      "name": "server",
      "body": "function(path, success, data, requestType) {\n  app.js.log('app.js.server() invoked.');\n  \n  if(_.isNil(data)) data = {};\n  if(_.isNil(requestType)) requestType = 'GET';\n  \n  var workspace = app.state.settings.workspace;\n  \n  $.ajax({\n    type: requestType,\n    url: '/project/' + path + '?workspace=' + workspace,\n    data: data,\n    success: function(data) {\n      success(data);\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
    },
    {
      "name": "getProjects",
      "body": "function(scope, attributes) {  \n  app.js.server('list', function(data) {\n    app.dispatch({\n      path: '/projects',\n      action: 'clear'\n    });\n    \n    app.dispatch({\n      path: '/projects',\n      action: 'addAll',\n      projects: _.map(data.projects, function(item) {\n        return { name: item }\n      })\n    });\n  });\n}"
    },
    {
      "name": "loadProject",
      "body": "function(projectName, shouldConfirm) {\n  app.js.log('app.js.loadProjects() invoked.');\n  if(_.isNil(shouldConfirm)) shouldConfirm = true;\n  if(shouldConfirm === true) {\n  \tif(!confirm('Are you sure you want to load a different page?')) return;\n  }\n  \n  app.setState(function() {\n  \tapp.js.setStatus('Loading project ' + projectName + '...');\n  });\n  \n  app.js.server('load', function(data) {\n    app.setState(function() {\n      app.js.setStatus('Loaded project ' + data.project.name + '.');\n    });\n    \n    app.buildProject = data.project\n  \n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n      key: 'activeComponent',\n      value: app.buildProject.rootId\n    })\n    \n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n      key: 'shouldReloadProject',\n      value: false\n    })\n    \n    app.js.build();\n    app.js.getProjects();\n  }, {name: projectName});\n}"
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
      "body": "function(success) {\n  app.js.log('app.js.saveProject() invoked.');\n  var proj = app.buildProject;\n  var data = JSON.stringify(proj);\n  app.js.setStatus('Saving project ' + proj.name + '...');\n  \n  var workspace = app.state.settings.workspace;\n  \n  app.dispatch({\n    path: '/settings',\n    action: 'set',\n    key: 'shouldSave',\n    value: false\n  })\n  \n  $.ajax({\n    type: 'POST',\n    url: '/project/save?workspace=' + workspace,\n    data: data,\n    success: function(data) {\n      app.js.setStatus('Saved project ' + proj.name + '.');\n      if(!_.isNil(success)) success(data);\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
    },
    {
      "name": "newProject",
      "body": "function(shouldConfirm, pageName) {\n  app.js.log('app.js.newProject() invoked.');\n  if(_.isNil(shouldConfirm)) shouldConfirm = true;\n\n  if(shouldConfirm === true) {\n    if(!confirm('Are you sure you want to create a new page?')) return;\n  }\n  \n  var json = Object.assign({}, newBlissProject);\n  if(typeof pageName !== 'undefined') {\n    var snakeName = app.js.getSnake(pageName);\n  \t//var jsonFilename = snakeName + '.json';\n    json.name = pageName;\n    json.filename = snakeName;\n    json.pageTitle = pageName;\n    json.components[\"1\"].name = pageName;\n  }\n  \n  app.setState(function(){\n    app.buildProject = json;\n\t})\n  \n  app.dispatch({\n    path: '/settings',\n    action: 'set',\n    key: 'activeComponent',\n    value: app.buildProject.rootId\n  })\n  \n  if(typeof pageName !== 'undefined') {\n    app.setState(function() {\n       app.js.saveAndReloadProject();\n    });\n  }\n}"
    },
    {
      "name": "saveAndReloadProject",
      "body": "function() {\n  app.js.log('app.js.saveAndReloadProject() invoked.');\n  // save current json\n  app.js.saveProject(function() {\n    // load project\n    app.js.loadProject(app.buildProject.name, false);\n  });\n}"
    },
    {
      "name": "refreshIframe",
      "body": "function(resetState) {\n  app.js.log('app.js.refreshIframe() invoked.');\n  \n  resetState = (resetState === true) ? true : false\n  \n  if(resetState) {\n    app.dispatch({\n      path: '/preview',\n      action: 'setState',\n      state: {}\n    })\n  } else {\n    app.js.savePreviewState()\n  }\n  \n  var iframe = $('#preview');\n  var currentSrc = iframe.attr('src');\n  if(_.isUndefined(currentSrc)) return;\n  \n  var workspace = app.state.settings.workspace;\n\n  var url = location.origin + \n      '/bliss/designer/' + \n      app.state.firebase.designer_token + \n      '/' +  workspace +  '/' +\n      (app.buildProject.filename || 'designer') +\n      '.html';\n  \n  iframe.attr('src', url);\n}"
    },
    {
      "name": "refresh",
      "body": "function() {\n  app.js.log('app.js.refresh() invoked.');\n  // refresh the project list\n  app.js.getProjects();\n  \n  // refresh iframe\n  //app.js.refreshIframe(true);\n  var clearIframeState = true;\n  app.js.build(clearIframeState);\n}"
    },
    {
      "name": "log",
      "body": "function() {\n  //return;\n  if(typeof app.buildProject !== 'undefined') {\n    if(app.buildProject.build === 'bliss') {\n      var args = Array.prototype.slice.call(arguments);\n      console.log.apply(this, args);\n    }\n\t}\n}"
    },
    {
      "name": "firebaseAuthUI",
      "body": "function() {\n  var ui = app.state.firebase.auth_ui;\n  \n  var config = {\n    callbacks: {\n      signInSuccess: function(currentUser, credential, redirectUrl) {\n        return false;\n      },\n      uiShown: function() {}\n    },\n    signInSuccessUrl: window.location.href,\n    signInOptions: [\n      // Leave the lines as is for the providers you want to offer your users.\n      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,\n      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,\n      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,\n      //firebase.auth.GithubAuthProvider.PROVIDER_ID,\n      firebase.auth.EmailAuthProvider.PROVIDER_ID,\n      //firebase.auth.PhoneAuthProvider.PROVIDER_ID\n    ],\n    // Terms of service url.\n    tosUrl: window.location.href\n  };\n  \n  /*\n  if(ui === null) {\n    // Initialize the FirebaseUI Widget using Firebase.\n    ui = new firebaseui.auth.AuthUI(firebase.auth());\n    app.setState(function() {\n      app.state.ui = ui;\n    });\n  } else {\n    ui = app.state.ui;\n    ui.reset();\n  }\n  */\n  \n  ui.reset();\n  \n  // The start method will wait until the DOM is loaded.\n  ui.start('#firebaseui-auth-container', config);\n}"
    },
    {
      "name": "getSession",
      "body": "function() {\n  $.ajax({\n    type: 'GET',\n    url: '/session',\n    success: function(data) {\n      app.dispatch({\n        'path': '/firebase',\n        'action': 'setSession',\n        'designer_token': data.token,\n        'email': data.email,\n        'username': data.username\n      });\n\n      app.setState(function() {\n        app.js.getProjects();\n      });\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
    },
    {
      "name": "afterAuth",
      "body": "function(scope, attributes) {\n  app.js.log('after auth invoked')\n\n  app.dispatch({\n    path: '/workspaces',\n    action: 'httpListWorkspaces'\n  })\n}"
    },
    {
      "name": "savePreviewState",
      "body": "function(scope, attributes) {\n  app.js.log('app.js.savePreviewState() invoked.');\n  \n  // copied from backend\n  var appName = app.buildProject.name.replace(/[^a-z]/gi, ' ').trim()\n  appName = appName.split(\" \").map(function(word, index) {\n    if(index === 0) {\n      return word.toLowerCase();\n    } else {\n      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();\n    }\n  }).join(\"\");\n  \n  var prevApp = document.getElementById('preview').contentWindow[appName]\n\tvar prevState = {}\n  \n  if(typeof(prevApp) === 'undefined') return;\n\t\n  try {\n    var keys = Object.keys(prevApp.state)\n    keys.forEach(function(key) {\n      try {\n      \tvar stateStr = JSON.stringify(prevApp.state[key])\n        prevState[key] = JSON.parse(stateStr)\n      } catch(e) {\n        console.error('unable to parse state', e)\n      }\n    })\n  } catch(e) {\n    console.error('unable to parse state', e)\n  }\n\n  app.dispatch({\n    path: '/preview',\n    action: 'setState',\n    state: prevState\n  })\n  \n  console.log('saving state', prevState)\n}"
    },
    {
      "name": "reloadSavedState",
      "body": "function(prevApp) {\n  var _app = window.top.blissUi\n  prevApp.setState(function() {\n    try {\n      Object.keys(_app.state.preview.state).forEach(function(key) {\n        var stateStr = JSON.stringify(_app.state.preview.state[key])\n        var value = JSON.parse(stateStr)\n        prevApp.state[key] = value\n        console.log('reloaded state', key, value)\n      })\n    } catch(e) {\n      console.error('reloadSavedState', e)\n    }\n  })\n}"
    },
    {
      "name": "loadWorkspace",
      "body": "function(workspaceName) {\n  app.dispatch({\n    path: '/settings',\n    action: 'set',\n    key: 'activeComponent',\n    value: null\n  });\n\n  app.dispatch({\n    path: '/views',\n    action: 'setView',\n    name: 'designer'\n  });\n\n  app.dispatch({\n    path: '/settings',\n    action: 'set',\n    key: 'workspace',\n    value: workspaceName\n  });\n\n  app.dispatch({\n    path: '/workspaces',\n    action: 'set',\n    key: 'active',\n    value: false\n  });\n\n  app.js.newProject(false);\n  app.js.getProjects();\n}"
    },
    {
      "name": "getSnake",
      "body": "function(str) {\n  var newStr = str.replace(/[^a-z0-9\\s_]/gi, '').trim();\n  newStr = newStr.replace(/\\s/g, '_').toLowerCase();\n  return newStr;\n}"
    },
    {
      "name": "deleteProject",
      "body": "function(scope, attributes) {\n  if(!confirm('Are you sure you want to delete this page?')) return;\n  \n  var workspace = app.state.settings.workspace;\n  \n  $.ajax({\n    type: 'POST',\n    url: '/project/delete?workspace=' + workspace + '&project=' + app.buildProject.name,\n    data: {},\n    success: function(data) {\n      app.js.loadWorkspace(workspace);\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
    },
    {
      "name": "serverImportHtml",
      "body": "function(htmlString) {\n  app.js.log('app.js.serverImportHtml() invoked.');\n  \n  app.js.setStatus('Importing HTML...');\n  \n  var data = JSON.stringify({\n    \"html\": htmlString,\n    \"project\": app.buildProject\n  });\n  \n  var active = app.state.settings.activeComponent;\n  \n  $.ajax({\n    type: 'POST',\n    url: '/project/html' +\n    \t'?workspace=' + app.state.settings.workspace +\n    \t'&parentId=' + app.state.settings.activeComponent,\n    data: data,\n    success: function(data) {\n      app.setState(function() {\n        app.buildProject = data.project\n      });\n      \n      app.dispatch({\n        path: '/settings',\n        action: 'set',\n        key: 'activeComponent',\n        value: active\n      });\n      \n      app.dispatch({\n        path: '/settings',\n        action: 'set',\n        key: 'importHtml',\n        value: ''\n      });\n      \n      app.dispatch({\n        path: '/views',\n        action: 'setView',\n        name: 'designer'\n      });\n      \n      app.js.refreshIframe();\n      \n      app.js.setStatus('Imported HTML.');\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}\n\n\n\n\n"
    },
    {
      "name": "download",
      "body": "function() {\n  app.js.log('app.js.download() invoked.');\n  \n  var url = '/workspace/download?';\n  url += 'xUserToken=' + encodeURIComponent(app.state.firebase.user_token);\n  url += '&workspace=' + app.state.settings.workspace;\n  \n  window.open(url, '_blank');\n}"
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
    },
    {
      "name": "headerFontSize",
      "value": "16px"
    },
    {
      "name": "headerPadding",
      "value": "10px"
    }
  ],
  "css": [],
  "load": [
    "init"
  ],
  "components": {
    "1": {
      "id": "1",
      "name": "Bliss UI v3",
      "element": "div",
      "text": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "242",
      "parent": null
    },
    "3": {
      "id": "3",
      "name": "html",
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
          "body": "function() {\n if(_.isNil(app.state.settings.activeComponent))\n    return false;\n  \n  var list = app.state.layout.list\n  var layout = _.find(list, function(item) {\n  \treturn (item.name === \"components\")})\n  return layout.active\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "4",
      "previous": null,
      "child": "20",
      "parent": "96",
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
          "body": "function(scope, attributes) {\n  var list = app.state.layout.list\n  \n  var designer = _.find(app.state.layout.list,\n\t\tfunction(item) { return (item.name === \"designer\")})\n  var properties = _.find(app.state.layout.list,\n\t\tfunction(item) { return (item.name === \"properties\")})\n  var components = _.find(app.state.layout.list,\n\t\tfunction(item) { return (item.name === \"components\")})\n  \n  var newWidth = designer.width;\n  \n  if(!properties.active && !components.active) {\n    newWidth = designer.width3;\n  } else if(!properties.active || !components.active) {\n    newWidth = designer.width2;\n  }\n  \n  var styles = {\n    'width': newWidth\n  };\n  \n  return styles;\n}"
        },
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  if(_.isNil(app.state.settings.activeComponent))\n    return false;\n  \n  return true\n}"
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
      "parent": "96",
      "ifFn": "shouldShow"
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
          "body": "function(scope, props) {\n  return app.buildProject.components[\n    app.state.settings.activeComponent]\n}"
        },
        {
          "name": "setOnChangeProp",
          "body": "function(scope, props) {\n  return function(newComponent) {\n    app.js.update(function() {\n      app.buildProject.components[\n        app.state.settings.activeComponent] = newComponent;\n    });\n  }\n}"
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
      "previous": "278",
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
          "body": "function(scope, attributes) {\n  var styles = {\n    width: '100%',\n    height: 'calc(100vh - 50px)'\n  };\n  \n  var resolution = _.find(app.state.resolution.list,\n\t\tfunction(item) {\n    \treturn (item.value === app.state.resolution.selected)})\n  \n  styles.width = resolution.width\n  styles.height = resolution.height\n  \n  return styles;\n}"
        },
        {
          "name": "shouldShow",
          "body": "function(scope, attributes) {\n  var selected = app.state.views.selected\n  return (selected === 'designer')\n}"
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
      "ifFn": ""
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
          "body": "function(scope, props) {\n  return function(id) {\n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n      key: 'activeComponent',\n      value: id\n    })\n  };\n}"
        },
        {
          "name": "setOnCreateProp",
          "body": "function(scope, props) {\n  return function(toId) {\n    var proj = UtilTree.createComponent(\n      app.buildProject, toId);\n    app.js.update(function() { app.buildProject = proj; });\n  };\n}"
        },
        {
          "name": "setOnCloneProp",
          "body": "function(scope, props) {\n  return function(cloneId) {\n    var proj = UtilTree.cloneComponent(app.buildProject, cloneId);\n    app.js.update(function() { app.buildProject = proj; });\n  };\n}"
        },
        {
          "name": "setOnDeleteProp",
          "body": "function(scope, props) {\n  return function(id) {\n    var proj = UtilTree.deleteComponent(app.buildProject, id);\n    app.js.update(function() { app.buildProject = proj; });\n  };\n}"
        },
        {
          "name": "setOnMoveProp",
          "body": "function(scope, props) {\n  return function(fromId, toId, shouldBeChild) {\n    var proj = UtilTree.moveComponent(\n      app.buildProject, fromId, toId, shouldBeChild);\n    app.js.update(function() {\n      app.buildProject = proj;\n    });\n  }\n}"
        },
        {
          "name": "setThis",
          "body": "function(scope, props) {\n  var that = app;\n  return function() {\n    return that;\n  };\n}"
        },
        {
          "name": "getSelected",
          "body": "function(scope, attributes) {\n  return app.state.settings.activeComponent\n}"
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
      "text": "HTML",
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'js') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "next": "238",
      "previous": "314",
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
          "body": "function(scope, attributes) {\n  var title = 'JS'\n  var name = ''\n  try {\n    name = app.buildProject.components[\n      app.state.settings.activeComponent].name + ' - '\n  } catch(e) { console.error(e) }\n  return name + title\n};\n"
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
              "value": "scroll"
            },
            {
              "name": "height",
              "value": "calc(100vh - 150px)"
            }
          ]
        },
        {
          "selector": "$id .CodeMirror",
          "properties": [
            {
              "name": "height",
              "value": "100%"
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
          "body": "function(scope, attributes) {\n  if(_.isNil(app.state.settings.activeComponent))\n    return false;\n  \n  var layout = _.find(app.state.layout.list, function(item) {\n    return (item.name === 'properties')\n  })\n  \n  return layout.active\n}"
        }
      ],
      "next": null,
      "previous": "4",
      "child": "182",
      "parent": "96",
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
          "body": "function(scope, props) {\n  return app.buildProject.components[\n    app.state.settings.activeComponent]\n}"
        },
        {
          "name": "setOnChangeProp",
          "body": "function(scope, props) {\n  return function(newComponent) {\n    app.js.update(function() {\n      app.dispatch({\n        path: '/settings',\n        action: 'set',\n        key: 'activeComponent',\n        value: newComponent.id\n      })\n    });\n  }\n}"
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'designer') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "314",
      "previous": null,
      "child": "205",
      "parent": "4"
    },
    "88": {
      "id": "88",
      "name": "Page options",
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
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.js.saveProject();\n  }\n};"
        },
        {
          "name": "getClass",
          "body": "function(scope, attributes) {\n  if(app.state.settings.shouldSave === true) {\n    return \"btn btn-primary btn-sm\";\n  } else {\n    return \"btn btn-default btn-sm\";\n  }\n}"
        },
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var styles = {};\n  if(app.state.settings.shouldSave === true) {\n  \tstyles.backgroundColor = app.js.getCssVar('$menuWarn');\n    styles.borderColor = app.js.getCssVar('$menuWarn');\n  }\n  return styles;\n}"
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
      "parent": "243"
    },
    "96": {
      "id": "96",
      "name": "bliss panels",
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
      "next": "95",
      "previous": "111",
      "child": "3",
      "parent": "243"
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'settings') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "179",
      "previous": "238",
      "child": "98",
      "parent": "4"
    },
    "98": {
      "id": "98",
      "name": "Settings header",
      "element": "h3",
      "text": "Page Settings",
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
      "next": "287",
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
    "104": {
      "id": "104",
      "name": "publish page",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
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
          "body": "function() {\n  var comp = this;\n  var proj = app.buildProject;\n  var data = JSON.stringify(proj);\n  comp.setStatus('Deploying ' + proj.name + '...');\n  \n  var workspace = app.state.settings.workspace\n  \n  $.ajax({\n    type: 'POST',\n    url: '/compiler/dist?workspace=' + workspace,\n    data: data,\n    success: function(data) {\n      comp.setStatus('Deployed ' + proj.name + '.');\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "275",
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
      "text": "Pages",
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
          "properties": [
            {
              "name": "min-width",
              "value": "15em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "106",
      "child": "297",
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
      "name": "top menu",
      "element": "div",
      "text": "",
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
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "96",
      "previous": null,
      "child": "181",
      "parent": "243"
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
          "properties": [
            {
              "name": "height",
              "value": "calc(100vh - 150px)"
            },
            {
              "name": "overflow",
              "value": "scroll"
            }
          ]
        },
        {
          "selector": "$id .CodeMirror",
          "properties": [
            {
              "name": "height",
              "value": "100%"
            }
          ]
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
      "name": "Show HTML",
      "element": "button",
      "text": "HTML",
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
          "body": "function() {\n  var layout = _.find(app.state.layout.list, function(item) {\n    return (item.name === 'components')\n  })\n  \n  if(layout.active === true) {\n    return \"btn btn-sm btn-primary\";\n  } else {\n    return \"btn btn-sm btn-default\";\n  }\n}"
        },
        {
          "name": "setContentValue",
          "body": "function() {\n  return function() {\n    var layout = _.find(app.state.layout.list,\n  \t\tfunction(item) { return (item.name === 'components')})\n\n    app.dispatch({\n      path: '/layout',\n      action: 'setActive',\n      name: layout.name,\n      active: !layout.active\n    })\n  }\n}"
        },
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var layout = _.find(app.state.layout.list, function(item) {\n    return (item.name === 'components')\n  })\n  \n  var styles = {};\n  \n  if(layout.active === true) {\n  \tstyles.backgroundColor = app.js.getCssVar('$menuHighlight');\n    styles.borderColor = app.js.getCssVar('$menuHighlight');\n  }\n  \n  return styles;\n}"
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
      "child": "278",
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
      "attributes": [
        {
          "name": "class",
          "value": "hexColor"
        }
      ],
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
          "body": "function(scope, attributes) {\n  return app.state.settings.currentColor\n}"
        },
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n      key: 'currentColor',\n      value: e.target.value\n    })\n  }\n};\n"
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
      "next": "253",
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
            },
            {
              "name": "cursor",
              "value": "pointer"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n   \t\tkey: 'currentColor',\n      value: e.target.value\n    })\n  };\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.settings.currentColor\n}"
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
      "previous": "253",
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
          "body": "function() {\n  var layout = _.find(app.state.layout.list, function(item) {\n    return (item.name === 'properties')\n  })\n  \n  if(layout.active === true) {\n    return \"btn btn-sm btn-primary\";\n  } else {\n    return \"btn btn-sm btn-default\";\n  }\n}"
        },
        {
          "name": "setContentValue",
          "body": "function() {\n  return function() {\n    var layout = _.find(app.state.layout.list,\n  \t\tfunction(item) { return (item.name === 'properties')})\n\n    app.dispatch({\n      path: '/layout',\n      action: 'setActive',\n      name: layout.name,\n      active: !layout.active\n    })\n  }\n}"
        },
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var layout = _.find(app.state.layout.list, function(item) {\n    return (item.name === 'properties')\n  })\n  \n  var styles = {};\n  \n  if(layout.active === true) {\n  \tstyles.backgroundColor = app.js.getCssVar('$menuHighlight');\n    styles.borderColor = app.js.getCssVar('$menuHighlight');\n  }\n  \n  return styles;\n}"
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
      "previous": "292",
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
      "previous": "299",
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
          "body": "function(scope, attributes) {\n  return app.state.projects.list;\n};\n"
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
      "next": null,
      "previous": null,
      "child": "166",
      "parent": "298"
    },
    "162": {
      "id": "162",
      "name": "existing page labels",
      "element": "h6",
      "text": "Open page",
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
      "next": "298",
      "previous": "158",
      "child": null,
      "parent": "107"
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
          "value": "fa fa-paper-plane"
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
      "text": "Publish",
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'global_js') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'global_css') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
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
          "body": "function() {\n  var comp = this;\n  var proj = app.buildProject;\n  var data = JSON.stringify(proj);\n  comp.setStatus('Building ' + proj.name + '...');\n  \n  var workspace = app.state.settings.workspace\n  \n  $.ajax({\n    type: 'POST',\n    url: '/compiler/export?workspace=' + workspace,\n    data: data,\n    success: function(data) {\n      comp.setStatus('Built ' + proj.name + '.');\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n}"
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
      "text": "Component",
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
      "text": "export page",
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
      "name": "delete page",
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
            },
            {
              "name": "background-color",
              "value": "$menuWarn"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    e.preventDefault();\n    app.js.deleteProject();\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": "291",
      "child": "197",
      "parent": "97"
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
      "text": "Delete page",
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
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.js.refresh()\n  }\n};\n"
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
          "body": "function(scope, attributes) {\n  var resolution = _.find(app.state.resolution.list,\n\t\tfunction(item) {\n    \treturn (item.value === app.state.resolution.selected)})\n  return resolution.label\n}"
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
          "body": "function(scope, attributes) {\n  var styles = { width: 'auto', height: 'auto' }\n  \n  var resolution = _.find(app.state.resolution.list,\n  \tfunction(item) {\n      return (app.state.resolution.selected === item.value)\n  \t})\n  \n  styles.width = resolution.previewWidth\n  styles.height = resolution.previewHeight\n  \n  return styles\n}"
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'css_vars') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'page_load') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'node_packages') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "304",
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
          "body": "function(scope, attributes) {\n  var view = _.find(app.state.views.list,\n\t\tfunction(item) {\n    \treturn (app.state.views.selected === item.name)})\n  return view.label\n}"
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
          "body": "function(scope, attributes) {\n  return app.state.views.list;\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index].label;\n}"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var name = scope.repeater[scope.repeater_index].name;\n  \n  return function(e) {\n    app.dispatch({\n      path: '/views',\n      action: 'setView',\n      name: name\n    })\n  }\n};"
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
          "body": "function(scope, attributes) {\n  var resolution = _.find(app.state.resolution.list,\n\t\tfunction(item) {\n    \treturn (item.value === app.state.resolution.selected)})\n  return resolution.label;\n}"
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
          "body": "function(scope, attributes) {\n  return app.state.resolution.list\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index].label;\n}"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var value = scope.repeater[scope.repeater_index].value;\n  \n  return function(e) {\n    app.dispatch({\n      path: '/resolution',\n      action: 'setResolution',\n      value: value\n    })\n  }\n};"
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
    },
    "238": {
      "id": "238",
      "name": "Data Editor",
      "element": "div",
      "text": null,
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
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "js": [
        {
          "name": "getStyle",
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'data') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "next": "97",
      "previous": "54",
      "child": "239",
      "parent": "4",
      "ifFn": ""
    },
    "239": {
      "id": "239",
      "name": "h3Data",
      "element": "h3",
      "text": "Data Editor",
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
      "js": [],
      "next": "240",
      "previous": null,
      "child": null,
      "parent": "238",
      "textFn": ""
    },
    "240": {
      "id": "240",
      "name": "code container",
      "element": "div",
      "text": "",
      "attributes": [],
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
      "previous": "239",
      "child": "241",
      "parent": "238"
    },
    "241": {
      "id": "241",
      "name": "Bliss Data",
      "element": "BlissData.component",
      "text": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "setSchemas",
          "body": "function(scope, props) {\n  return app.buildProject.schemas || [];\n}"
        },
        {
          "name": "setOnChangeProp",
          "body": "function(scope, props) {\n  return function(newSchemas) {\n    app.js.update(function() {\n      app.buildProject.schemas = newSchemas;\n    });\n  }\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "schemas",
          "value": "setSchemas"
        },
        {
          "name": "onChange",
          "value": "setOnChangeProp"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "240"
    },
    "242": {
      "id": "242",
      "name": "Sign in",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "shouldShow",
          "body": "function() {\n  return (app.state.firebase.user) ? false : true;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "251",
      "previous": null,
      "child": "244",
      "parent": "1"
    },
    "243": {
      "id": "243",
      "name": "Pages",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "shouldShow",
          "body": "function() {\n  return (app.state.firebase.user &&\n         \tapp.state.workspaces.active === false) ? \n    \t\t\t\ttrue : false;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": "251",
      "child": "111",
      "parent": "1"
    },
    "244": {
      "id": "244",
      "name": "firebase auth container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "id",
          "value": "firebaseui-auth-container"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "242"
    },
    "246": {
      "id": "246",
      "name": "divider 3",
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
      "next": "250",
      "previous": "319",
      "child": null,
      "parent": "107"
    },
    "247": {
      "id": "247",
      "name": "sign out",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#"
        },
        {
          "name": "class",
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
          "body": "function(scope, attributes) {\n  return function(e) {\n    firebase.auth().signOut()\n  }\n}\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": "260",
      "child": "248",
      "parent": "107"
    },
    "248": {
      "id": "248",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-sign-out"
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
      "next": "249",
      "previous": null,
      "child": null,
      "parent": "247"
    },
    "249": {
      "id": "249",
      "name": "label",
      "element": "span",
      "text": "Sign out",
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
      "previous": "248",
      "child": null,
      "parent": "247"
    },
    "250": {
      "id": "250",
      "name": "email label",
      "element": "h6",
      "text": "",
      "textFn": "getText",
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
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return app.state.firebase.email;\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "260",
      "previous": "246",
      "child": null,
      "parent": "107"
    },
    "251": {
      "id": "251",
      "name": "Websites",
      "element": "div",
      "text": "",
      "textFn": null,
      "ifFn": "shouldShow",
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "shouldShow",
          "body": "function() {\n  return (!_.isNil(app.state.firebase.user) &&\n          app.state.workspaces.active === true)\n}"
        }
      ],
      "dynamicAttributes": [],
      "next": "243",
      "previous": "242",
      "child": "263",
      "parent": "1"
    },
    "252": {
      "id": "252",
      "name": "card (repeat)",
      "element": "div",
      "text": "",
      "textFn": "",
      "ifFn": null,
      "repeatFn": "repeater",
      "attributes": [
        {
          "name": "class",
          "value": "card"
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
              "name": "margin",
              "value": "0.25em"
            },
            {
              "name": "flex-grow",
              "value": "1"
            },
            {
              "name": "background-color",
              "value": "#f2f2f2"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "repeater",
          "body": "function(scope, attributes) {\n  return app.state.workspaces.list;\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "309",
      "parent": "308"
    },
    "253": {
      "id": "253",
      "name": "input copy link",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
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
              "name": "display",
              "value": "inline-block"
            },
            {
              "name": "color",
              "value": "$menuFg"
            },
            {
              "name": "text-decoration",
              "value": "none"
            },
            {
              "name": "position",
              "value": "absolute"
            },
            {
              "name": "right",
              "value": "65px"
            },
            {
              "name": "top",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    e.preventDefault()\n    \n    var input = document.querySelector('.hexColor');\n    input.select();\n\n    try {\n      var successful = document.execCommand('copy');\n      //var msg = successful ? 'successful' : 'unsuccessful';\n    } catch (err) {\n      //console.log('Oops, unable to copy');\n    }\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "154",
      "previous": "153",
      "child": "254",
      "parent": "152"
    },
    "254": {
      "id": "254",
      "name": "clipboard icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-clipboard"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "253"
    },
    "258": {
      "id": "258",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-hand-o-left"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "259",
      "previous": null,
      "child": null,
      "parent": "260"
    },
    "259": {
      "id": "259",
      "name": "label",
      "element": "span",
      "text": "Switch Website",
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
      "previous": "258",
      "child": null,
      "parent": "260"
    },
    "260": {
      "id": "260",
      "name": "switch page",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#"
        },
        {
          "name": "class",
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
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/workspaces',\n      action: 'set',\n      key: 'active',\n      value: true\n    })\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "247",
      "previous": "250",
      "child": "258",
      "parent": "107"
    },
    "261": {
      "id": "261",
      "name": "websites header",
      "element": "h3",
      "text": "Websites",
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
              "value": "$headerBg"
            },
            {
              "name": "color",
              "value": "#ffffff"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            },
            {
              "name": "font-size",
              "value": "$headerFontSize"
            },
            {
              "name": "padding",
              "value": "$headerPadding"
            },
            {
              "name": "margin",
              "value": "0"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "271",
      "previous": null,
      "child": null,
      "parent": "264"
    },
    "262": {
      "id": "262",
      "name": "bliss header text",
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
      "next": null,
      "previous": "268",
      "child": null,
      "parent": "263"
    },
    "263": {
      "id": "263",
      "name": "bliss header",
      "element": "div",
      "text": "",
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
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "264",
      "previous": null,
      "child": "268",
      "parent": "251"
    },
    "264": {
      "id": "264",
      "name": "list container",
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
              "value": "45px"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "263",
      "child": "261",
      "parent": "251"
    },
    "265": {
      "id": "265",
      "name": "list of pages",
      "element": "div",
      "text": null,
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": "projectRepeater",
      "attributes": [],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding-left",
              "value": "10px"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "projectRepeater",
          "body": "function(scope, attributes) {\n  return scope.repeater[scope.repeater_index].projects;\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.projectRepeater[\n    scope.projectRepeater_index].name;\n};\n"
        }
      ],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "311"
    },
    "267": {
      "id": "267",
      "name": "website link",
      "element": "a",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": "",
      "attributes": [
        {
          "name": "class",
          "value": "workspaces"
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
              "name": "display",
              "value": "block"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  var item = scope.repeater[scope.repeater_index]\n  return item.name\n};\n"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var item = scope.repeater[scope.repeater_index];\n  return function(e) {\n    app.js.loadWorkspace(item.name);\n  }\n};\n"
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
      "parent": "310"
    },
    "268": {
      "id": "268",
      "name": "signout",
      "element": "div",
      "text": "",
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
              "value": "#ffffff"
            },
            {
              "name": "cursor",
              "value": "pointer"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    firebase.auth().signOut()\n  }\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "262",
      "previous": null,
      "child": "269",
      "parent": "263"
    },
    "269": {
      "id": "269",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-sign-out"
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
      "next": "270",
      "previous": null,
      "child": null,
      "parent": "268"
    },
    "270": {
      "id": "270",
      "name": "label",
      "element": "span",
      "text": "Sign out",
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
      "previous": "269",
      "child": null,
      "parent": "268"
    },
    "271": {
      "id": "271",
      "name": "create website container",
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
              "value": "0.5em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "308",
      "previous": "261",
      "child": "272",
      "parent": "264"
    },
    "272": {
      "id": "272",
      "name": "create website input",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "placeholder",
          "value": "website name..."
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "padding",
              "value": "6px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            },
            {
              "name": "border",
              "value": "solid 1px #ccc"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/workspaces',\n      action: 'set',\n      key: 'newWorkspaceName',\n      value: e.target.value\n    })\n  }\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.workspaces.newWorkspaceName\n}"
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
      "next": "273",
      "previous": null,
      "child": null,
      "parent": "271"
    },
    "273": {
      "id": "273",
      "name": "create website button",
      "element": "button",
      "text": "Create Website",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "btn btn-success"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
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
          "body": "function(scope, attributes) {\n  return function(e) {\n    console.log('newWorkspaceName', app.state.workspaces.newWorkspaceName)\n    e.preventDefault()\n    app.dispatch({\n      path: '/workspaces',\n      action: 'httpCreateWorkspace',\n      name: app.state.workspaces.newWorkspaceName\n    })\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": "272",
      "child": null,
      "parent": "271"
    },
    "275": {
      "id": "275",
      "name": "launch link",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "href",
          "value": "#"
        },
        {
          "name": "class",
          "value": "dropdown-item"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "10pt"
            },
            {
              "name": "margin-right",
              "value": "5px"
            },
            {
              "name": "cursor",
              "value": "pointer"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    //var username = app.state.firebase.username\n    //var workspace = app.state.settings.workspace\n    \n    var username = '5d06f306c22c07a5';\n  \tvar workspace = app.state.settings.workspace;\n    \n    if(username === null) return\n    \n    var url = location.origin +\n        '/hosted/' +\n        username + '/' +\n        workspace + '/' +\n        app.buildProject.filename + '.html' || app.buildProject.name + '.html';\n    \n    window.open(url)\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "319",
      "previous": "104",
      "child": "276",
      "parent": "107"
    },
    "276": {
      "id": "276",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "className",
          "value": "fa fa-rocket"
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
      "next": "277",
      "previous": null,
      "child": null,
      "parent": "275"
    },
    "277": {
      "id": "277",
      "name": "span",
      "element": "span",
      "text": "Launch",
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
      "previous": "276",
      "child": null,
      "parent": "275"
    },
    "278": {
      "id": "278",
      "name": "toggle javascript",
      "element": "button",
      "text": "Javascript for HTML",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "btn btn-default btn-block btn-sm"
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
              "name": "background-color",
              "value": "$menuBg"
            },
            {
              "name": "text-transform",
              "value": "uppercase"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getStyles",
          "body": "function(scope, attributes) {\n  var styles = {}\n  var view = app.state.views.selected\n\t\n  if(view === 'js') {\n  \tstyles.backgroundColor = app.js.getCssVar('$menuHighlight');\n    styles.borderColor = app.js.getCssVar('$menuHighlight');\n  }\n  \n  return styles;\n}"
        },
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  var viewName = (app.state.views.selected === 'js') ? 'designer' : 'js'\n  return function(e) {\n    console.log('new view', viewName)\n    app.dispatch({\n      path: '/views',\n      action: 'setView',\n      name: viewName\n    })\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyles"
        },
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "11",
      "previous": null,
      "child": null,
      "parent": "151"
    },
    "281": {
      "id": "281",
      "name": "page title input",
      "element": "input",
      "text": null,
      "textFn": "",
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "form-control pull-left input-sm"
        },
        {
          "name": "placeholder",
          "value": "Page title"
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
      "next": "282",
      "previous": null,
      "child": null,
      "parent": "279"
    },
    "285": {
      "id": "285",
      "name": "page title input",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "form-control"
        },
        {
          "name": "placeholder",
          "value": "Page title"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    var value = e.target.value;\n    app.setState(function() {\n      app.buildProject.pageTitle = value;\n    });\n    \n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n      key: 'shouldSave',\n      value: true\n    });\n  }\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return app.buildProject.pageTitle || '';\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "value",
          "value": "getText"
        },
        {
          "name": "onChange",
          "value": "handleChange"
        }
      ],
      "next": null,
      "previous": "286",
      "child": null,
      "parent": "287"
    },
    "286": {
      "id": "286",
      "name": "page title label",
      "element": "label",
      "text": "Page title in <HEAD>",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "285",
      "previous": null,
      "child": null,
      "parent": "287"
    },
    "287": {
      "id": "287",
      "name": "Page title container",
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
              "value": "1em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "288",
      "previous": "98",
      "child": "286",
      "parent": "97"
    },
    "288": {
      "id": "288",
      "name": "File name container",
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
              "value": "1em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "300",
      "previous": "287",
      "child": "289",
      "parent": "97"
    },
    "289": {
      "id": "289",
      "name": "html file name label",
      "element": "label",
      "text": "HTML file (do not include extension)",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "290",
      "previous": null,
      "child": null,
      "parent": "288"
    },
    "290": {
      "id": "290",
      "name": "file name input",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "form-control"
        },
        {
          "name": "placeholder",
          "value": "File name"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return app.buildProject.filename || '';\n};\n"
        },
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    var value = e.target.value;\n    app.setState(function() {\n      app.buildProject.filename = value;\n    });\n    \n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n      key: 'shouldSave',\n      value: true\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onChange",
          "value": "handleChange"
        },
        {
          "name": "value",
          "value": "getText"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "288"
    },
    "291": {
      "id": "291",
      "name": "separator",
      "element": "hr",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "196",
      "previous": "322",
      "child": null,
      "parent": "97"
    },
    "292": {
      "id": "292",
      "name": "new page container",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "input-group input-group-sm"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "padding",
              "value": "0.5rem 1.5rem"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "158",
      "previous": "297",
      "child": "293",
      "parent": "107"
    },
    "293": {
      "id": "293",
      "name": "new page input",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "placeholder",
          "value": "Page name"
        },
        {
          "name": "class",
          "value": "form-control input-sm"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/projects',\n      action: 'setNewPage',\n      newPage: e.target.value\n    });\n  }\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.projects.newPage;\n};\n"
        },
        {
          "name": "handleKeydown",
          "body": "function(scope, attributes) {\n  return function(e) {\n    var key = e.which;\n    var ENTER = 13;\n    \n    if(key === ENTER) {\n    \tvar pageName = app.state.projects.newPage;\n      app.js.newProject(true, pageName);\n\n      app.dispatch({\n        path: '/projects',\n        action: 'setNewPage',\n        newPage: ''\n      });\n    }\n  }\n};\n"
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
        },
        {
          "name": "onKeyDown",
          "value": "handleKeydown"
        }
      ],
      "next": "295",
      "previous": null,
      "child": null,
      "parent": "292"
    },
    "294": {
      "id": "294",
      "name": "new page button",
      "element": "button",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "btn btn-sm btn-block btn-success"
        }
      ],
      "css": [],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    e.preventDefault();\n    var pageName = app.state.projects.newPage;\n    app.js.newProject(true, pageName);\n    \n    app.dispatch({\n      path: '/projects',\n      action: 'setNewPage',\n      newPage: ''\n    });\n  }\n};\n"
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
      "child": "296",
      "parent": "295"
    },
    "295": {
      "id": "295",
      "name": "input group",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "input-group-append"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "293",
      "child": "294",
      "parent": "292"
    },
    "296": {
      "id": "296",
      "name": "plus icon",
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
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "294"
    },
    "297": {
      "id": "297",
      "name": "new page label",
      "element": "h6",
      "text": "New page",
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
      "next": "292",
      "previous": null,
      "child": null,
      "parent": "107"
    },
    "298": {
      "id": "298",
      "name": "existing projects overflow",
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
              "name": "max-height",
              "value": "10em"
            },
            {
              "name": "overflow-y",
              "value": "scroll"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "299",
      "previous": "162",
      "child": "161",
      "parent": "107"
    },
    "299": {
      "id": "299",
      "name": "scroll to see more",
      "element": "div",
      "text": "(scroll to see more pages)",
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
              "value": "#636c72"
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
              "name": "padding",
              "value": "0.5rem 1.5rem"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "159",
      "previous": "298",
      "child": null,
      "parent": "107"
    },
    "300": {
      "id": "300",
      "name": "JSON project name",
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
              "value": "1em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "322",
      "previous": "288",
      "child": "301",
      "parent": "97"
    },
    "301": {
      "id": "301",
      "name": "project json filename label",
      "element": "label",
      "text": "Project JSON file (do not include extension)",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "302",
      "previous": null,
      "child": null,
      "parent": "300"
    },
    "302": {
      "id": "302",
      "name": "project json name input",
      "element": "input",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "form-control"
        },
        {
          "name": "placeholder",
          "value": "Project name"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return app.buildProject.name || '';\n};\n"
        },
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    var value = e.target.value;\n    app.setState(function() {\n      app.buildProject.name = value;\n    });\n    \n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n      key: 'shouldSave',\n      value: true\n    });\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onChange",
          "value": "handleChange"
        },
        {
          "name": "value",
          "value": "getText"
        }
      ],
      "next": null,
      "previous": null,
      "child": null,
      "parent": "300"
    },
    "304": {
      "id": "304",
      "name": "Import HTML Container",
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'import_html') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": null,
      "previous": "227",
      "child": "305",
      "parent": "4"
    },
    "305": {
      "id": "305",
      "name": "title",
      "element": "h3",
      "text": "import html",
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
      "next": "306",
      "previous": null,
      "child": null,
      "parent": "304"
    },
    "306": {
      "id": "306",
      "name": "import",
      "element": "textarea",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "cols",
          "value": "45"
        },
        {
          "name": "rows",
          "value": "10"
        },
        {
          "name": "placeholder",
          "value": "paste html here..."
        },
        {
          "name": "class",
          "value": "form-control"
        }
      ],
      "css": [],
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
      "dynamicAttributes": [],
      "next": "307",
      "previous": null,
      "child": null,
      "parent": "304"
    },
    "307": {
      "id": "307",
      "name": "import",
      "element": "button",
      "text": "Import HTML",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "btn btn-sm btn-success"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "margin-top",
              "value": "1em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "306",
      "child": null,
      "parent": "304"
    },
    "308": {
      "id": "308",
      "name": "websites container",
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
              "name": "flex-direction",
              "value": "row"
            },
            {
              "name": "flex-wrap",
              "value": "wrap"
            },
            {
              "name": "padding",
              "value": "0.25em"
            },
            {
              "name": "justify-content",
              "value": "space-evenly"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "271",
      "child": "252",
      "parent": "264"
    },
    "309": {
      "id": "309",
      "name": "card body",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "card-body"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": null,
      "child": "310",
      "parent": "252"
    },
    "310": {
      "id": "310",
      "name": "card title",
      "element": "h5",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "card-title"
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "311",
      "previous": null,
      "child": "267",
      "parent": "309"
    },
    "311": {
      "id": "311",
      "name": "card text",
      "element": "div",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "card-text"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "max-height",
              "value": "7em"
            },
            {
              "name": "overflow-y",
              "value": "scroll"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": null,
      "previous": "310",
      "child": "265",
      "parent": "309"
    },
    "312": {
      "id": "312",
      "name": "import text",
      "element": "textarea",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "rows",
          "value": "20"
        },
        {
          "name": "placeholder",
          "value": "Paste HTML..."
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "z-index",
              "value": "1000"
            },
            {
              "name": "padding",
              "value": "10px"
            },
            {
              "name": "border-radius",
              "value": "3px"
            },
            {
              "name": "border",
              "value": "solid 1px #cccccc"
            },
            {
              "name": "outline",
              "value": "none"
            },
            {
              "name": "width",
              "value": "100%"
            },
            {
              "name": "font-size",
              "value": "0.5em"
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
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.dispatch({\n      path: '/settings',\n      action: 'set',\n      key: 'importHtml',\n      value: e.target.value\n    })\n  }\n};\n"
        },
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.state.settings.importHtml;\n};\n"
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
      "next": "313",
      "previous": "318",
      "child": null,
      "parent": "314"
    },
    "313": {
      "id": "313",
      "name": "import html button",
      "element": "button",
      "text": "Import HTML",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "btn btn-block btn-primary"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "font-size",
              "value": "0.5em"
            },
            {
              "name": "margin",
              "value": "0 0 1em 0"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "handleClick",
          "body": "function(scope, attributes) {\n  return function(e) {\n    app.js.serverImportHtml(app.state.settings.importHtml);\n  }\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": null,
      "previous": "312",
      "child": null,
      "parent": "314"
    },
    "314": {
      "id": "314",
      "name": "Import Html Container",
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
          "body": "function() {\n  var selected = app.state.views.selected\n  var displayValue = (selected === 'import_html') ? 'block' : 'none';\n  return { 'display': displayValue };\n}"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "style",
          "value": "getStyle"
        }
      ],
      "next": "54",
      "previous": "80",
      "child": "318",
      "parent": "4"
    },
    "318": {
      "id": "318",
      "name": "import html",
      "element": "h3",
      "text": "Import HTML",
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
      "js": [],
      "next": "312",
      "previous": null,
      "child": null,
      "parent": "314",
      "textFn": ""
    },
    "319": {
      "id": "319",
      "name": "download website",
      "element": "a",
      "text": "",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
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
          "body": "function(scope, attributes) {\n  return function(e) {\n    e.preventDefault();\n    app.js.download();\n  }\n};"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "onClick",
          "value": "handleClick"
        }
      ],
      "next": "246",
      "previous": "275",
      "child": "320",
      "parent": "107"
    },
    "320": {
      "id": "320",
      "name": "icon",
      "element": "i",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "fa fa-cloud-download"
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
      "next": "321",
      "previous": null,
      "child": null,
      "parent": "319"
    },
    "321": {
      "id": "321",
      "name": "label",
      "element": "span",
      "text": "Download",
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
      "previous": null,
      "child": null,
      "parent": "319"
    },
    "322": {
      "id": "322",
      "name": "Layout editor",
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
              "value": "1em"
            }
          ]
        }
      ],
      "js": [],
      "dynamicAttributes": [],
      "next": "291",
      "previous": "300",
      "child": "323",
      "parent": "97"
    },
    "323": {
      "id": "323",
      "name": "layout label",
      "element": "label",
      "text": "Page Layout",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "324",
      "previous": null,
      "child": null,
      "parent": "322"
    },
    "324": {
      "id": "324",
      "name": "layout select",
      "element": "select",
      "text": null,
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "class",
          "value": "form-control"
        },
        {
          "name": "placeholder",
          "value": "Project name"
        }
      ],
      "css": [
        {
          "selector": "$id",
          "properties": [
            {
              "name": "outline",
              "value": "none"
            }
          ]
        }
      ],
      "js": [
        {
          "name": "getValue",
          "body": "function(scope, attributes) {\n  return app.buildProject.layout || '';\n};\n"
        },
        {
          "name": "handleChange",
          "body": "function(scope, attributes) {\n  return function(e) {\n    var value = e.target.value;\n    \n    app.js.update(function() {\n      app.setState(function() {\n        app.buildProject.layout = value;\n      });\n    });\n  }\n};\n"
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
      "next": null,
      "previous": null,
      "child": "326",
      "parent": "322"
    },
    "325": {
      "id": "325",
      "name": "layout options",
      "element": "option",
      "text": "",
      "textFn": "getText",
      "ifFn": null,
      "repeatFn": "loop",
      "attributes": [],
      "css": [],
      "js": [
        {
          "name": "loop",
          "body": "function(scope, attributes) {\n  return app.state.projects.list;\n};\n"
        },
        {
          "name": "getText",
          "body": "function(scope, attributes) {\n  return scope.loop[scope.loop_index].name;\n};\n"
        }
      ],
      "dynamicAttributes": [
        {
          "name": "value",
          "value": "getText"
        }
      ],
      "next": null,
      "previous": "326",
      "child": null,
      "parent": "324"
    },
    "326": {
      "id": "326",
      "name": "default option",
      "element": "option",
      "text": "(none)",
      "textFn": null,
      "ifFn": null,
      "repeatFn": null,
      "attributes": [
        {
          "name": "value",
          "value": ""
        }
      ],
      "css": [],
      "js": [],
      "dynamicAttributes": [],
      "next": "325",
      "previous": null,
      "child": null,
      "parent": "324"
    }
  },
  "schemas": [
    {
      "path": "/firebase",
      "actions": [
        {
          "action": "setup",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  \n  var config = {\n    apiKey: \"AIzaSyBD09I5AfFlcQx5lpoY3XBjT150hw7tS0Y\",\n    authDomain: \"blissui-f09be.firebaseapp.com\",\n    databaseURL: \"https://blissui-f09be.firebaseio.com\",\n    projectId: \"blissui-f09be\",\n    storageBucket: \"blissui-f09be.appspot.com\",\n    messagingSenderId: \"843731683135\"\n  };\n  \n  firebase.initializeApp(config);\n  \n  newData.user = null\n  newData.auth_ui = new firebaseui.auth.AuthUI(firebase.auth())\n  newData.auth = firebase.auth()\n  newData.database = firebase.database()\n  newData.storage = firebase.storage()\n  \n  newData.auth.onAuthStateChanged(function(user) {\n    if(user) {\n      app.dispatch({\n        path: '/firebase',\n        action: 'setUser',\n        user: user\n      });\n      \n      user.getIdToken(true).then(function(idToken) {\n        app.dispatch({\n          path: '/firebase',\n          action: 'setToken',\n          user_token: idToken\n        })\n        \n        app.js.afterAuth()\n        \n      })\n    } else {\n      // Clear user state\n      app.dispatch({\n        path: '/firebase',\n        action: 'setUser',\n        user: null\n      });\n      \n      app.dispatch({\n        path: '/firebase',\n        action: 'setToken',\n        user_token: null\n      });\n      \n      // Start UI flow\n      app.setState(function() {\n      \tapp.js.firebaseAuthUI();\n      });\n    }\n  });\n  \n  return newData;\n}"
        },
        {
          "action": "setUser",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  newData.user = args.user;\n  return newData;\n}"
        },
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    user: null,\n    user_token: null,\n    designer_token: null,\n    email: null,\n    username: null,\n    auth_ui: null,\n    auth: null,\n    database: null,\n  \tstorage: null\n  }\n  \n  return newData;\n}"
        },
        {
          "action": "setToken",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  newData.user_token = args.user_token;\n\n  // TODO: move this code into DataEvents system once created\n  $.ajaxSetup({ headers: { 'X-User-Token': newData.user_token } });\n  app.js.getSession();\n  \n  return newData;\n}"
        },
        {
          "action": "setSession",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  newData.designer_token = args.designer_token;\n  newData.email = args.email;\n  newData.username = args.username;\n  return newData;\n}"
        }
      ]
    },
    {
      "path": "/workspaces",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    active: true,\n    newWorkspaceName: '',\n    list: []\n  }\n  return newData\n}"
        },
        {
          "action": "add",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.list.push(args.item)\n  return newData;\n}"
        },
        {
          "action": "httpListWorkspaces",
          "body": "function (data, args) {\n  $.ajax({\n    type: 'GET',\n    url: '/workspace/list',\n    data: {},\n    success: function(data) {\n      app.dispatch({\n        path: '/workspaces',\n        action: 'addAll',\n        list: data.workspaces\n      })\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n  \n  return data;\n}"
        },
        {
          "action": "addAll",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.list = args.list\n  return newData;\n}"
        },
        {
          "action": "set",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  if(newData.hasOwnProperty(args.key))\n    newData[args.key] = args.value;\n  return newData;\n}"
        },
        {
          "action": "httpCreateWorkspace",
          "body": "function (data, args) {\n  var postData = { name: args.name }\n  postData = JSON.stringify(postData)\n  \n  app.dispatch({\n    path: '/workspaces',\n    action: 'set',\n    key: 'newWorkspaceName',\n    value: ''\n  })\n  \n  $.ajax({\n    type: 'POST',\n    url: '/workspace',\n    data: postData,\n    success: function(data) {\n      app.dispatch({\n        path: '/workspaces',\n        action: 'httpListWorkspaces'\n      })\n    },\n    contentType: \"application/json\",\n    dataType: 'json'\n  });\n  \n  return data;\n}"
        }
      ]
    },
    {
      "path": "/projects",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    newPage: '',\n    list: []\n  };\n  return newData;\n}"
        },
        {
          "action": "add",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.list.push(args.item)\n  return newData\n}"
        },
        {
          "action": "addAll",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.list = args.projects;\n  return newData;\n}"
        },
        {
          "action": "clear",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  newData.list = [];\n  return newData;\n}"
        },
        {
          "action": "setNewPage",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  newData.newPage = args.newPage;\n  return newData;\n}"
        }
      ]
    },
    {
      "path": "/settings",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  return {\n    buildProject: null,\n    activeComponent: null,\n    shouldSave: false,\n    shouldReloadProject: true,\n    currentColor: '#ffffff',\n    workspace: 'bliss',\n    timer: null,\n    importHtml: ''\n  }\n  \n  var display = app._state.create('display');\n  display.create({name: 'components', width: '20%', active: true});\n  display.create({name: 'designer', width: '60%', width2: '80%', width3: '100%', active: true});\n  display.create({name: 'properties', width: '20%', active: true});\n}"
        },
        {
          "action": "set",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  if(newData.hasOwnProperty(args.key)) newData[args.key] = args.value;\n  return newData;\n}"
        },
        {
          "action": "setTimer",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  clearTimeout(app.state.settings.timer);\n  newData.timer = setTimeout(args.fn, 500)\n  return newData\n}"
        }
      ]
    },
    {
      "path": "/views",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  return {\n    selected: 'designer',\n    list: [\n      { name: 'designer',      label: 'Designer' },\n      { name: 'js',            label: 'JavaScript' },\n      { name: 'data',          label: 'Data Editor' },\n      { name: 'global_js',     label: 'Global JS' },\n      { name: 'global_css',    label: 'Global CSS' },\n      { name: 'css_vars',      label: 'CSS Variables' },\n      { name: 'page_load',     label: 'Page Load' },\n      { name: 'node_packages', label: 'Node Packages' },\n      { name: 'import_html',   label: 'Import HTML' },\n      { name: 'settings',      label: 'Settings' }\n    ]\n  }\n}"
        },
        {
          "action": "setView",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  newData.selected = args.name\n  return newData\n}"
        }
      ]
    },
    {
      "path": "/resolution",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  return {\n    selected: 'full',\n    list: [\n      {\n        value: 'full',\n        label: 'Viewport',\n        width: '100%',\n        height: 'calc(100% - 32px)',\n        previewWidth: '100%',\n        previewHeight: 'calc(100vh - 100px)'\n      },\n      {\n        value: 'galaxys5',\n        label: 'Galaxy S5',\n        width: '360px',\n        height: '640px',\n        previewWidth: 'calc(360px + 20px)',\n        previewHeight: 'calc(640px + 52px)'\n      },\n      {\n        value: 'nexus5x',\n        label: 'Nexus 5X',\n        width: '412px',\n        height: '732px',\n        previewWidth: 'calc(412px + 20px)',\n        previewHeight: 'calc(732px + 52px)'},\n      {\n        value: 'nexus6p',\n        label: 'Nexus 6P',\n        width: '412px',\n        height: '732px',\n        previewWidth: 'calc(412px + 20px)',\n        previewHeight: 'calc(732px + 52px)'\n      },\n      {\n        value: 'iphone5',\n        label: 'iPhone 5',\n        width: '320px',\n        height: '568px',\n        previewWidth: 'calc(320px + 20px)',\n        previewHeight: 'calc(568px + 52px)'\n      },\n      {\n        value: 'iphone6',\n        label: 'iPhone 6',\n        width: '375px',\n        height: '667px',\n        previewWidth: 'calc(375px + 20px)',\n        previewHeight: 'calc(667px + 52px)'\n      },\n      {\n        value: 'iphone6plus',\n        label: 'iPhone 6 Plus',\n        width: '414px',\n        height: '736px',\n        previewWidth: 'calc(414px + 20px)',\n        previewHeight: 'calc(736px + 52px)'\n      },\n      {\n        value: 'ipad',\n        label: 'iPad',\n        width: '768px',\n        height: '1024px',\n        previewWidth: 'calc(768px + 20px)',\n        previewHeight: 'calc(1024px + 52px)'\n      },\n      {\n        value: 'ipadpro',\n        label: 'iPad Pro',\n        width: '1024px',\n        height: '1366px',\n        previewWidth: 'calc(1024px + 20px)',\n        previewHeight: 'calc(1366px + 52px)'\n      }\n    ]\n  }\n}"
        },
        {
          "action": "setResolution",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  newData.selected = args.value\n  return newData\n}"
        }
      ]
    },
    {
      "path": "/layout",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = {\n    list: [\n      {\n        name: 'components',\n        width: '20%',\n        active: true\n      },\n      {\n        name: 'designer',\n        width: '60%',\n        width2: '80%',\n        width3: '100%',\n        active: true\n      },\n      {\n        name: 'properties',\n        width: '20%',\n        active: true\n      }\n    ]\n  }\n  return newData;\n}"
        },
        {
          "action": "setActive",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data);\n  var layout = _.find(newData.list, function(item) {\n  \treturn (item.name === args.name)\n  })\n  layout.active = args.active\n  return newData\n}"
        }
      ]
    },
    {
      "path": "/preview",
      "actions": [
        {
          "action": "init",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.state = \"\"\n  return newData;\n}"
        },
        {
          "action": "setState",
          "body": "function (data, args) {\n  var newData = Object.assign({}, data)\n  newData.state = args.state\n  return newData;\n}"
        }
      ]
    }
  ],
  "filename": "index",
  "pageTitle": "Bliss UI"
}
if(typeof module !== "undefined") module.exports = blissProject;
