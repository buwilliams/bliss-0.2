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
    app.methods["7"] = {};
    app.methods["7"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        app.dispatch({
          path: '/todos',
          action: 'setLabel',
          label: e.target.value
        })
      }
    };

    app.methods["7"]['getValue'] = function(scope, attributes) {
      return app.state.todos.label;
    }
    app.methods["7"]['handleKeyup'] = function(scope, attributes) {
      return function(e) {
        if (e.keyCode == 13) {
          if (app.state.todos.label === '') return;
          app.dispatch({
            path: '/todos',
            action: 'addTodo',
            label: app.state.todos.label
          })

          app.dispatch({
            path: '/todos',
            action: 'setLabel',
            label: ''
          })
        }
      }
    };
    app.methods["8"] = {};
    app.methods["8"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        if (app.state.todos.label === '') return;
        app.dispatch({
          path: '/todos',
          action: 'addTodo',
          label: app.state.todos.label
        })

        app.dispatch({
          path: '/todos',
          action: 'setLabel',
          label: ''
        })
      }
    };
    app.methods["9"] = {};
    app.methods["9"]['repeater'] = function(scope, attributes) {
      return app.state.todos.list
    };

    app.methods["9"]['getText'] = function(scope, attributes) {
      return scope.repeater[scope.repeater_index].label
    };

    app.methods["9"]['handleClick'] = function(scope, attributes) {
      var index = scope.repeater_index
      return function(e) {
        app.dispatch({
          path: '/todos',
          action: 'toggleTodo',
          index: index
        })
      }
    };

    app.methods["9"]['getStyle'] = function(scope, attributes) {
      var style = {}
      var done = scope.repeater[scope.repeater_index].done
      if (done) {
        style.textDecoration = 'line-through'
        style.backgroundColor = '#121026'
      }
      return style;
    }
    app.methods["13"] = {};
    app.methods["13"]['handleClick'] = function(scope, attributes) {
      var index = scope.repeater_index
      return function(e) {
        e.stopPropagation()
        app.dispatch({
          path: '/todos',
          action: 'deleteTodo',
          index: index
        })
      }
    };
    app.methods["16"] = {};
    app.methods["16"]['getText'] = function(scope, attributes) {
      var todos = app.state.todos.list
      var total = todos.length
      var count = 0

      todos.forEach(function(todo) {
        if (todo.done) count++
      })

      if (total === 0) {
        return "Start by adding a few to-dos."
      } else if (count === 0) {
        return "Time to crush to-dos!"
      } else if (count === total) {
        return "BOOM! All to-dos crushed."
      } else {
        return "You've crushed " + count + " to-dos. You've have " + (total - count) + " remaining.";
      }
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
    app.schema['/todos']['init'] = function(data, args) {
      var newData = {
        label: '',
        list: []
      }
      return newData;
    }
    app.schema['/todos']['setLabel'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.label = args.label
      return newData;
    }
    app.schema['/todos']['addTodo'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.list.push({
        done: false,
        label: args.label
      })
      return newData;
    }
    app.schema['/todos']['toggleTodo'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.list[args.index].done = !newData.list[args.index].done
      return newData;
    }
    app.schema['/todos']['deleteTodo'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.list.splice(args.index, 1)
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
          React.createElement('div', app.mergeAttributes('10', scope, {}, {
              "className": "container",
              "id": "container_10",
              "key": app.getKey('id', '10')
            }),
            React.createElement('div', app.mergeAttributes('11', scope, {}, {
                "className": "row",
                "id": "row_11",
                "key": app.getKey('id', '11')
              }),
              React.createElement('div', app.mergeAttributes('12', scope, {}, {
                  "className": "col-md-10 offset-md-1",
                  "id": "column_12",
                  "key": app.getKey('id', '12')
                }),
                React.createElement('h1', app.mergeAttributes('6', scope, {}, {
                  "id": "header_6",
                  "key": app.getKey('id', '6')
                }), 'Pretty To-do list'),
                React.createElement('input', app.mergeAttributes('7', scope, {
                  "value": "getValue",
                  "onChange": "handleChange",
                  "onKeyUp": "handleKeyup"
                }, {
                  "id": "todoInput_7",
                  "key": app.getKey('id', '7')
                })),
                React.createElement('button', app.mergeAttributes('8', scope, {
                  "onClick": "handleClick"
                }, {
                  "id": "button_8",
                  "key": app.getKey('id', '8')
                }), 'ADD TO-DO'),
                React.createElement('div', app.mergeAttributes('14', scope, {}, {
                    "id": "iconContainer_14",
                    "key": app.getKey('id', '14')
                  }),
                  React.createElement('i', app.mergeAttributes('15', scope, {}, {
                    "className": "fas fa-arrow-circle-down",
                    "id": "downIcon_15",
                    "key": app.getKey('id', '15')
                  }))),
                (function(scope) {
                  var out = [];
                  var list = scope['repeater'] = app.methods['9']['repeater'](scope);
                  for (var i = 0; i < list.length; i++) {
                    scope['repeater_index'] = i;
                    out.push(React.createElement('div', app.mergeAttributes('9', scope, {
                        "style": "getStyle",
                        "onClick": "handleClick"
                      }, {
                        "id": "listOfToDos_9",
                        "key": app.getKey('id', '9', i)
                      }), app.methods['9']['getText'](scope),
                      React.createElement('i', app.mergeAttributes('13', scope, {
                        "onClick": "handleClick"
                      }, {
                        "className": "fas fa-trash",
                        "id": "deleteIcon_13",
                        "key": app.getKey('id', '13')
                      }))));
                  }
                  return out;
                })(scope),
                React.createElement('div', app.mergeAttributes('16', scope, {}, {
                  "id": "completedTodos_16",
                  "key": app.getKey('id', '16')
                }), app.methods['16']['getText'](scope)))))));
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