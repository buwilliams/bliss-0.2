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
          path: '/todos',
          action: 'current_todo',
          text: e.target.value
        })
      }
    };

    app.methods["2"]['handleKeyDown'] = function(scope, attributes) {
      return function(e) {
        var ENTER = 13;
        if (e.keyCode === ENTER) {
          // add a todo
          app.dispatch({
            path: '/todos',
            action: 'add_todo',
            text: app.state.todos.currentTodo
          });

          // clear the current todo
          app.dispatch({
            path: '/todos',
            action: 'current_todo',
            text: ''
          });
        }
      }
    };

    app.methods["2"]['getValue'] = function(scope, attributes) {
      return app.state.todos.currentTodo;
    }
    app.methods["4"] = {};
    app.methods["4"]['getText'] = function(scope, attributes) {
      return "Current todo: " + app.state.todos.currentTodo;
    };
    app.methods["3"] = {};
    app.methods["3"]['repeater'] = function(scope, attributes) {
      return app.state.todos.items;
    };

    app.methods["3"]['getText'] = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].text;
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
    app.schema['/todos'] = {};
    app.schema['/todos']['init'] = function(data, options) {
      var newData = {
        currentTodo: '',
        items: []
      };

      return newData;
    }
    app.schema['/todos']['current_todo'] = function(data, options) {
      var newData = Object.assign({}, data);
      newData.currentTodo = options.text;
      return newData;
    }
    app.schema['/todos']['add_todo'] = function(data, options) {
      var newData = Object.assign({}, data);

      var newTodo = {
        text: options.text,
        completed: false
      };

      data.items.push(newTodo);

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
          React.createElement('input', app.mergeAttributes('2', scope, {
            "onChange": "handleChange",
            "onKeyDown": "handleKeyDown",
            "value": "getValue"
          }, {
            "placeholder": "Enter a new todo",
            "id": "newTodo_2",
            "key": app.getKey('id', '2')
          })),
          React.createElement('div', app.mergeAttributes('4', scope, {}, {
            "id": "showCurrentTodo_4",
            "key": app.getKey('id', '4')
          }), app.methods['4']['getText'](scope)),
          (function(scope) {
            var out = [];
            var list = scope['repeater'] = app.methods['3']['repeater'](scope);
            for (var i = 0; i < list.length; i++) {
              scope['repeater_index'] = i;
              out.push(React.createElement('div', app.mergeAttributes('3', scope, {}, {
                "id": "todoList_3",
                "key": app.getKey('id', '3', i)
              }), app.methods['3']['getText'](scope)));
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