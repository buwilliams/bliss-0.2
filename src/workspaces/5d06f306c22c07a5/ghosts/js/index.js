var manyGhosts = (function() {
  var createApp = function(component) {
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js['init'] = function() {
      app.setState(function() {
        app.state.numberOfGhosts = 50;
        app.state.ghosts = app.js.makeGhosts(50);
      });
    }
    app.js['makeGhosts'] = function(numberOfGhosts) {
      var colors = ['#2ca5ff',
        '#2594e7',
        '#1f7cc1',
        '#58b7ff',
        '#80c8ff',
        '#a3d8ff',
        '#bee3ff',
        '#d6edff',
        '#e7f5ff',
        '#f2faff'
      ];

      var newArrayOfColors = [];
      for (var i = 0; i < numberOfGhosts; i++) {
        newArrayOfColors.push(colors[i % 10]);
      }

      return newArrayOfColors;
    }
    app.methods["2"] = {};
    app.methods["2"]['getBackgroundColor'] = function(scope, attributes) {
      return scope.repeater[scope.repeater_index];
    }
    app.methods["2"]['repeater'] = function(scope, attributes) {
      return app.state.ghosts;
    };
    app.methods["6"] = {};
    app.methods["6"]['getValue'] = function(scope, attributes) {
      return app.state.numberOfGhosts;
    }
    app.methods["6"]['handleChange'] = function(scope, attributes) {
      return function(e) {
        var numberOfGhosts = parseInt(e.target.value) || 0;
        app.setState(function() {
          app.state.numberOfGhosts = numberOfGhosts;
          app.state.ghosts = app.js.makeGhosts(numberOfGhosts);
        });
      }
    };
    app.rootProps = {};
    app.getRootProps = function(name) {
      return app.rootProps[name];
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
            "id": "manyGhosts_1",
            "key": app.getKey('id', '1')
          }),
          (function(scope) {
            var out = [];
            var list = scope['repeater'] = app.methods['2']['repeater'](scope);
            for (var i = 0; i < list.length; i++) {
              scope['repeater_index'] = i;
              out.push(React.createElement(ghost.component, app.mergeAttributes('2', scope, {
                "backgroundColor": "getBackgroundColor"
              }, {
                "id": "ghost_2",
                "key": app.getKey('id', '2', i)
              })));
            }
            return out;
          })(scope),
          React.createElement('div', app.mergeAttributes('5', scope, {}, {
              "id": "numberOfGhostsContainer_5",
              "key": app.getKey('id', '5')
            }),
            React.createElement('h3', app.mergeAttributes('7', scope, {}, {
              "id": "header_7",
              "key": app.getKey('id', '7')
            }), 'Number of Ghosts'),
            React.createElement('input', app.mergeAttributes('6', scope, {
              "value": "getValue",
              "onChange": "handleChange"
            }, {
              "placeholder": "number of ghosts",
              "id": "numberOfGhosts_6",
              "key": app.getKey('id', '6')
            })),
            React.createElement('p', app.mergeAttributes('8', scope, {}, {
              "id": "info_8",
              "key": app.getKey('id', '8')
            }), 'Example of BlissUI components. Each individual component moves at a random time with a random color. Showing how each component manages state effectively.'))));
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