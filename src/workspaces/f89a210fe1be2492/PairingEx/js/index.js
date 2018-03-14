var index = (function() {
  var createApp = function(component) {
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js['init'] = function() {
      app.dispatch({
        path: '/users',
        action: 'fetchUsers'
      })
    }
    app.methods["9"] = {};
    app.methods["9"]['getCurrentUser'] = function(scope, attributes) {
      return scope.userList[scope.userList_index];
    };

    app.methods["9"]['userList'] = function(scope, attributes) {
      return app.state.users.users;
    };

    app.methods["9"]['shouldShow'] = function(scope, attributes) {
      return false;
    }
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
    app.schema['/users'] = {};
    app.schema['/users']['init'] = function(data, args) {
      var state = {
        currentUser: 'Buddy',
        users: []
      }
      return state;
    }
    app.schema['/users']['fetchUsers'] = function(data, args) {
      setTimeout(function() {
        app.dispatch({
          path: '/users',
          action: 'setUsers',
          users: ['buddy', 'austin']
        })
      }, 1000);
      // fetch(url).then(function(data) {
      //});
      return data;
    }
    app.schema['/users']['setUsers'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.users = args.users
      console.log('new users', newData.users);
      return newData;
    }
    if (app.schema['/users']['init']) {
      app.assignPath(app.state, '/users', app.schema['/users']['init']());
    } else {
      app.assignPath(app.state, '/users');
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
            "id": "index_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('div', app.mergeAttributes('2', scope, {}, {
              "id": "header_2",
              "key": app.getKey('id', '2')
            }),
            React.createElement('div', app.mergeAttributes('6', scope, {}, {
              "id": "logo_6",
              "key": app.getKey('id', '6')
            }), 'Acme, Inc.'),
            React.createElement('div', app.mergeAttributes('7', scope, {}, {
              "id": "title_7",
              "key": app.getKey('id', '7')
            }), 'Welcome Now')),
          React.createElement('div', app.mergeAttributes('8', scope, {}, {
              "id": "contentFlexbox_8",
              "key": app.getKey('id', '8')
            }),
            React.createElement('div', app.mergeAttributes('4', scope, {}, {
              "id": "sidebar_4",
              "key": app.getKey('id', '4')
            }), 'sidebar'),
            React.createElement('div', app.mergeAttributes('5', scope, {}, {
                "id": "content_5",
                "key": app.getKey('id', '5')
              }), 'content',
              (function(scope) {
                var out = [];
                var list = scope['userList'] = app.methods['9']['userList'](scope);
                for (var i = 0; i < list.length; i++) {
                  scope['userList_index'] = i;
                  out.push(React.createElement('div', app.mergeAttributes('9', scope, {}, {
                    "id": "currentUser_9",
                    "key": app.getKey('id', '9', i)
                  }), app.methods['9']['getCurrentUser'](scope)));
                }
                return out;
              })(scope))),
          React.createElement('div', app.mergeAttributes('3', scope, {}, {
            "id": "footer_3",
            "key": app.getKey('id', '3')
          }), 'footer')));
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