var todo = (function() {
  var createApp = function(component) {
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js['init'] = function() {
      app.render();
    }
    app.methods["2"] = {};
    app.methods["2"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        app.dispatch({
          path: '/some_path',
          action: 'some_action',
          label: 'some_label'
        })
      }
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
    app.schema['/todos'] = {};
    app.schema['/todos']['init'] = function(data, args) {
      var newData = {
        current: '',
        list: []
      }
      return newData;
    }
    app.schema['/todos']['addTodo'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.list.push({
        label: args.label,
        done: false
      })
      return newData;
    }
    app.schema['/todos']['setCurrent'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.current = args.label
      return newData;
    }
    app.schema['/todos']['new_action'] = function(data, args) {
      var newData = Object.assign({}, data)
      // your edits here
      return newData;
    }
    if (app.schema['/todos']['init']) {
      app.assignPath(app.state, '/todos', app.schema['/todos']['init']());
    } else {
      app.assignPath(app.state, '/todos');
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
            "id": "todo_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('h1', app.mergeAttributes('5', scope, {}, {
            "id": "header_5",
            "key": app.getKey('id', '5')
          }), 'To-do List'),
          React.createElement('input', app.mergeAttributes('2', scope, {}, {
            "id": "todoInput_2",
            "key": app.getKey('id', '2')
          })),
          React.createElement('button', app.mergeAttributes('4', scope, {}, {
            "id": "addTodoButton_4",
            "key": app.getKey('id', '4')
          }), 'add todo'),
          React.createElement('div', app.mergeAttributes('3', scope, {}, {
            "id": "listOfTodos_3",
            "key": app.getKey('id', '3')
          }), 'I\'m a todo')));
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