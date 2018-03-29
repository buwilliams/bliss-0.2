var manyBubbles = (function() {
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
    app.methods["3"] = {};
    app.methods["3"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        app.dispatch({
          path: '/bubbles',
          action: 'setHowMany',
          howMany: parseInt(e.target.value) || 0
        })
      }
    };

    app.methods["3"]['getValue'] = function(scope, attributes) {
      return app.state.bubbles.howMany;
    };
    app.methods["4"] = {};
    app.methods["4"]['loop'] = function(scope, attributes) {
      return app.state.bubbles.bubbles;
    };

    app.methods["4"]['getStyle'] = function(scope, attributes) {
      var bubble = scope.loop[scope.loop_index];
      var randomColor = '#' + (function lol(m, s, c) {
        return s[m.floor(m.random() * s.length)] +
          (c && lol(m, s, c - 1));
      })(Math, '0123456789ABCDEF', 4);
      return {
        'position': 'absolute',
        'top': bubble.top + 'px',
        'left': bubble.left + 'px',
        'backgroundColor': randomColor
      };
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
    app.schema['/bubbles'] = {};
    app.schema['/bubbles']['init'] = function(data, args) {
      var newData = {
        howMany: 0,
        bubbles: []
      };
      return newData;
    }
    app.schema['/bubbles']['setHowMany'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData.howMany = args.howMany;
      newData.bubbles = [];
      var w = window.innerWidth;
      var h = window.innerHeight;
      for (var i = 0; i < newData.howMany; i++) {
        newData.bubbles.push({
          top: Math.floor(Math.random() * Math.floor(h)),
          left: Math.floor(Math.random() * Math.floor(w))
        });
      }
      return newData;
    }
    if (app.schema['/bubbles']['init']) {
      app.assignPath(app.state, '/bubbles', app.schema['/bubbles']['init']());
    } else {
      app.assignPath(app.state, '/bubbles');
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
            "id": "manyBubbles_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('input', app.mergeAttributes('3', scope, {
            "onChange": "handleChange",
            "value": "getValue"
          }, {
            "placeholder": "# of bubbles",
            "id": "numberOfBubbles_3",
            "key": app.getKey('id', '3')
          })),
          (function(scope) {
            var out = [];
            var list = scope['loop'] = app.methods['4']['loop'](scope);
            for (var i = 0; i < list.length; i++) {
              scope['loop_index'] = i;
              out.push(React.createElement('div', app.mergeAttributes('4', scope, {
                "style": "getStyle"
              }, {
                "id": "bubble_4",
                "key": app.getKey('id', '4', i)
              }), 'bubble'));
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