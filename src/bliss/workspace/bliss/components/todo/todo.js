var todo = (function() {
  var app = {};
  app.state = {};
  app.props = {}
  app.getKey = function() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) out.push(arguments[i]);
    return out.join('_');
  };
  app.mergeAttributes = function(id, scope, dynamicAttributes, attrs) {
    Object.keys(dynamicAttributes).forEach(function(key) {
      var fn = dynamicAttributes[key];
      var value = app.methods[id][fn](scope, attrs);
      attrs[key] = value;
    });
    return attrs;
  }
  app.methods = {};
  app.methods['9'] = {};
  app.methods['9']['handleClearCompleted'] = function(scope, attributes) {
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
  };;
  app.methods['4'] = {};
  app.methods['4']['handleChange'] = function(scope, attributes) {
    return function(e) {
      app.setState(function() {
        app.todo.setData('currentTodo', e.target.value);
      });
    }
  };;
  app.methods['4']['getValue'] = function(scope, attributes) {
    return app.todo.getData('currentTodo');
  };
  app.methods['4']['changeHue'] = function(rgb, degree) {
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
  };
  app.methods['4']['handleKeyDown'] = function(scope, attributes) {
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
  };;
  app.methods['3'] = {};
  app.methods['3']['repeatTodos'] = function(scope, attributes) {
    return app.todo.getAll();
  };;
  app.methods['3']['showTodo'] = function(scope, attributes) {
    var t = scope.repeatTodos[scope.repeatTodos_index];
    return t.label;
  };;
  app.methods['3']['getStyles'] = function(scope, attributes) {
    var t = scope.repeatTodos[scope.repeatTodos_index];
    var styles = {
      'backgroundColor': t.color
    };

    if (t.done === true) {
      styles.backgroundColor = '#444';
      styles.textDecoration = 'line-through';
    }

    return styles;
  };
  app.methods['3']['handleClick'] = function(scope, attributes) {
    var t = scope.repeatTodos[scope.repeatTodos_index];

    return function(e) {
      app.setState(function() {
        app.todo.update(t.id, {
          'done': !t.done
        });
      });
    }
  };;
  app.methods['3']['getKey'] = function(scope, attributes) {
    var t = scope.repeatTodos[scope.repeatTodos_index];
    return t.id;
  };
  app.methods['10'] = {};
  app.methods['10']['handleDelete'] = function(scope, attributes) {
    var t = scope.repeatTodos[scope.repeatTodos_index];

    return function(e) {
      e.stopPropagation();
      app.setState(function() {
        app.todo.remove(t.id);
      });
    }
  };;
  app.rootComponent = function(props) {
    if (typeof props !== "undefined") app.props = props;
    var scope = {};
    return (
      React.createElement('div', app.mergeAttributes('1', scope, {}, {
          "id": "todoContainer",
          "key": app.getKey('id', '1')
        }),
        React.createElement('div', app.mergeAttributes('7', scope, {}, {
            "id": "todoListContainer",
            "key": app.getKey('id', '7')
          }),
          React.createElement('h1', app.mergeAttributes('6', scope, {}, {
            "id": "label",
            "className": "float-left",
            "key": app.getKey('id', '6')
          }), "Todos"),
          React.createElement('a', app.mergeAttributes('9', scope, {
            "onClick": "handleClearCompleted"
          }, {
            "href": "#",
            "id": "clearCompleted",
            "key": app.getKey('id', '9')
          }), "Clear Completed"),
          React.createElement('input', app.mergeAttributes('4', scope, {
            "value": "getValue",
            "onChange": "handleChange",
            "onKeyDown": "handleKeyDown"
          }, {
            "id": "newTodo",
            "key": app.getKey('id', '4')
          })),
          React.createElement('div', app.mergeAttributes('8', scope, {}, {
              "id": "listRepeatContainer",
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
                    "id": "listItem",
                    "key": app.getKey('id', '3', i)
                  }), app.methods['3']['showTodo'](scope),
                  React.createElement('a', app.mergeAttributes('10', scope, {
                    "onClick": "handleDelete"
                  }, {
                    "id": "deleteButton",
                    "href": "#",
                    "key": app.getKey('id', '10')
                  }), "Delete")));
              }
              return out;
            })(scope)))));
  };
  app.setState = function(fn) {
    fn();
  };
  app.component = React.createClass({
    componentDidMount: function() {
      app.props = this.props;
    },
    componentWillReceiveProps: function(newProps) {
      app.props = newProps;
    },
    render: function() {
      return app.rootComponent(this.props);
    }
  });
  return app;
})();
if (typeof module !== "undefined") module.exports = todo;