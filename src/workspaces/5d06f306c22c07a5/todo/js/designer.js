var todo = (function() {
  var createApp = function(component) {
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js.init = function() {
      // setup app state
      var state = app.js.createState('todo');
      state.setData('currentColor', '#5f38a9');
      state.setData('currentTodo', '');

      app.todo = state;

      //app.state.currentColor = '#5f38a9';
      //app.state.currentTodo = '';
      //app.state.completedTodos = {};
      //app.state.todoColors = [];
      //app.state.todos = [];

      // render application
      app.render();
    }
    app.js.createState = function(rawName) {
      var name = rawName.replace(/[^\w]/gi, '');

      var hasValue = function(item) {
        return (typeof item !== "undefined" && item !== null);
      };

      if (!hasValue(app.state._managed)) app.state._managed = {};
      if (!hasValue(app.state._managed[name])) app.state._managed[name] = {};

      var managed = app.state._managed[name];

      var getNewId = function() {
        return managed.nextId++;
      };

      var getAll = function() {
        return managed.data;
      };

      var find = function(id) {
        var found = null;
        for (var i = 0; i < managed.data.length; i++) {
          var item = managed.data[i];
          if (item.id === id) {
            found = item;
            break;
          }
        }
        return found;
      };

      var findIndex = function(id) {
        var found = -1;
        for (var i = 0; i < managed.data.length; i++) {
          var item = managed.data[i];
          if (item.id === id) {
            found = i;
            break;
          }
        }
        return found;
      };

      var create = function(data) {
        if (!hasValue(data)) return;
        if (!hasValue(data.id)) data.id = getNewId();
        managed.data.push(data);
      };

      var update = function(id, data) {
        var item = find(id);
        for (key in data) {
          if (data.hasOwnProperty(key)) {
            item[key] = data[key];
          }
        }
      };

      var remove = function(id) {
        var index = findIndex(id);
        if (index !== -1) managed.data.splice(index, 1);
      };

      var removeAll = function() {
        managed.data.splice(0, managed.data.length);
      };

      var replaceAll = function(dataArray) {
        removeAll();
        for (var i = 0; i < dataArray.length; i++) {
          create(dataArray[i]);
        }
      };

      var setData = function(key, value) {
        managed.internalData[key] = value;
      };

      var getData = function(key) {
        return managed.internalData[key];
      };

      managed.selected = null;
      managed.nextId = 0;
      managed.data = [];
      managed.internalData = {};
      managed.getNewId = getNewId;
      managed.hasValue = hasValue;
      managed.getAll = getAll;
      managed.find = find;
      managed.findIndex = findIndex;
      managed.create = create;
      managed.update = update;
      managed.remove = remove;
      managed.removeAll = removeAll;
      managed.replaceAll = replaceAll;
      managed.setData = setData;
      managed.getData = getData;

      return managed;
    }
    app.js.getState = function(rawName) {
      var name = rawName.replace(/[^\w]/gi, '');
      return app.state._managed[name];
    }
    app.methods["9"] = {};
    app.methods["9"].handleClearCompleted = function(scope, attributes) {
      return function(e) {
        app.setState(function() {
          var ts = app.todo.getAll();
          var dels = [];
          for (var i = 0; i < ts.length; i++) {
            var t = ts[i];
            if (t.done === true) dels.push(t.id);
          }

          for (var i = 0; i < dels.length; i++) {
            app.todo.remove(dels[i]);
          }
        });
      }
    };
    app.methods["4"] = {};
    app.methods["4"].handleChange = function(scope, attributes) {
      return function(e) {
        app.setState(function() {
          app.todo.setData('currentTodo', e.target.value);
        });
      }
    };

    app.methods["4"].getValue = function(scope, attributes) {
      return app.todo.getData('currentTodo');
    }
    app.methods["4"].changeHue = function(rgb, degree) {
      function changeHue(rgb, degree) {
        var hsl = rgbToHSL(rgb);
        hsl.h += degree;
        if (hsl.h > 360) {
          hsl.h -= 360;
        } else if (hsl.h < 0) {
          hsl.h += 360;
        }
        return hslToRGB(hsl);
      }

      // exepcts a string and returns an object
      function rgbToHSL(rgb) {
        // strip the leading # if it's there
        rgb = rgb.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (rgb.length == 3) {
          rgb = rgb.replace(/(.)/g, '$1$1');
        }

        var r = parseInt(rgb.substr(0, 2), 16) / 255,
          g = parseInt(rgb.substr(2, 2), 16) / 255,
          b = parseInt(rgb.substr(4, 2), 16) / 255,
          cMax = Math.max(r, g, b),
          cMin = Math.min(r, g, b),
          delta = cMax - cMin,
          l = (cMax + cMin) / 2,
          h = 0,
          s = 0;

        if (delta == 0) {
          h = 0;
        } else if (cMax == r) {
          h = 60 * (((g - b) / delta) % 6);
        } else if (cMax == g) {
          h = 60 * (((b - r) / delta) + 2);
        } else {
          h = 60 * (((r - g) / delta) + 4);
        }

        if (delta == 0) {
          s = 0;
        } else {
          s = (delta / (1 - Math.abs(2 * l - 1)))
        }

        return {
          h: h,
          s: s,
          l: l
        }
      }

      // expects an object and returns a string
      function hslToRGB(hsl) {
        var h = hsl.h,
          s = hsl.s,
          l = hsl.l,
          c = (1 - Math.abs(2 * l - 1)) * s,
          x = c * (1 - Math.abs((h / 60) % 2 - 1)),
          m = l - c / 2,
          r, g, b;

        if (h < 60) {
          r = c;
          g = x;
          b = 0;
        } else if (h < 120) {
          r = x;
          g = c;
          b = 0;
        } else if (h < 180) {
          r = 0;
          g = c;
          b = x;
        } else if (h < 240) {
          r = 0;
          g = x;
          b = c;
        } else if (h < 300) {
          r = x;
          g = 0;
          b = c;
        } else {
          r = c;
          g = 0;
          b = x;
        }

        r = normalize_rgb_value(r, m);
        g = normalize_rgb_value(g, m);
        b = normalize_rgb_value(b, m);

        return rgbToHex(r, g, b);
      }

      function normalize_rgb_value(color, m) {
        color = Math.floor((color + m) * 255);
        if (color < 0) {
          color = 0;
        }
        return color;
      }

      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }

      return changeHue(rgb, degree);
    }
    app.methods["4"].handleKeyDown = function(scope, attributes) {
      var comp = this;
      return function(e) {
        var key = e.which,
          ENTER = 13,
          ESCAPE = 27;
        if (key !== ENTER && key !== ESCAPE) return;

        app.setState(function() {
          if (key === ENTER) {
            app.todo.setData(
              'currentColor',
              comp.changeHue(app.todo.getData('currentColor'), 15)
            );
            app.todo.create({
              "label": app.todo.getData('currentTodo'),
              "done": false,
              "color": app.todo.getData('currentColor')
            });
          }
          app.todo.setData('currentTodo', '');
        });
      }
    };
    app.methods["3"] = {};
    app.methods["3"].repeatTodos = function(scope, attributes) {
      return app.todo.getAll();
    };

    app.methods["3"].showTodo = function(scope, attributes) {
      var t = scope.repeatTodos[scope.repeatTodos_index];
      return t.label;
    };

    app.methods["3"].getStyles = function(scope, attributes) {
      var t = scope.repeatTodos[scope.repeatTodos_index];
      var styles = {
        'backgroundColor': t.color
      };

      if (t.done === true) {
        styles.backgroundColor = '#444';
        styles.textDecoration = 'line-through';
      }

      return styles;
    }
    app.methods["3"].handleClick = function(scope, attributes) {
      var t = scope.repeatTodos[scope.repeatTodos_index];

      return function(e) {
        app.setState(function() {
          app.todo.update(t.id, {
            'done': !t.done
          });
        });
      }
    };

    app.methods["3"].getKey = function(scope, attributes) {
      var t = scope.repeatTodos[scope.repeatTodos_index];
      return t.id;
    }
    app.methods["10"] = {};
    app.methods["10"].handleDelete = function(scope, attributes) {
      var t = scope.repeatTodos[scope.repeatTodos_index];

      return function(e) {
        e.stopPropagation();
        app.setState(function() {
          app.todo.remove(t.id);
        });
      }
    };
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
          React.createElement('div', app.mergeAttributes('7', scope, {}, {
              "id": "todoListContainer_7",
              "key": app.getKey('id', '7')
            }),
            React.createElement('h1', app.mergeAttributes('6', scope, {}, {
              "className": "float-left",
              "id": "label_6",
              "key": app.getKey('id', '6')
            }), "Todos"),
            React.createElement('a', app.mergeAttributes('9', scope, {
              "onClick": "handleClearCompleted"
            }, {
              "href": "#",
              "id": "clearCompleted_9",
              "key": app.getKey('id', '9')
            }), "Clear Completed"),
            React.createElement('input', app.mergeAttributes('4', scope, {
              "value": "getValue",
              "onChange": "handleChange",
              "onKeyDown": "handleKeyDown"
            }, {
              "id": "input_4",
              "key": app.getKey('id', '4')
            })),
            React.createElement('div', app.mergeAttributes('8', scope, {}, {
                "id": "listContainer_8",
                "key": app.getKey('id', '8')
              }),
              (function(scope) {
                var out = [];
                var list = scope['repeatTodos'] = app.methods['3']['repeatTodos'](scope);
                for (var i = 0; i < list.length; i++) {
                  scope['repeatTodos_index'] = i;
                  out.push(React.createElement('div', app.mergeAttributes('3', scope, {
                      "style": "getStyles",
                      "onClick": "handleClick",
                      "key": "getKey"
                    }, {
                      "id": "listItem_3",
                      "key": app.getKey('id', '3', i)
                    }), app.methods['3']['showTodo'](scope),
                    React.createElement('a', app.mergeAttributes('10', scope, {
                      "onClick": "handleDelete"
                    }, {
                      "href": "#",
                      "id": "deletebutton_10",
                      "key": app.getKey('id', '10')
                    }), "Delete")));
                }
                return out;
              })(scope)))));
    };
    app.state = {};
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