var blissUi = (function() {
  var createApp = function(component) {
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js['init'] = function() {
      // Start Bliss with Empty Project
      app.buildProject = newBlissProject

      // Send firebase security token
      $.ajaxSetup({
        headers: {
          'X-User-Token': app.state.firebase.user_token
        }
      })

      app.dispatch({
        path: '/settings',
        action: 'set',
        key: 'activeComponent',
        value: app.buildProject.rootId
      })

      // Verify firebase session
      app.dispatch({
        path: '/firebase',
        action: 'setup'
      })
    }
    app.js['build'] = function() {
      app.js.log('app.js.build() invoked.');

      if (app.buildProject.type === "bliss") {
        app.buildProject.build = "designer";
      }

      var data = JSON.stringify(app.buildProject)
      var workspace = app.state.settings.workspace

      $.ajax({
        type: 'POST',
        url: '/compiler/build?workspace=' + workspace,
        data: data,
        success: function(data) {
          app.js.refreshIframe();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('POST /build?workspace=' + workspace,
            jqXHR, textStatus, errorThrown);
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.js['selectComponent'] = function(id) {
      app.js.log('app.js.selectComponent() invoked.');

      app.dispatch({
        path: '/settings',
        action: 'set',
        key: 'activeComponent',
        value: id
      })
    }
    app.js['update'] = function(fn) {
      app.js.log('app.js.update() invoked.');

      // execute the update state function
      // this function should call dispatch internally
      try {
        fn()
      } catch (e) {
        console.error('app.js.update', e)
        return
      }

      // reset timer so that it doesn't build too often
      app.dispatch({
        path: '/settings',
        action: 'setTimer',
        fn: function() {
          if (app.state.settings.shouldReloadProject === true)
            app.js.saveAndReloadProject()
          else
            app.js.build()
        }
      })

      // set shouldSave so that the icon lights up
      app.dispatch({
        path: '/settings',
        action: 'set',
        key: 'shouldSave',
        value: true
      })
    }
    app.js['server'] = function(path, success, data, requestType) {
      app.js.log('app.js.server() invoked.');

      if (_.isNil(data)) data = {};
      if (_.isNil(requestType)) requestType = 'GET';

      var workspace = app.state.settings.workspace;

      $.ajax({
        type: requestType,
        url: '/project/' + path + '?workspace=' + workspace,
        data: data,
        success: function(data) {
          success(data);
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.js['getProjects'] = function(scope, attributes) {
      app.js.server('list', function(data) {
        app.dispatch({
          path: '/projects',
          action: 'clear'
        });

        app.dispatch({
          path: '/projects',
          action: 'addAll',
          projects: _.map(data.projects, function(item) {
            return {
              name: item
            }
          })
        });
      });
    }
    app.js['loadProject'] = function(projectName, shouldConfirm) {
      app.js.log('app.js.loadProjects() invoked.');
      if (_.isNil(shouldConfirm)) shouldConfirm = true;
      if (shouldConfirm === true) {
        if (!confirm('Are you sure you want to load a different project?')) return;
      }

      app.setState(function() {
        app.js.setStatus('Loading project ' + projectName + '...');
      });

      app.js.server('load', function(data) {
        app.setState(function() {
          app.js.setStatus('Loaded project ' + data.project.name + '.');
        });

        app.buildProject = data.project

        app.dispatch({
          path: '/settings',
          action: 'set',
          key: 'activeComponent',
          value: app.buildProject.rootId
        })

        app.dispatch({
          path: '/settings',
          action: 'set',
          key: 'shouldReloadProject',
          value: false
        })

        app.js.build();
        app.js.getProjects();
      }, {
        name: projectName
      });
    }
    app.js['setStatus'] = function(message) {
      app.js.log('app.js.setStatus() invoked.');
      app.setState(function() {
        app.state.status = message;
      });
    }
    app.js['getCssVar'] = function(dollarName) {
      var name = dollarName.substring(1);
      var found = _.find(blissProject.cssVars, {
        'name': name
      });
      return (_.isNil(found)) ? '' : found.value;
    }
    app.js['saveProject'] = function(success) {
      app.js.log('app.js.saveProject() invoked.');
      var proj = app.buildProject;
      var data = JSON.stringify(proj);
      app.js.setStatus('Saving project ' + proj.name + '...');

      var workspace = app.state.settings.workspace;

      app.dispatch({
        path: '/settings',
        action: 'set',
        key: 'shouldSave',
        value: false
      })

      $.ajax({
        type: 'POST',
        url: '/project/save?workspace=' + workspace,
        data: data,
        success: function(data) {
          app.js.setStatus('Saved project ' + proj.name + '.');
          if (!_.isNil(success)) success(data);
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.js['newProject'] = function(shouldConfirm) {
      app.js.log('app.js.newProject() invoked.');
      if (_.isNil(shouldConfirm)) shouldConfirm = true;

      if (shouldConfirm === true) {
        if (!confirm('Are you sure you want to create a new project?')) return;
      }

      app.setState(function() {
        app.buildProject = newBlissProject;
      })

      app.dispatch({
        path: '/settings',
        action: 'set',
        key: 'activeComponent',
        value: app.buildProject.rootId
      })
    }
    app.js['saveAndReloadProject'] = function() {
      app.js.log('app.js.saveAndReloadProject() invoked.');
      // save current json
      app.js.saveProject(function() {
        // load project
        app.js.loadProject(app.buildProject.name, false);
      });
    }
    app.js['refreshIframe'] = function(resetState) {
      app.js.log('app.js.refreshIframe() invoked.');

      resetState = (resetState === true) ? true : false

      if (resetState) {
        app.dispatch({
          path: '/preview',
          action: 'setState',
          state: {}
        })
      } else {
        app.js.savePreviewState()
      }

      var iframe = $('#preview');
      var currentSrc = iframe.attr('src');
      if (_.isUndefined(currentSrc)) return;

      var workspace = app.state.settings.workspace;

      var url = location.origin +
        '/bliss/designer/' +
        app.state.firebase.designer_token + '/' + workspace + '/' +
        'designer.html';

      iframe.attr('src', url);
    }
    app.js['refresh'] = function() {
      app.js.log('app.js.refresh() invoked.');
      // refresh the project list
      app.js.getProjects();

      // refresh iframe
      app.js.refreshIframe(true);
    }
    app.js['log'] = function() {
      return;
      if (typeof app.buildProject !== 'undefined') {
        if (app.buildProject.build === 'bliss') {
          var args = Array.prototype.slice.call(arguments);
          console.log.apply(this, args);
        }
      }
    }
    app.js['firebaseAuthUI'] = function() {
      var ui = app.state.firebase.auth_ui;

      var config = {
        callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            return false;
          },
          uiShown: function() {}
        },
        signInSuccessUrl: window.location.href,
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          //firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: window.location.href
      };

      /*
      if(ui === null) {
        // Initialize the FirebaseUI Widget using Firebase.
        ui = new firebaseui.auth.AuthUI(firebase.auth());
        app.setState(function() {
          app.state.ui = ui;
        });
      } else {
        ui = app.state.ui;
        ui.reset();
      }
      */

      ui.reset();

      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', config);
    }
    app.js['getSession'] = function() {
      $.ajax({
        type: 'GET',
        url: '/session',
        success: function(data) {
          app.dispatch({
            'path': '/firebase',
            'action': 'setSession',
            'designer_token': data.token,
            'email': data.email,
            'username': data.username
          });

          app.setState(function() {
            app.js.getProjects();
          });
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.js['afterAuth'] = function(scope, attributes) {
      app.js.log('after auth invoked')

      app.dispatch({
        path: '/workspaces',
        action: 'httpListWorkspaces'
      })
    }
    app.js['savePreviewState'] = function(scope, attributes) {
      app.js.log('app.js.savePreviewState() invoked.');

      // copied from backend
      var appName = app.buildProject.name.replace(/[^a-z]/gi, ' ').trim()
      appName = appName.split(" ").map(function(word, index) {
        if (index === 0) {
          return word.toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        }
      }).join("");

      var prevApp = document.getElementById('preview').contentWindow[appName]
      var prevState = {}

      if (typeof(prevApp) === 'undefined') return;

      try {
        var keys = Object.keys(prevApp.state)
        keys.forEach(function(key) {
          try {
            var stateStr = JSON.stringify(prevApp.state[key])
            prevState[key] = JSON.parse(stateStr)
          } catch (e) {
            console.error('unable to parse state', e)
          }
        })
      } catch (e) {
        console.error('unable to parse state', e)
      }

      app.dispatch({
        path: '/preview',
        action: 'setState',
        state: prevState
      })

      console.log('saving state', prevState)
    }
    app.js['reloadSavedState'] = function(prevApp) {
      var _app = window.top.blissUi
      prevApp.setState(function() {
        try {
          Object.keys(_app.state.preview.state).forEach(function(key) {
            var stateStr = JSON.stringify(_app.state.preview.state[key])
            var value = JSON.parse(stateStr)
            prevApp.state[key] = value
            console.log('reloaded state', key, value)
          })
        } catch (e) {
          console.error('reloadSavedState', e)
        }
      })
    }
    app.methods["242"] = {};
    app.methods["242"]['shouldShow'] = function() {
      return (app.state.firebase.user) ? false : true;
    }
    app.methods["251"] = {};
    app.methods["251"]['shouldShow'] = function() {
      return (!_.isNil(app.state.firebase.user) &&
        app.state.workspaces.active === true)
    }
    app.methods["268"] = {};
    app.methods["268"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        firebase.auth().signOut()
      }
    }
    app.methods["252"] = {};
    app.methods["252"]['repeater'] = function(scope, attributes) {
      return app.state.workspaces.list;
    };
    app.methods["267"] = {};
    app.methods["267"]['getText'] = function(scope, attributes) {
      var item = scope.repeater[scope.repeater_index]
      return item.name
    };

    app.methods["267"]['handleClick'] = function(scope, attributes) {
      var item = scope.repeater[scope.repeater_index]

      return function(e) {

        app.dispatch({
          path: '/settings',
          action: 'set',
          key: 'activeComponent',
          value: null
        })

        app.dispatch({
          path: '/views',
          action: 'setView',
          name: 'designer'
        })

        app.dispatch({
          path: '/settings',
          action: 'set',
          key: 'workspace',
          value: item.name
        })

        app.dispatch({
          path: '/workspaces',
          action: 'set',
          key: 'active',
          value: false
        })

        app.js.newProject(false)
        app.js.getProjects()
      }
    };
    app.methods["265"] = {};
    app.methods["265"]['projectRepeater'] = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].projects;
    };

    app.methods["265"]['getText'] = function(scope, attributes) {
      return scope.projectRepeater[
        scope.projectRepeater_index].name;
    };
    app.methods["272"] = {};
    app.methods["272"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        app.dispatch({
          path: '/workspaces',
          action: 'set',
          key: 'newWorkspaceName',
          value: e.target.value
        })
      }
    };

    app.methods["272"]['getValue'] = function(scope, attributes) {
      return app.state.workspaces.newWorkspaceName
    }
    app.methods["273"] = {};
    app.methods["273"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        console.log('newWorkspaceName', app.state.workspaces.newWorkspaceName)
        e.preventDefault()
        app.dispatch({
          path: '/workspaces',
          action: 'httpCreateWorkspace',
          name: app.state.workspaces.newWorkspaceName
        })
      }
    };
    app.methods["243"] = {};
    app.methods["243"]['shouldShow'] = function() {
      return (app.state.firebase.user &&
          app.state.workspaces.active === false) ?
        true : false;
    }
    app.methods["85"] = {};
    app.methods["85"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        app.js.newProject();
      }
    };
    app.methods["161"] = {};
    app.methods["161"]['repeater'] = function(scope, attributes) {
      return app.state.projects.list
    };

    app.methods["161"]['getText'] = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].name;
    };

    app.methods["161"]['handleClick'] = function(scope, attributes) {
      var project = scope.repeater[scope.repeater_index].name;
      return function(e) {
        app.setState(function() {
          app.js.loadProject(project);
        });
      }
    };
    app.methods["165"] = {};
    app.methods["165"]['getText'] = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].name;
    };
    app.methods["190"] = {};
    app.methods["190"]['handleClick'] = function(scope, attributes) {
      var comp = this;
      return function(e) {
        comp.exportProject();
      }
    };
    app.methods["190"]['setStatus'] = function(message) {
      app.setState(function() {
        app.state.status = message;
      });
    }
    app.methods["190"]['exportProject'] = function() {
      var comp = this;
      var proj = app.buildProject;
      var data = JSON.stringify(proj);
      comp.setStatus('Building ' + proj.name + '...');

      var workspace = app.state.settings.workspace

      $.ajax({
        type: 'POST',
        url: '/compiler/export?workspace=' + workspace,
        data: data,
        success: function(data) {
          comp.setStatus('Built ' + proj.name + '.');
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.methods["104"] = {};
    app.methods["104"]['handleClick'] = function(scope, attributes) {
      var comp = this;
      return function(e) {
        comp.createProjectDist();
      }
    };
    app.methods["104"]['setStatus'] = function(message) {
      app.setState(function() {
        app.state.status = message;
      });
    }
    app.methods["104"]['createProjectDist'] = function() {
      var comp = this;
      var proj = app.buildProject;
      var data = JSON.stringify(proj);
      comp.setStatus('Deploying ' + proj.name + '...');

      var workspace = app.state.settings.workspace

      $.ajax({
        type: 'POST',
        url: '/compiler/dist?workspace=' + workspace,
        data: data,
        success: function(data) {
          comp.setStatus('Deployed ' + proj.name + '.');
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
    app.methods["250"] = {};
    app.methods["250"]['getText'] = function(scope, attributes) {
      return app.state.firebase.email;
    }
    app.methods["260"] = {};
    app.methods["260"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        app.dispatch({
          path: '/workspaces',
          action: 'set',
          key: 'active',
          value: true
        })
      }
    };
    app.methods["247"] = {};
    app.methods["247"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        firebase.auth().signOut()
      }
    }
    app.methods["93"] = {};
    app.methods["93"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        app.js.saveProject();
      }
    };
    app.methods["93"]['getClass'] = function(scope, attributes) {
      if (app.state.settings.shouldSave === true) {
        return "btn btn-primary btn-sm";
      } else {
        return "btn btn-default btn-sm";
      }
    }
    app.methods["93"]['getStyles'] = function(scope, attributes) {
      var styles = {};
      if (app.state.settings.shouldSave === true) {
        styles.backgroundColor = app.js.getCssVar('$menuWarn');
        styles.borderColor = app.js.getCssVar('$menuWarn');
      }
      return styles;
    }
    app.methods["201"] = {};
    app.methods["201"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        app.js.refresh()
      }
    };
    app.methods["275"] = {};
    app.methods["275"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        var username = app.state.firebase.username
        var workspace = app.state.settings.workspace

        if (username === null) return

        var url = location.origin +
          '/hosted/' +
          username + '/' +
          workspace + '/'

        window.open(url)
      }
    };
    app.methods["229"] = {};
    app.methods["229"]['getText'] = function(scope, attributes) {
      var view = _.find(app.state.views.list,
        function(item) {
          return (app.state.views.selected === item.name)
        })
      return view.label
    }
    app.methods["231"] = {};
    app.methods["231"]['repeater'] = function(scope, attributes) {
      return app.state.views.list;
    };

    app.methods["231"]['getText'] = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].label;
    }
    app.methods["231"]['handleClick'] = function(scope, attributes) {
      var name = scope.repeater[scope.repeater_index].name;

      return function(e) {
        app.dispatch({
          path: '/views',
          action: 'setView',
          name: name
        })
      }
    };
    app.methods["234"] = {};
    app.methods["234"]['getText'] = function(scope, attributes) {
      var resolution = _.find(app.state.resolution.list,
        function(item) {
          return (item.value === app.state.resolution.selected)
        })
      return resolution.label;
    }
    app.methods["236"] = {};
    app.methods["236"]['repeater'] = function(scope, attributes) {
      return app.state.resolution.list
    };

    app.methods["236"]['getText'] = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].label;
    }
    app.methods["236"]['handleClick'] = function(scope, attributes) {
      var value = scope.repeater[scope.repeater_index].value;

      return function(e) {
        app.dispatch({
          path: '/resolution',
          action: 'setResolution',
          value: value
        })
      }
    };
    app.methods["150"] = {};
    app.methods["150"]['getClass'] = function() {
      var layout = _.find(app.state.layout.list, function(item) {
        return (item.name === 'components')
      })

      if (layout.active === true) {
        return "btn btn-sm btn-primary";
      } else {
        return "btn btn-sm btn-default";
      }
    }
    app.methods["150"]['setContentValue'] = function() {
      return function() {
        var layout = _.find(app.state.layout.list,
          function(item) {
            return (item.name === 'components')
          })

        app.dispatch({
          path: '/layout',
          action: 'setActive',
          name: layout.name,
          active: !layout.active
        })
      }
    }
    app.methods["150"]['getStyles'] = function(scope, attributes) {
      var layout = _.find(app.state.layout.list, function(item) {
        return (item.name === 'components')
      })

      var styles = {};

      if (layout.active === true) {
        styles.backgroundColor = app.js.getCssVar('$menuHighlight');
        styles.borderColor = app.js.getCssVar('$menuHighlight');
      }

      return styles;
    }
    app.methods["157"] = {};
    app.methods["157"]['getClass'] = function() {
      var layout = _.find(app.state.layout.list, function(item) {
        return (item.name === 'properties')
      })

      if (layout.active === true) {
        return "btn btn-sm btn-primary";
      } else {
        return "btn btn-sm btn-default";
      }
    }
    app.methods["157"]['setContentValue'] = function() {
      return function() {
        var layout = _.find(app.state.layout.list,
          function(item) {
            return (item.name === 'properties')
          })

        app.dispatch({
          path: '/layout',
          action: 'setActive',
          name: layout.name,
          active: !layout.active
        })
      }
    }
    app.methods["157"]['getStyles'] = function(scope, attributes) {
      var layout = _.find(app.state.layout.list, function(item) {
        return (item.name === 'properties')
      })

      var styles = {};

      if (layout.active === true) {
        styles.backgroundColor = app.js.getCssVar('$menuHighlight');
        styles.borderColor = app.js.getCssVar('$menuHighlight');
      }

      return styles;
    }
    app.methods["153"] = {};
    app.methods["153"]['getValue'] = function(scope, attributes) {
      return app.state.settings.currentColor
    }
    app.methods["153"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        app.dispatch({
          path: '/settings',
          action: 'set',
          key: 'currentColor',
          value: e.target.value
        })
      }
    };
    app.methods["253"] = {};
    app.methods["253"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        e.preventDefault()

        var input = document.querySelector('.hexColor');
        input.select();

        try {
          var successful = document.execCommand('copy');
          //var msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
          //console.log('Oops, unable to copy');
        }
      }
    };
    app.methods["154"] = {};
    app.methods["154"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        app.dispatch({
          path: '/settings',
          action: 'set',
          key: 'currentColor',
          value: e.target.value
        })
      };
    };

    app.methods["154"]['getValue'] = function(scope, attributes) {
      return app.state.settings.currentColor
    }
    app.methods["3"] = {};
    app.methods["3"]['shouldShow'] = function() {
      if (_.isNil(app.state.settings.activeComponent))
        return false;

      var list = app.state.layout.list
      var layout = _.find(list, function(item) {
        return (item.name === "components")
      })
      return layout.active
    }
    app.methods["18"] = {};
    app.methods["18"]['setDataProp'] = function(scope, props) {
      return app.buildProject;
    }
    app.methods["18"]['setOnSelectProp'] = function(scope, props) {
      return function(id) {
        app.dispatch({
          path: '/settings',
          action: 'set',
          key: 'activeComponent',
          value: id
        })
      };
    }
    app.methods["18"]['setOnCreateProp'] = function(scope, props) {
      return function(toId) {
        var proj = BlissTree.createComponent(
          app.buildProject, toId);
        app.js.update(function() {
          app.buildProject = proj;
        });
      };
    }
    app.methods["18"]['setOnCloneProp'] = function(scope, props) {
      return function(cloneId) {
        var proj = BlissTree.cloneComponent(app.buildProject, cloneId);
        app.js.update(function() {
          app.buildProject = proj;
        });
      };
    }
    app.methods["18"]['setOnDeleteProp'] = function(scope, props) {
      return function(id) {
        var proj = BlissTree.deleteComponent(app.buildProject, id);
        app.js.update(function() {
          app.buildProject = proj;
        });
      };
    }
    app.methods["18"]['setOnMoveProp'] = function(scope, props) {
      return function(fromId, toId, shouldBeChild) {
        var proj = BlissTree.moveComponent(
          app.buildProject, fromId, toId, shouldBeChild);
        app.js.update(function() {
          app.buildProject = proj;
        });
      }
    }
    app.methods["18"]['setThis'] = function(scope, props) {
      var that = app;
      return function() {
        return that;
      };
    }
    app.methods["18"]['getSelected'] = function(scope, attributes) {
      return app.state.settings.activeComponent
    }
    app.methods["4"] = {};
    app.methods["4"]['getStyles'] = function(scope, attributes) {
      var list = app.state.layout.list

      var designer = _.find(app.state.layout.list,
        function(item) {
          return (item.name === "designer")
        })
      var properties = _.find(app.state.layout.list,
        function(item) {
          return (item.name === "properties")
        })
      var components = _.find(app.state.layout.list,
        function(item) {
          return (item.name === "components")
        })

      var newWidth = designer.width;

      if (!properties.active && !components.active) {
        newWidth = designer.width3;
      } else if (!properties.active || !components.active) {
        newWidth = designer.width2;
      }

      var styles = {
        'width': newWidth
      };

      return styles;
    }
    app.methods["4"]['shouldShow'] = function(scope, attributes) {
      if (_.isNil(app.state.settings.activeComponent))
        return false;

      return true
    }
    app.methods["80"] = {};
    app.methods["80"]['getStyle'] = function() {
      var selected = app.state.views.selected
      var displayValue = (selected === 'designer') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["205"] = {};
    app.methods["205"]['getStyles'] = function(scope, attributes) {
      var styles = {
        width: 'auto',
        height: 'auto'
      }

      var resolution = _.find(app.state.resolution.list,
        function(item) {
          return (app.state.resolution.selected === item.value)
        })

      styles.width = resolution.previewWidth
      styles.height = resolution.previewHeight

      return styles
    }
    app.methods["204"] = {};
    app.methods["204"]['getText'] = function(scope, attributes) {
      var resolution = _.find(app.state.resolution.list,
        function(item) {
          return (item.value === app.state.resolution.selected)
        })
      return resolution.label
    }
    app.methods["17"] = {};
    app.methods["17"]['getStyles'] = function(scope, attributes) {
      var styles = {
        width: '100%',
        height: 'calc(100vh - 50px)'
      };

      var resolution = _.find(app.state.resolution.list,
        function(item) {
          return (item.value === app.state.resolution.selected)
        })

      styles.width = resolution.width
      styles.height = resolution.height

      return styles;
    }
    app.methods["17"]['shouldShow'] = function(scope, attributes) {
      var selected = app.state.views.selected
      return (selected === 'designer')
    }
    app.methods["54"] = {};
    app.methods["54"]['getStyle'] = function() {
      var selected = app.state.views.selected
      var displayValue = (selected === 'js') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["55"] = {};
    app.methods["55"]['getText'] = function(scope, attributes) {
      var title = 'JS'
      var name = ''
      try {
        name = app.buildProject.components[
          app.state.settings.activeComponent].name + ' - '
      } catch (e) {
        console.error(e)
      }
      return name + title
    };
    app.methods["79"] = {};
    app.methods["79"]['setComponentProp'] = function(scope, props) {
      return app.buildProject.components[
        app.state.settings.activeComponent]
    }
    app.methods["79"]['setOnChangeProp'] = function(scope, props) {
      return function(newComponent) {
        app.js.update(function() {
          app.dispatch({
            path: '/settings',
            action: 'set',
            key: 'activeComponent',
            value: newComponent.id
          })
        });
      }
    }
    app.methods["238"] = {};
    app.methods["238"]['getStyle'] = function() {
      var selected = app.state.views.selected
      var displayValue = (selected === 'data') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["241"] = {};
    app.methods["241"]['setSchemas'] = function(scope, props) {
      return app.buildProject.schemas || [];
    }
    app.methods["241"]['setOnChangeProp'] = function(scope, props) {
      return function(newSchemas) {
        app.js.update(function() {
          app.buildProject.schemas = newSchemas;
        });
      }
    }
    app.methods["97"] = {};
    app.methods["97"]['getStyle'] = function() {
      var selected = app.state.views.selected
      var displayValue = (selected === 'settings') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["290"] = {};
    app.methods["290"]['getText'] = function(scope, attributes) {
      return app.buildProject.filename || '';
    };

    app.methods["290"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        var value = e.target.value;
        app.setState(function() {
          app.buildProject.filename = value;
        });
      }
    };
    app.methods["285"] = {};
    app.methods["285"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        var value = e.target.value;
        app.setState(function() {
          app.buildProject.pageTitle = value;
        });
      }
    };

    app.methods["285"]['getText'] = function(scope, attributes) {
      return app.buildProject.pageTitle || '';
    };
    app.methods["179"] = {};
    app.methods["179"]['getStyle'] = function() {
      var selected = app.state.views.selected
      var displayValue = (selected === 'global_js') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["108"] = {};
    app.methods["108"]['setComponentProp'] = function(scope, props) {
      return app.buildProject;
    }
    app.methods["108"]['setOnChangeProp'] = function(scope, props) {
      return function(newComponent) {
        app.js.update(function() {
          app.buildProject.js = newComponent.js;
        });
      }
    }
    app.methods["180"] = {};
    app.methods["180"]['getStyle'] = function() {
      var selected = app.state.views.selected
      var displayValue = (selected === 'global_css') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["224"] = {};
    app.methods["224"]['setComponent'] = function(scope, props) {
      return app.buildProject;
    };

    app.methods["224"]['setOnChange'] = function(scope, attributes) {
      return function(newBuildProject) {
        app.js.update(function() {
          app.buildProject = newBuildProject;
        });
      }
    };
    app.methods["225"] = {};
    app.methods["225"]['getStyle'] = function() {
      var selected = app.state.views.selected
      var displayValue = (selected === 'css_vars') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["141"] = {};
    app.methods["141"]['setObjectContainer'] = function(scope, props) {
      return app.buildProject;
    };

    app.methods["141"]['setObjectKey'] = function(scope, props) {
      return "cssVars";
    };

    app.methods["141"]['setObjectType'] = function(scope, props) {
      return "object";
    };

    app.methods["141"]['setOnChange'] = function(scope, attributes) {
      return function(newCssVars) {
        app.js.update(function() {
          app.buildProject.cssVars = newCssVars;
        });
      }
    };

    app.methods["141"]['setItemKey'] = function(scope, attributes) {
      return "name";
    }
    app.methods["141"]['setItemValue'] = function(scope, attributes) {
      return "value";
    }
    app.methods["226"] = {};
    app.methods["226"]['getStyle'] = function() {
      var selected = app.state.views.selected
      var displayValue = (selected === 'page_load') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["156"] = {};
    app.methods["156"]['setObjectContainer'] = function(scope, props) {
      return app.buildProject;
    };

    app.methods["156"]['setObjectKey'] = function(scope, props) {
      return "load";
    };

    app.methods["156"]['setObjectType'] = function(scope, props) {
      return "primitive";
    };

    app.methods["156"]['setOnChange'] = function(scope, attributes) {
      return function(newLoad) {
        app.js.update(function() {
          app.buildProject.load = newLoad;
        });
      }
    };
    app.methods["139"] = {};
    app.methods["139"]['setObjectContainer'] = function(scope, props) {
      return app.buildProject;
    };

    app.methods["139"]['setObjectKey'] = function(scope, props) {
      return "externalCss";
    };

    app.methods["139"]['setObjectType'] = function(scope, props) {
      return "primitive";
    };

    app.methods["139"]['setOnChange'] = function(scope, attributes) {
      return function(newExternalCss) {
        app.js.update(function() {
          app.buildProject.externalCss = newExternalCss;
        });
      }
    };
    app.methods["135"] = {};
    app.methods["135"]['setObjectContainer'] = function(scope, props) {
      return app.buildProject;
    };

    app.methods["135"]['setObjectKey'] = function(scope, props) {
      return "externalJs";
    };

    app.methods["135"]['setObjectType'] = function(scope, props) {
      return "primitive";
    };

    app.methods["135"]['setOnChange'] = function(scope, attributes) {
      return function(newExternalJs) {
        app.js.update(function() {
          app.buildProject.externalJs = newExternalJs;
        });
      }
    };
    app.methods["227"] = {};
    app.methods["227"]['getStyle'] = function() {
      var selected = app.state.views.selected
      var displayValue = (selected === 'node_packages') ? 'block' : 'none';
      return {
        'display': displayValue
      };
    }
    app.methods["143"] = {};
    app.methods["143"]['setObjectContainer'] = function(scope, props) {
      return app.buildProject;
    };

    app.methods["143"]['setObjectKey'] = function(scope, props) {
      return "packages";
    };

    app.methods["143"]['setObjectType'] = function(scope, props) {
      return "object";
    };

    app.methods["143"]['setOnChange'] = function(scope, attributes) {
      return function(newPackages) {
        app.js.update(function() {
          app.buildProject.packages = newPackages;
        });
      }
    };

    app.methods["143"]['setItemKey'] = function(scope, attributes) {
      return "name";
    }
    app.methods["143"]['setItemValue'] = function(scope, attributes) {
      return "version";
    }
    app.methods["77"] = {};
    app.methods["77"]['shouldShow'] = function(scope, attributes) {
      if (_.isNil(app.state.settings.activeComponent))
        return false;

      var layout = _.find(app.state.layout.list, function(item) {
        return (item.name === 'properties')
      })

      return layout.active
    }
    app.methods["278"] = {};
    app.methods["278"]['getStyles'] = function(scope, attributes) {
      var styles = {}
      var view = app.state.views.selected

      if (view === 'js') {
        styles.backgroundColor = app.js.getCssVar('$menuHighlight');
        styles.borderColor = app.js.getCssVar('$menuHighlight');
      }

      return styles;
    }
    app.methods["278"]['handleClick'] = function(scope, attributes) {
      var viewName = (app.state.views.selected === 'js') ? 'designer' : 'js'
      return function(e) {
        console.log('new view', viewName)
        app.dispatch({
          path: '/views',
          action: 'setView',
          name: viewName
        })
      }
    };
    app.methods["11"] = {};
    app.methods["11"]['setComponentProp'] = function(scope, props) {
      return app.buildProject.components[
        app.state.settings.activeComponent]
    }
    app.methods["11"]['setOnChangeProp'] = function(scope, props) {
      return function(newComponent) {
        app.js.update(function() {
          if (newComponent.id === app.buildProject.rootId) {
            app.buildProject.name = newComponent.name;
          }
          app.buildProject.components[
            app.state.settings.activeComponent] = newComponent;
        });
      }
    }
    app.methods["95"] = {};
    app.methods["95"]['showStatus'] = function(scope, attributes) {
      return app.state.status || 'Ready.';
    };
    app.getPath = function(objRef, path) {
      var ref = objRef;
      var parts = path.split('/')
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part === '') continue;
        ref = ref[part] || (ref[part] = {})
      }
      return ref;
    }
    app.assignPath = function(objRef, path, data) {
      var ref = objRef;
      var parts = path.split('/')
      data || (data = {})
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part === '') continue;
        if (i === parts.length - 1) {
          ref = (ref[part] = data)
        } else {
          ref = ref[part] || (ref[part] = {})
        }
      }
      return ref;
    }
    app.dispatch = function(options) {
      var ref = app.state;
      app.setState(function() {
        var data = app.getPath(ref, options.path);
        var fn = app.schema[options.path][options.action];
        var newData = fn(data, options);
        app.assignPath(ref, options.path, newData);
      })
    }
    app.schema = {};
    app.schema['/firebase'] = {};
    app.schema['/firebase']['setup'] = function(data, args) {
      var newData = Object.assign({}, data);

      var config = {
        apiKey: "AIzaSyBD09I5AfFlcQx5lpoY3XBjT150hw7tS0Y",
        authDomain: "blissui-f09be.firebaseapp.com",
        databaseURL: "https://blissui-f09be.firebaseio.com",
        projectId: "blissui-f09be",
        storageBucket: "blissui-f09be.appspot.com",
        messagingSenderId: "843731683135"
      };

      firebase.initializeApp(config);

      newData.user = null
      newData.auth_ui = new firebaseui.auth.AuthUI(firebase.auth())
      newData.auth = firebase.auth()
      newData.database = firebase.database()
      newData.storage = firebase.storage()

      newData.auth.onAuthStateChanged(function(user) {
        if (user) {
          app.dispatch({
            path: '/firebase',
            action: 'setUser',
            user: user
          });

          user.getIdToken(true).then(function(idToken) {
            app.dispatch({
              path: '/firebase',
              action: 'setToken',
              user_token: idToken
            })

            app.js.afterAuth()

          })
        } else {
          // Clear user state
          app.dispatch({
            path: '/firebase',
            action: 'setUser',
            user: null
          });

          app.dispatch({
            path: '/firebase',
            action: 'setToken',
            user_token: null
          });

          // Start UI flow
          app.setState(function() {
            app.js.firebaseAuthUI();
          });
        }
      });

      return newData;
    }
    app.schema['/firebase']['setUser'] = function(data, args) {
      var newData = Object.assign({}, data);
      newData.user = args.user;
      return newData;
    }
    app.schema['/firebase']['init'] = function(data, args) {
      var newData = {
        user: null,
        user_token: null,
        designer_token: null,
        email: null,
        username: null,
        auth_ui: null,
        auth: null,
        database: null,
        storage: null
      }

      return newData;
    }
    app.schema['/firebase']['setToken'] = function(data, args) {
      var newData = Object.assign({}, data);
      newData.user_token = args.user_token;

      // TODO: move this code into DataEvents system once created
      $.ajaxSetup({
        headers: {
          'X-User-Token': newData.user_token
        }
      });
      app.js.getSession();

      return newData;
    }
    app.schema['/firebase']['setSession'] = function(data, args) {
      var newData = Object.assign({}, data);
      newData.designer_token = args.designer_token;
      newData.email = args.email;
      newData.username = args.username;
      return newData;
    }
    if (app.schema['/firebase']['init']) {
      app.assignPath(app.state, '/firebase', app.schema['/firebase']['init']());
    } else {
      app.assignPath(app.state, '/firebase');
    }
    app.schema['/workspaces'] = {};
    app.schema['/workspaces']['init'] = function(data, args) {
      var newData = {
        active: true,
        newWorkspaceName: '',
        list: []
      }
      return newData
    }
    app.schema['/workspaces']['add'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.list.push(args.item)
      return newData;
    }
    app.schema['/workspaces']['httpListWorkspaces'] = function(data, args) {
      $.ajax({
        type: 'GET',
        url: '/workspace/list',
        data: {},
        success: function(data) {
          app.dispatch({
            path: '/workspaces',
            action: 'addAll',
            list: data.workspaces
          })
        },
        contentType: "application/json",
        dataType: 'json'
      });

      return data;
    }
    app.schema['/workspaces']['addAll'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.list = args.list
      return newData;
    }
    app.schema['/workspaces']['set'] = function(data, args) {
      var newData = Object.assign({}, data);
      if (newData.hasOwnProperty(args.key))
        newData[args.key] = args.value;
      return newData;
    }
    app.schema['/workspaces']['httpCreateWorkspace'] = function(data, args) {
      var postData = {
        name: args.name
      }
      postData = JSON.stringify(postData)

      app.dispatch({
        path: '/workspaces',
        action: 'set',
        key: 'newWorkspaceName',
        value: ''
      })

      $.ajax({
        type: 'POST',
        url: '/workspace',
        data: postData,
        success: function(data) {
          app.dispatch({
            path: '/workspaces',
            action: 'httpListWorkspaces'
          })
        },
        contentType: "application/json",
        dataType: 'json'
      });

      return data;
    }
    if (app.schema['/workspaces']['init']) {
      app.assignPath(app.state, '/workspaces', app.schema['/workspaces']['init']());
    } else {
      app.assignPath(app.state, '/workspaces');
    }
    app.schema['/projects'] = {};
    app.schema['/projects']['init'] = function(data, args) {
      return {
        list: []
      }
    }
    app.schema['/projects']['add'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.list.push(args.item)
      return newData
    }
    app.schema['/projects']['addAll'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.list = args.projects
      return newData;
    }
    app.schema['/projects']['clear'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.list = []
      return newData;
    }
    if (app.schema['/projects']['init']) {
      app.assignPath(app.state, '/projects', app.schema['/projects']['init']());
    } else {
      app.assignPath(app.state, '/projects');
    }
    app.schema['/settings'] = {};
    app.schema['/settings']['init'] = function(data, args) {
      return {
        buildProject: null,
        activeComponent: null,
        shouldSave: false,
        shouldReloadProject: true,
        currentColor: '#ffffff',
        workspace: 'bliss',
        timer: null
      }

      var display = app._state.create('display');
      display.create({
        name: 'components',
        width: '20%',
        active: true
      });
      display.create({
        name: 'designer',
        width: '60%',
        width2: '80%',
        width3: '100%',
        active: true
      });
      display.create({
        name: 'properties',
        width: '20%',
        active: true
      });
    }
    app.schema['/settings']['set'] = function(data, args) {
      var newData = Object.assign({}, data);
      if (newData.hasOwnProperty(args.key)) newData[args.key] = args.value;
      return newData;
    }
    app.schema['/settings']['setTimer'] = function(data, args) {
      var newData = Object.assign({}, data)
      clearTimeout(app.state.settings.timer);
      newData.timer = setTimeout(args.fn, 500)
      return newData
    }
    if (app.schema['/settings']['init']) {
      app.assignPath(app.state, '/settings', app.schema['/settings']['init']());
    } else {
      app.assignPath(app.state, '/settings');
    }
    app.schema['/views'] = {};
    app.schema['/views']['init'] = function(data, args) {
      return {
        selected: 'designer',
        list: [{
            name: 'designer',
            label: 'Designer'
          },
          {
            name: 'js',
            label: 'JavaScript'
          },
          {
            name: 'data',
            label: 'Data Editor'
          },
          {
            name: 'global_js',
            label: 'Global JS'
          },
          {
            name: 'global_css',
            label: 'Global CSS'
          },
          {
            name: 'css_vars',
            label: 'CSS Variables'
          },
          {
            name: 'page_load',
            label: 'Page Load'
          },
          {
            name: 'node_packages',
            label: 'Node Packages'
          },
          {
            name: 'settings',
            label: 'Settings'
          }
        ]
      }
    }
    app.schema['/views']['setView'] = function(data, args) {
      var newData = Object.assign({}, data);
      newData.selected = args.name
      return newData
    }
    if (app.schema['/views']['init']) {
      app.assignPath(app.state, '/views', app.schema['/views']['init']());
    } else {
      app.assignPath(app.state, '/views');
    }
    app.schema['/resolution'] = {};
    app.schema['/resolution']['init'] = function(data, args) {
      return {
        selected: 'full',
        list: [{
            value: 'full',
            label: 'Viewport',
            width: '100%',
            height: 'calc(100% - 32px)',
            previewWidth: '100%',
            previewHeight: 'calc(100vh - 100px)'
          },
          {
            value: 'galaxys5',
            label: 'Galaxy S5',
            width: '360px',
            height: '640px',
            previewWidth: 'calc(360px + 20px)',
            previewHeight: 'calc(640px + 52px)'
          },
          {
            value: 'nexus5x',
            label: 'Nexus 5X',
            width: '412px',
            height: '732px',
            previewWidth: 'calc(412px + 20px)',
            previewHeight: 'calc(732px + 52px)'
          },
          {
            value: 'nexus6p',
            label: 'Nexus 6P',
            width: '412px',
            height: '732px',
            previewWidth: 'calc(412px + 20px)',
            previewHeight: 'calc(732px + 52px)'
          },
          {
            value: 'iphone5',
            label: 'iPhone 5',
            width: '320px',
            height: '568px',
            previewWidth: 'calc(320px + 20px)',
            previewHeight: 'calc(568px + 52px)'
          },
          {
            value: 'iphone6',
            label: 'iPhone 6',
            width: '375px',
            height: '667px',
            previewWidth: 'calc(375px + 20px)',
            previewHeight: 'calc(667px + 52px)'
          },
          {
            value: 'iphone6plus',
            label: 'iPhone 6 Plus',
            width: '414px',
            height: '736px',
            previewWidth: 'calc(414px + 20px)',
            previewHeight: 'calc(736px + 52px)'
          },
          {
            value: 'ipad',
            label: 'iPad',
            width: '768px',
            height: '1024px',
            previewWidth: 'calc(768px + 20px)',
            previewHeight: 'calc(1024px + 52px)'
          },
          {
            value: 'ipadpro',
            label: 'iPad Pro',
            width: '1024px',
            height: '1366px',
            previewWidth: 'calc(1024px + 20px)',
            previewHeight: 'calc(1366px + 52px)'
          }
        ]
      }
    }
    app.schema['/resolution']['setResolution'] = function(data, args) {
      var newData = Object.assign({}, data);
      newData.selected = args.value
      return newData
    }
    if (app.schema['/resolution']['init']) {
      app.assignPath(app.state, '/resolution', app.schema['/resolution']['init']());
    } else {
      app.assignPath(app.state, '/resolution');
    }
    app.schema['/layout'] = {};
    app.schema['/layout']['init'] = function(data, args) {
      var newData = {
        list: [{
            name: 'components',
            width: '20%',
            active: true
          },
          {
            name: 'designer',
            width: '60%',
            width2: '80%',
            width3: '100%',
            active: true
          },
          {
            name: 'properties',
            width: '20%',
            active: true
          }
        ]
      }
      return newData;
    }
    app.schema['/layout']['setActive'] = function(data, args) {
      var newData = Object.assign({}, data);
      var layout = _.find(newData.list, function(item) {
        return (item.name === args.name)
      })
      layout.active = args.active
      return newData
    }
    if (app.schema['/layout']['init']) {
      app.assignPath(app.state, '/layout', app.schema['/layout']['init']());
    } else {
      app.assignPath(app.state, '/layout');
    }
    app.schema['/preview'] = {};
    app.schema['/preview']['init'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.state = ""
      return newData;
    }
    app.schema['/preview']['setState'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.state = args.state
      return newData;
    }
    if (app.schema['/preview']['init']) {
      app.assignPath(app.state, '/preview', app.schema['/preview']['init']());
    } else {
      app.assignPath(app.state, '/preview');
    }
    app.getKey = function() {
      var out = [];
      for (var i = 0; i < arguments.length; i++) out.push(arguments[i]);
      return out.join('_');
    };
    app.mergeAttributes = function(id, scope, dynamicAttributes, attrs) {
      for (key in dynamicAttributes) {
        if (dynamicAttributes.hasOwnProperty(key)) {
          var fn = dynamicAttributes[key];
          var value = app.methods[id][fn](scope, attrs);
          attrs[key] = value;
        }
      }
      return attrs;
    }
    app.rootComponent = function(props) {
      if (typeof props !== "undefined") app.props = props;
      var scope = {};
      return (
        React.createElement('div', app.mergeAttributes('1', scope, {}, {
            "id": "blissUiV_1",
            "key": app.getKey('id', '1')
          }),
          (function(scope) {
            var out = [];
            scope['shouldShow'] = app.methods['242']['shouldShow'](scope);
            if (app.methods['242']['shouldShow'](scope) === true) {
              out.push(React.createElement('div', app.mergeAttributes('242', scope, {}, {
                  "id": "signIn_242",
                  "key": app.getKey('id', '242')
                }),
                React.createElement('div', app.mergeAttributes('244', scope, {}, {
                  "id": "firebaseui-auth-container",
                  "key": app.getKey('id', '244')
                }))));
            }
            return out;
          })(scope),
          (function(scope) {
            var out = [];
            scope['shouldShow'] = app.methods['251']['shouldShow'](scope);
            if (app.methods['251']['shouldShow'](scope) === true) {
              out.push(React.createElement('div', app.mergeAttributes('251', scope, {}, {
                  "id": "websites_251",
                  "key": app.getKey('id', '251')
                }),
                React.createElement('div', app.mergeAttributes('263', scope, {}, {
                    "id": "blissHeader_263",
                    "key": app.getKey('id', '263')
                  }),
                  React.createElement('div', app.mergeAttributes('268', scope, {
                      "onClick": "handleClick"
                    }, {
                      "className": "pull-right",
                      "id": "signout_268",
                      "key": app.getKey('id', '268')
                    }),
                    React.createElement('i', app.mergeAttributes('269', scope, {}, {
                      "className": "fa fa-sign-out",
                      "id": "icon_269",
                      "key": app.getKey('id', '269')
                    })),
                    React.createElement('span', app.mergeAttributes('270', scope, {}, {
                      "id": "label_270",
                      "key": app.getKey('id', '270')
                    }), 'Sign out')),
                  React.createElement('div', app.mergeAttributes('262', scope, {}, {
                    "className": "pull-left",
                    "id": "blissHeaderText_262",
                    "key": app.getKey('id', '262')
                  }), 'Bliss UI')),
                React.createElement('div', app.mergeAttributes('264', scope, {}, {
                    "id": "listContainer_264",
                    "key": app.getKey('id', '264')
                  }),
                  React.createElement('h3', app.mergeAttributes('261', scope, {}, {
                    "id": "websitesHeader_261",
                    "key": app.getKey('id', '261')
                  }), 'Websites'),
                  (function(scope) {
                    var out = [];
                    var list = scope['repeater'] = app.methods['252']['repeater'](scope);
                    for (var i = 0; i < list.length; i++) {
                      scope['repeater_index'] = i;
                      out.push(React.createElement('div', app.mergeAttributes('252', scope, {}, {
                          "href": "#",
                          "className": "workspaces",
                          "id": "listOfWebsites_252",
                          "key": app.getKey('id', '252', i)
                        }),
                        React.createElement('a', app.mergeAttributes('267', scope, {
                          "onClick": "handleClick"
                        }, {
                          "href": "#",
                          "className": "workspaces",
                          "id": "websiteLink_267",
                          "key": app.getKey('id', '267')
                        }), app.methods['267']['getText'](scope)),
                        (function(scope) {
                          var out = [];
                          var list = scope['projectRepeater'] = app.methods['265']['projectRepeater'](scope);
                          for (var i = 0; i < list.length; i++) {
                            scope['projectRepeater_index'] = i;
                            out.push(React.createElement('span', app.mergeAttributes('265', scope, {}, {
                              "id": "listOfPages_265",
                              "key": app.getKey('id', '265', i)
                            }), app.methods['265']['getText'](scope)));
                          }
                          return out;
                        })(scope)));
                    }
                    return out;
                  })(scope),
                  React.createElement('div', app.mergeAttributes('271', scope, {}, {
                      "id": "createWebsiteContainer_271",
                      "key": app.getKey('id', '271')
                    }),
                    React.createElement('input', app.mergeAttributes('272', scope, {
                      "onChange": "handleChange",
                      "value": "getValue"
                    }, {
                      "placeholder": "website name...",
                      "id": "createWebsiteInput_272",
                      "key": app.getKey('id', '272')
                    })),
                    React.createElement('button', app.mergeAttributes('273', scope, {
                      "onClick": "handleClick"
                    }, {
                      "className": "btn btn-success",
                      "id": "createWebsiteButton_273",
                      "key": app.getKey('id', '273')
                    }), 'Create Website')))));
            }
            return out;
          })(scope),
          (function(scope) {
            var out = [];
            scope['shouldShow'] = app.methods['243']['shouldShow'](scope);
            if (app.methods['243']['shouldShow'](scope) === true) {
              out.push(React.createElement('div', app.mergeAttributes('243', scope, {}, {
                  "id": "pages_243",
                  "key": app.getKey('id', '243')
                }),
                React.createElement('div', app.mergeAttributes('111', scope, {}, {
                    "id": "topMenu_111",
                    "key": app.getKey('id', '111')
                  }),
                  React.createElement('div', app.mergeAttributes('181', scope, {}, {
                    "className": "pull-left",
                    "id": "appHeader_181",
                    "key": app.getKey('id', '181')
                  }), 'Bliss UI'),
                  React.createElement('div', app.mergeAttributes('88', scope, {}, {
                      "className": "float-left",
                      "id": "pageOptions_88",
                      "key": app.getKey('id', '88')
                    }),
                    React.createElement('div', app.mergeAttributes('105', scope, {}, {
                        "id": "projectDropdown",
                        "className": "btn-group",
                        "key": app.getKey('id', '105')
                      }),
                      React.createElement('button', app.mergeAttributes('106', scope, {}, {
                        "type": "button",
                        "data-toggle": "dropdown",
                        "className": "btn btn-default dropdown-toggle btn-sm",
                        "id": "dropdownButton_106",
                        "key": app.getKey('id', '106')
                      }), 'Pages'),
                      React.createElement('div', app.mergeAttributes('107', scope, {}, {
                          "className": "dropdown-menu",
                          "id": "options_107",
                          "key": app.getKey('id', '107')
                        }),
                        React.createElement('a', app.mergeAttributes('85', scope, {
                            "onClick": "handleClick"
                          }, {
                            "id": "newButton",
                            "className": "dropdown-item",
                            "href": "#",
                            "key": app.getKey('id', '85')
                          }),
                          React.createElement('i', app.mergeAttributes('163', scope, {}, {
                            "className": "fa fa-plus",
                            "id": "icon_163",
                            "key": app.getKey('id', '163')
                          })),
                          React.createElement('span', app.mergeAttributes('164', scope, {}, {
                            "id": "label_164",
                            "key": app.getKey('id', '164')
                          }), 'New page')),
                        React.createElement('div', app.mergeAttributes('158', scope, {}, {
                          "className": "dropdown-divider",
                          "id": "divider_158",
                          "key": app.getKey('id', '158')
                        })),
                        React.createElement('h6', app.mergeAttributes('162', scope, {}, {
                          "className": "dropdown-header",
                          "id": "existingPageLabels_162",
                          "key": app.getKey('id', '162')
                        }), 'Open page'),
                        (function(scope) {
                          var out = [];
                          var list = scope['repeater'] = app.methods['161']['repeater'](scope);
                          for (var i = 0; i < list.length; i++) {
                            scope['repeater_index'] = i;
                            out.push(React.createElement('a', app.mergeAttributes('161', scope, {
                                "onClick": "handleClick"
                              }, {
                                "href": "#",
                                "className": "dropdown-item",
                                "id": "existingProject_161",
                                "key": app.getKey('id', '161', i)
                              }),
                              React.createElement('i', app.mergeAttributes('166', scope, {}, {
                                "className": "fa fa-file-o",
                                "id": "icon_166",
                                "key": app.getKey('id', '166')
                              })),
                              React.createElement('span', app.mergeAttributes('165', scope, {}, {
                                "id": "label_165",
                                "key": app.getKey('id', '165')
                              }), app.methods['165']['getText'](scope))));
                          }
                          return out;
                        })(scope),
                        React.createElement('div', app.mergeAttributes('159', scope, {}, {
                          "className": "dropdown-divider",
                          "id": "divider_159",
                          "key": app.getKey('id', '159')
                        })),
                        React.createElement('h6', app.mergeAttributes('194', scope, {}, {
                          "className": "dropdown-header",
                          "id": "exportLabel_194",
                          "key": app.getKey('id', '194')
                        }), 'export page'),
                        React.createElement('a', app.mergeAttributes('190', scope, {
                            "onClick": "handleClick"
                          }, {
                            "id": "exportButton",
                            "href": "#",
                            "className": "dropdown-item",
                            "key": app.getKey('id', '190')
                          }),
                          React.createElement('i', app.mergeAttributes('191', scope, {}, {
                            "className": "fa fa-puzzle-piece",
                            "id": "icon_191",
                            "key": app.getKey('id', '191')
                          })),
                          React.createElement('span', app.mergeAttributes('192', scope, {}, {
                            "id": "label_192",
                            "key": app.getKey('id', '192')
                          }), 'Component')),
                        React.createElement('a', app.mergeAttributes('104', scope, {
                            "onClick": "handleClick"
                          }, {
                            "href": "#",
                            "className": "dropdown-item",
                            "id": "publishPage_104",
                            "key": app.getKey('id', '104')
                          }),
                          React.createElement('i', app.mergeAttributes('167', scope, {}, {
                            "className": "fa fa-paper-plane",
                            "id": "icon_167",
                            "key": app.getKey('id', '167')
                          })),
                          React.createElement('span', app.mergeAttributes('168', scope, {}, {
                            "id": "label_168",
                            "key": app.getKey('id', '168')
                          }), 'Publish')),
                        React.createElement('div', app.mergeAttributes('246', scope, {}, {
                          "className": "dropdown-divider",
                          "id": "divider_246",
                          "key": app.getKey('id', '246')
                        })),
                        React.createElement('h6', app.mergeAttributes('250', scope, {}, {
                          "className": "dropdown-header",
                          "id": "emailLabel_250",
                          "key": app.getKey('id', '250')
                        }), app.methods['250']['getText'](scope)),
                        React.createElement('a', app.mergeAttributes('260', scope, {
                            "onClick": "handleClick"
                          }, {
                            "href": "#",
                            "className": "dropdown-item",
                            "id": "switchPage_260",
                            "key": app.getKey('id', '260')
                          }),
                          React.createElement('i', app.mergeAttributes('258', scope, {}, {
                            "className": "fa fa-hand-o-left",
                            "id": "icon_258",
                            "key": app.getKey('id', '258')
                          })),
                          React.createElement('span', app.mergeAttributes('259', scope, {}, {
                            "id": "label_259",
                            "key": app.getKey('id', '259')
                          }), 'Switch Website')),
                        React.createElement('a', app.mergeAttributes('247', scope, {
                            "onClick": "handleClick"
                          }, {
                            "href": "#",
                            "className": "dropdown-item",
                            "id": "signOut_247",
                            "key": app.getKey('id', '247')
                          }),
                          React.createElement('i', app.mergeAttributes('248', scope, {}, {
                            "className": "fa fa-sign-out",
                            "id": "icon_248",
                            "key": app.getKey('id', '248')
                          })),
                          React.createElement('span', app.mergeAttributes('249', scope, {}, {
                            "id": "label_249",
                            "key": app.getKey('id', '249')
                          }), 'Sign out')))),
                    React.createElement('button', app.mergeAttributes('93', scope, {
                        "onClick": "handleClick",
                        "className": "getClass",
                        "style": "getStyles"
                      }, {
                        "id": "saveButton",
                        "key": app.getKey('id', '93')
                      }),
                      React.createElement('i', app.mergeAttributes('94', scope, {}, {
                        "className": "fa fa-floppy-o",
                        "id": "icon_94",
                        "key": app.getKey('id', '94')
                      }))),
                    React.createElement('button', app.mergeAttributes('201', scope, {
                        "onClick": "handleClick"
                      }, {
                        "className": "btn btn-default btn-sm",
                        "id": "refreshButton_201",
                        "key": app.getKey('id', '201')
                      }),
                      React.createElement('i', app.mergeAttributes('202', scope, {}, {
                        "className": "fa fa-refresh",
                        "id": "icon_202",
                        "key": app.getKey('id', '202')
                      })))),
                  React.createElement('div', app.mergeAttributes('274', scope, {}, {
                      "className": "float-left",
                      "id": "openContainer_274",
                      "key": app.getKey('id', '274')
                    }),
                    React.createElement('button', app.mergeAttributes('275', scope, {
                        "onClick": "handleClick"
                      }, {
                        "className": "btn btn-default btn-sm",
                        "id": "openButton_275",
                        "key": app.getKey('id', '275')
                      }),
                      React.createElement('i', app.mergeAttributes('276', scope, {}, {
                        "className": "fa fa-rocket",
                        "id": "icon_276",
                        "key": app.getKey('id', '276')
                      })),
                      React.createElement('span', app.mergeAttributes('277', scope, {}, {
                        "id": "span_277",
                        "key": app.getKey('id', '277')
                      }), ' Launch'))),
                  React.createElement('div', app.mergeAttributes('101', scope, {}, {
                      "className": "pull-left",
                      "id": "toggleContent",
                      "key": app.getKey('id', '101')
                    }),
                    React.createElement('div', app.mergeAttributes('189', scope, {}, {
                      "className": "pull-left",
                      "id": "toggleLabel_189",
                      "key": app.getKey('id', '189')
                    }), 'Current View'),
                    React.createElement('div', app.mergeAttributes('228', scope, {}, {
                        "id": "projectDropdown",
                        "className": "btn-group",
                        "key": app.getKey('id', '228')
                      }),
                      React.createElement('button', app.mergeAttributes('229', scope, {}, {
                        "type": "button",
                        "data-toggle": "dropdown",
                        "className": "btn btn-default dropdown-toggle btn-sm",
                        "id": "viewButton_229",
                        "key": app.getKey('id', '229')
                      }), app.methods['229']['getText'](scope)),
                      React.createElement('div', app.mergeAttributes('230', scope, {}, {
                          "className": "dropdown-menu",
                          "id": "viewOptions_230",
                          "key": app.getKey('id', '230')
                        }),
                        (function(scope) {
                          var out = [];
                          var list = scope['repeater'] = app.methods['231']['repeater'](scope);
                          for (var i = 0; i < list.length; i++) {
                            scope['repeater_index'] = i;
                            out.push(React.createElement('a', app.mergeAttributes('231', scope, {
                              "onClick": "handleClick"
                            }, {
                              "href": "#",
                              "className": "dropdown-item",
                              "id": "viewItem_231",
                              "key": app.getKey('id', '231', i)
                            }), app.methods['231']['getText'](scope)));
                          }
                          return out;
                        })(scope)))),
                  React.createElement('div', app.mergeAttributes('147', scope, {}, {
                      "className": "pull-left",
                      "id": "resolutionContainer_147",
                      "key": app.getKey('id', '147')
                    }),
                    React.createElement('div', app.mergeAttributes('185', scope, {}, {
                      "className": "pull-left",
                      "id": "resolutionLabel_185",
                      "key": app.getKey('id', '185')
                    }), 'Resolution'),
                    React.createElement('div', app.mergeAttributes('233', scope, {}, {
                        "id": "projectDropdown",
                        "className": "btn-group",
                        "key": app.getKey('id', '233')
                      }),
                      React.createElement('button', app.mergeAttributes('234', scope, {}, {
                        "type": "button",
                        "data-toggle": "dropdown",
                        "className": "btn btn-default dropdown-toggle btn-sm",
                        "id": "resButton_234",
                        "key": app.getKey('id', '234')
                      }), app.methods['234']['getText'](scope)),
                      React.createElement('div', app.mergeAttributes('235', scope, {}, {
                          "className": "dropdown-menu",
                          "id": "resOptions_235",
                          "key": app.getKey('id', '235')
                        }),
                        (function(scope) {
                          var out = [];
                          var list = scope['repeater'] = app.methods['236']['repeater'](scope);
                          for (var i = 0; i < list.length; i++) {
                            scope['repeater_index'] = i;
                            out.push(React.createElement('a', app.mergeAttributes('236', scope, {
                              "onClick": "handleClick"
                            }, {
                              "href": "#",
                              "className": "dropdown-item",
                              "id": "resItem_236",
                              "key": app.getKey('id', '236', i)
                            }), app.methods['236']['getText'](scope)));
                          }
                          return out;
                        })(scope)))),
                  React.createElement('div', app.mergeAttributes('187', scope, {}, {
                      "id": "toggleLayoutContainer_187",
                      "key": app.getKey('id', '187')
                    }),
                    React.createElement('div', app.mergeAttributes('188', scope, {}, {
                      "id": "layoutLabel_188",
                      "key": app.getKey('id', '188')
                    }), 'Layout'),
                    React.createElement('button', app.mergeAttributes('150', scope, {
                      "onClick": "setContentValue",
                      "className": "getClass",
                      "style": "getStyles"
                    }, {
                      "id": "showHtml_150",
                      "key": app.getKey('id', '150')
                    }), 'HTML'),
                    React.createElement('button', app.mergeAttributes('157', scope, {
                      "onClick": "setContentValue",
                      "className": "getClass",
                      "style": "getStyles"
                    }, {
                      "id": "showProperties_157",
                      "key": app.getKey('id', '157')
                    }), 'Properties')),
                  React.createElement('div', app.mergeAttributes('152', scope, {}, {
                      "className": "pull-right",
                      "id": "colorPicker_152",
                      "key": app.getKey('id', '152')
                    }),
                    React.createElement('input', app.mergeAttributes('153', scope, {
                      "value": "getValue",
                      "onChange": "handleChange"
                    }, {
                      "className": "hexColor",
                      "id": "inputText_153",
                      "key": app.getKey('id', '153')
                    })),
                    React.createElement('a', app.mergeAttributes('253', scope, {
                        "onClick": "handleClick"
                      }, {
                        "href": "#",
                        "id": "inputCopyLink_253",
                        "key": app.getKey('id', '253')
                      }),
                      React.createElement('i', app.mergeAttributes('254', scope, {}, {
                        "className": "fa fa-clipboard",
                        "id": "clipboardIcon_254",
                        "key": app.getKey('id', '254')
                      }))),
                    React.createElement('input', app.mergeAttributes('154', scope, {
                      "onChange": "handleChange",
                      "value": "getValue"
                    }, {
                      "type": "color",
                      "id": "inputColor_154",
                      "key": app.getKey('id', '154')
                    }))),
                  React.createElement('div', app.mergeAttributes('186', scope, {}, {
                    "className": "pull-right",
                    "id": "colorPickerLabel_186",
                    "key": app.getKey('id', '186')
                  }), 'Color picker')),
                React.createElement('div', app.mergeAttributes('96', scope, {}, {
                    "id": "blissPanels_96",
                    "key": app.getKey('id', '96')
                  }),
                  (function(scope) {
                    var out = [];
                    scope['shouldShow'] = app.methods['3']['shouldShow'](scope);
                    if (app.methods['3']['shouldShow'](scope) === true) {
                      out.push(React.createElement('div', app.mergeAttributes('3', scope, {}, {
                          "className": "float-left",
                          "id": "html_3",
                          "key": app.getKey('id', '3')
                        }),
                        React.createElement('h3', app.mergeAttributes('20', scope, {}, {
                          "id": "elementsHeader_20",
                          "key": app.getKey('id', '20')
                        }), 'HTML'),
                        React.createElement('div', app.mergeAttributes('110', scope, {}, {
                            "id": "treeContainer_110",
                            "key": app.getKey('id', '110')
                          }),
                          React.createElement(BlissTree.component, app.mergeAttributes('18', scope, {
                            "data": "setDataProp",
                            "onSelect": "setOnSelectProp",
                            "onCreate": "setOnCreateProp",
                            "onClone": "setOnCloneProp",
                            "onDelete": "setOnDeleteProp",
                            "onMove": "setOnMoveProp",
                            "_this": "setThis",
                            "selected": "getSelected"
                          }, {
                            "id": "elementTree_18",
                            "key": app.getKey('id', '18')
                          })))));
                    }
                    return out;
                  })(scope),
                  (function(scope) {
                    var out = [];
                    scope['shouldShow'] = app.methods['4']['shouldShow'](scope);
                    if (app.methods['4']['shouldShow'](scope) === true) {
                      out.push(React.createElement('div', app.mergeAttributes('4', scope, {
                          "style": "getStyles"
                        }, {
                          "id": "designer",
                          "className": "float-left",
                          "key": app.getKey('id', '4')
                        }),
                        React.createElement('div', app.mergeAttributes('80', scope, {
                            "style": "getStyle"
                          }, {
                            "id": "designerContainer_80",
                            "key": app.getKey('id', '80')
                          }),
                          React.createElement('div', app.mergeAttributes('205', scope, {
                              "style": "getStyles"
                            }, {
                              "id": "previewContainer_205",
                              "key": app.getKey('id', '205')
                            }),
                            React.createElement('h3', app.mergeAttributes('204', scope, {}, {
                              "className": "clearfix",
                              "id": "iframeHeader_204",
                              "key": app.getKey('id', '204')
                            }), app.methods['204']['getText'](scope)),
                            React.createElement('iframe', app.mergeAttributes('17', scope, {
                              "style": "getStyles"
                            }, {
                              "id": "preview",
                              "src": "about:blank",
                              "key": app.getKey('id', '17')
                            })))),
                        React.createElement('div', app.mergeAttributes('54', scope, {
                            "style": "getStyle"
                          }, {
                            "id": "jsEditor",
                            "key": app.getKey('id', '54')
                          }),
                          React.createElement('h3', app.mergeAttributes('55', scope, {}, {
                            "id": "h3Js",
                            "key": app.getKey('id', '55')
                          }), app.methods['55']['getText'](scope)),
                          React.createElement('div', app.mergeAttributes('56', scope, {}, {
                              "id": "code",
                              "key": app.getKey('id', '56')
                            }),
                            React.createElement(BlissJavascript.component, app.mergeAttributes('79', scope, {
                              "component": "setComponentProp",
                              "onChange": "setOnChangeProp"
                            }, {
                              "id": "blissJavascript_79",
                              "key": app.getKey('id', '79')
                            })))),
                        React.createElement('div', app.mergeAttributes('238', scope, {
                            "style": "getStyle"
                          }, {
                            "id": "dataEditor_238",
                            "key": app.getKey('id', '238')
                          }),
                          React.createElement('h3', app.mergeAttributes('239', scope, {}, {
                            "id": "h3Js",
                            "key": app.getKey('id', '239')
                          }), 'Data Editor'),
                          React.createElement('div', app.mergeAttributes('240', scope, {}, {
                              "id": "codeContainer_240",
                              "key": app.getKey('id', '240')
                            }),
                            React.createElement(BlissData.component, app.mergeAttributes('241', scope, {
                              "schemas": "setSchemas",
                              "onChange": "setOnChangeProp"
                            }, {
                              "id": "blissData_241",
                              "key": app.getKey('id', '241')
                            })))),
                        React.createElement('div', app.mergeAttributes('97', scope, {
                            "style": "getStyle"
                          }, {
                            "id": "generalEditor",
                            "key": app.getKey('id', '97')
                          }),
                          React.createElement('h3', app.mergeAttributes('98', scope, {}, {
                            "id": "h3General",
                            "key": app.getKey('id', '98')
                          }), 'Settings'),
                          React.createElement('div', app.mergeAttributes('288', scope, {}, {
                              "id": "fileNameContainer_288",
                              "key": app.getKey('id', '288')
                            }),
                            React.createElement('label', app.mergeAttributes('289', scope, {}, {
                              "id": "fileNameLabel_289",
                              "key": app.getKey('id', '289')
                            }), 'File name'),
                            React.createElement('input', app.mergeAttributes('290', scope, {
                              "onChange": "handleChange",
                              "value": "getText"
                            }, {
                              "placeholder": "File name",
                              "className": "form-control",
                              "id": "fileNameInput_290",
                              "key": app.getKey('id', '290')
                            }))),
                          React.createElement('div', app.mergeAttributes('287', scope, {}, {
                              "id": "pageTitleContainer_287",
                              "key": app.getKey('id', '287')
                            }),
                            React.createElement('label', app.mergeAttributes('286', scope, {}, {
                              "id": "pageTitleLabel_286",
                              "key": app.getKey('id', '286')
                            }), 'Page title'),
                            React.createElement('input', app.mergeAttributes('285', scope, {
                              "value": "getText",
                              "onChange": "handleChange"
                            }, {
                              "placeholder": "Page title",
                              "className": "form-control",
                              "id": "pageTitleInput_285",
                              "key": app.getKey('id', '285')
                            }))),
                          React.createElement('hr', app.mergeAttributes('291', scope, {}, {
                            "id": "separator_291",
                            "key": app.getKey('id', '291')
                          })),
                          React.createElement('button', app.mergeAttributes('196', scope, {}, {
                              "className": "btn btn-default btn-sm",
                              "id": "deletePage_196",
                              "key": app.getKey('id', '196')
                            }),
                            React.createElement('i', app.mergeAttributes('197', scope, {}, {
                              "className": "fa fa-trash",
                              "id": "icon_197",
                              "key": app.getKey('id', '197')
                            })),
                            React.createElement('span', app.mergeAttributes('198', scope, {}, {
                              "id": "deleteLabel_198",
                              "key": app.getKey('id', '198')
                            }), 'Delete page'))),
                        React.createElement('div', app.mergeAttributes('179', scope, {
                            "style": "getStyle"
                          }, {
                            "id": "globalJavascriptEditor_179",
                            "key": app.getKey('id', '179')
                          }),
                          React.createElement('h3', app.mergeAttributes('109', scope, {}, {
                            "id": "h3GeneralJs",
                            "key": app.getKey('id', '109')
                          }), 'Global JavaScript'),
                          React.createElement('div', app.mergeAttributes('137', scope, {}, {
                              "className": "clearfix",
                              "id": "generalJsEditorContainer_137",
                              "key": app.getKey('id', '137')
                            }),
                            React.createElement(BlissJavascript.component, app.mergeAttributes('108', scope, {
                              "component": "setComponentProp",
                              "onChange": "setOnChangeProp"
                            }, {
                              "id": "projJs_108",
                              "key": app.getKey('id', '108')
                            })))),
                        React.createElement('div', app.mergeAttributes('180', scope, {
                            "style": "getStyle"
                          }, {
                            "id": "globalCssEditor_180",
                            "key": app.getKey('id', '180')
                          }),
                          React.createElement('h3', app.mergeAttributes('223', scope, {}, {
                            "className": "clearfix",
                            "id": "globalCssHeader_223",
                            "key": app.getKey('id', '223')
                          }), 'Global CSS'),
                          React.createElement(BlissPropertiesCss.component, app.mergeAttributes('224', scope, {
                            "onChange": "setOnChange",
                            "component": "setComponent"
                          }, {
                            "id": "globalCss_224",
                            "key": app.getKey('id', '224')
                          }))),
                        React.createElement('div', app.mergeAttributes('225', scope, {
                            "style": "getStyle"
                          }, {
                            "id": "cssVarsEditor_225",
                            "key": app.getKey('id', '225')
                          }),
                          React.createElement('h3', app.mergeAttributes('140', scope, {}, {
                            "className": "clearfix",
                            "id": "globalCssVarsHeader_140",
                            "key": app.getKey('id', '140')
                          }), 'Global CSS Vars'),
                          React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('141', scope, {
                            "objectContainer": "setObjectContainer",
                            "objectKey": "setObjectKey",
                            "objectType": "setObjectType",
                            "onChange": "setOnChange",
                            "itemKey": "setItemKey",
                            "itemValue": "setItemValue"
                          }, {
                            "id": "globalCssVars_141",
                            "key": app.getKey('id', '141')
                          }))),
                        React.createElement('div', app.mergeAttributes('226', scope, {
                            "style": "getStyle"
                          }, {
                            "id": "pageLoadEditor_226",
                            "key": app.getKey('id', '226')
                          }),
                          React.createElement('h3', app.mergeAttributes('155', scope, {}, {
                            "className": "clearfix",
                            "id": "loadHeader_155",
                            "key": app.getKey('id', '155')
                          }), 'Page Load Functions'),
                          React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('156', scope, {
                            "objectContainer": "setObjectContainer",
                            "objectKey": "setObjectKey",
                            "objectType": "setObjectType",
                            "onChange": "setOnChange"
                          }, {
                            "id": "loadFunctions_156",
                            "key": app.getKey('id', '156')
                          })),
                          React.createElement('h3', app.mergeAttributes('138', scope, {}, {
                            "className": "clearfix",
                            "id": "stylesheetHeader_138",
                            "key": app.getKey('id', '138')
                          }), 'Stylesheets'),
                          React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('139', scope, {
                            "objectContainer": "setObjectContainer",
                            "objectKey": "setObjectKey",
                            "objectType": "setObjectType",
                            "onChange": "setOnChange"
                          }, {
                            "id": "stylesheetProperties_139",
                            "key": app.getKey('id', '139')
                          })),
                          React.createElement('h3', app.mergeAttributes('136', scope, {}, {
                            "className": "clearfix",
                            "id": "scriptsHeader_136",
                            "key": app.getKey('id', '136')
                          }), 'Scripts'),
                          React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('135', scope, {
                            "objectContainer": "setObjectContainer",
                            "objectKey": "setObjectKey",
                            "objectType": "setObjectType",
                            "onChange": "setOnChange"
                          }, {
                            "id": "scriptProperties_135",
                            "key": app.getKey('id', '135')
                          }))),
                        React.createElement('div', app.mergeAttributes('227', scope, {
                            "style": "getStyle"
                          }, {
                            "id": "packagesEditor_227",
                            "key": app.getKey('id', '227')
                          }),
                          React.createElement('h3', app.mergeAttributes('142', scope, {}, {
                            "className": "clearfix",
                            "id": "packagesHeader_142",
                            "key": app.getKey('id', '142')
                          }), 'node packages (name, version)'),
                          React.createElement(BlissPropertiesGeneric.component, app.mergeAttributes('143', scope, {
                            "objectContainer": "setObjectContainer",
                            "objectKey": "setObjectKey",
                            "objectType": "setObjectType",
                            "onChange": "setOnChange",
                            "itemKey": "setItemKey",
                            "itemValue": "setItemValue"
                          }, {
                            "id": "packagesProperties_143",
                            "key": app.getKey('id', '143')
                          })))));
                    }
                    return out;
                  })(scope),
                  (function(scope) {
                    var out = [];
                    scope['shouldShow'] = app.methods['77']['shouldShow'](scope);
                    if (app.methods['77']['shouldShow'](scope) === true) {
                      out.push(React.createElement('div', app.mergeAttributes('77', scope, {}, {
                          "id": "propertiesContainer",
                          "className": "float-left",
                          "key": app.getKey('id', '77')
                        }),
                        React.createElement('h3', app.mergeAttributes('182', scope, {}, {
                          "id": "propertyHeader_182",
                          "key": app.getKey('id', '182')
                        }), 'properties'),
                        React.createElement('div', app.mergeAttributes('151', scope, {}, {
                            "id": "propertiesPadding_151",
                            "key": app.getKey('id', '151')
                          }),
                          React.createElement('button', app.mergeAttributes('278', scope, {
                            "style": "getStyles",
                            "onClick": "handleClick"
                          }, {
                            "className": "btn btn-default btn-block btn-sm",
                            "id": "toggleJavascript_278",
                            "key": app.getKey('id', '278')
                          }), 'Javascript for HTML'),
                          React.createElement(BlissProperties.component, app.mergeAttributes('11', scope, {
                            "component": "setComponentProp",
                            "onChange": "setOnChangeProp"
                          }, {
                            "id": "blissProperties_11",
                            "key": app.getKey('id', '11')
                          })))));
                    }
                    return out;
                  })(scope)),
                React.createElement('div', app.mergeAttributes('95', scope, {}, {
                  "id": "statusBar",
                  "key": app.getKey('id', '95')
                }), app.methods['95']['showStatus'](scope))));
            }
            return out;
          })(scope)));
    };
    app.render = function() {
      var isComponent = (typeof component === 'undefined') ? false : true;
      if (isComponent) {
        if (component.state === null) return;
        component.forceUpdate();
      } else {
        ReactDOM.render(app.rootComponent(), document.getElementById('app'));
      }
    }
    app.stateQueue = [];
    app.stateProcessing = false;
    app.setState = function(fn, callback) {
      app.stateQueue.push({
        fn: fn,
        callback: callback
      });
      var _process = function() {
        app.stateProcessing = true;
        var _item = app.stateQueue.shift();
        _item.fn();
        app.render();
        if (typeof _item.callback !== "undefined") _item.callback();
        if (app.stateQueue.length === 0) {
          app.stateProcessing = false;
        } else {
          _process();
        }
      };
      if (!app.stateProcessing) _process();
    };
    app.load = function() {
      app.js.init();
      if (window.parent && !window.blissUi) {
        if (window.parent.blissUi) {
          if (window.parent.blissUi.js.reloadSavedState) {
            try {
              window.parent.blissUi.js.reloadSavedState(app)
            } catch (e) {
              console.error('error reloading saved state', e)
            }
          }
        }
      }
    }
    app.load();

    return app;
  };
  var instance = createApp();
  instance.component = React.createClass({
    getInitialState: function() {
      var that = this;
      return {
        app: createApp(that)
      };
    },
    componentDidMount: function() {
      this.state.app.props = this.props;
      this.setState({
        app: this.state.app
      });
    },
    componentWillUnmount: function() {
      if (this.state.app.js.destroy_component !== 'undefined') this.state.app.js.destroy_component();
    },
    componentWillReceiveProps: function(newProps) {
      this.state.app.props = newProps;
      this.setState({
        app: this.state.app
      });
    },
    render: function() {
      return this.state.app.rootComponent(this.state.app.props);
    }
  });

  return instance;
})();