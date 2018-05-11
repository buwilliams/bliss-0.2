var layout = (function() {
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
            "id": "layout_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('nav', app.mergeAttributes('3', scope, {}, {
              "className": "navbar nav-down navbar-expand-lg navbar-transparent",
              "id": "nav_3",
              "key": app.getKey('id', '3')
            }),
            React.createElement('div', app.mergeAttributes('26', scope, {}, {
                "className": "container",
                "id": "container_26",
                "key": app.getKey('id', '26')
              }),
              React.createElement('a', app.mergeAttributes('4', scope, {}, {
                "href": "#",
                "className": "navbar-brand",
                "id": "a_4",
                "key": app.getKey('id', '4')
              }), 'Bliss UI'),
              React.createElement('button', app.mergeAttributes('5', scope, {}, {
                  "type": "button",
                  "data-toggle": "collapse",
                  "data-target": "#navbarSupportedContent",
                  "aria-controls": "navbarSupportedContent",
                  "aria-expanded": "false",
                  "aria-label": "Toggle navigation",
                  "className": "navbar-toggler",
                  "id": "button_5",
                  "key": app.getKey('id', '5')
                }),
                React.createElement('i', app.mergeAttributes('27', scope, {}, {
                  "className": "fas fa-bars",
                  "id": "barsIcon_27",
                  "key": app.getKey('id', '27')
                }))),
              React.createElement('div', app.mergeAttributes('7', scope, {}, {
                  "id": "navbarSupportedContent",
                  "className": "collapse navbar-collapse",
                  "key": app.getKey('id', '7')
                }),
                React.createElement('ul', app.mergeAttributes('8', scope, {}, {
                    "className": "navbar-nav",
                    "id": "ul_8",
                    "key": app.getKey('id', '8')
                  }),
                  React.createElement('li', app.mergeAttributes('12', scope, {}, {
                      "className": "nav-item",
                      "id": "li_12",
                      "key": app.getKey('id', '12')
                    }),
                    React.createElement('a', app.mergeAttributes('13', scope, {}, {
                      "href": "#",
                      "className": "nav-link",
                      "id": "a_13",
                      "key": app.getKey('id', '13')
                    }), 'Browse')),
                  React.createElement('li', app.mergeAttributes('9', scope, {}, {
                      "className": "nav-item active",
                      "id": "li_9",
                      "key": app.getKey('id', '9')
                    }),
                    React.createElement('a', app.mergeAttributes('10', scope, {}, {
                        "href": "#",
                        "className": "nav-link",
                        "id": "a_10",
                        "key": app.getKey('id', '10')
                      }), 'Docs',
                      React.createElement('span', app.mergeAttributes('11', scope, {}, {
                        "className": "sr-only",
                        "id": "span_11",
                        "key": app.getKey('id', '11')
                      }), '(current)'))),
                  React.createElement('li', app.mergeAttributes('28', scope, {}, {
                      "className": "nav-item active",
                      "id": "li_28",
                      "key": app.getKey('id', '28')
                    }),
                    React.createElement('a', app.mergeAttributes('29', scope, {}, {
                        "href": "#",
                        "className": "nav-link",
                        "id": "a_29",
                        "key": app.getKey('id', '29')
                      }), 'Sign in',
                      React.createElement('span', app.mergeAttributes('30', scope, {}, {
                        "className": "sr-only",
                        "id": "span_30",
                        "key": app.getKey('id', '30')
                      }), '(current)'))))))),
          React.createElement('div', app.mergeAttributes('32', scope, {}, {
              "id": "content_32",
              "key": app.getKey('id', '32')
            }),
            React.createElement('div', app.mergeAttributes('33', scope, {}, {
              "className": "container-fluid",
              "id": "hero_33",
              "key": app.getKey('id', '33')
            }))),
          React.createElement('div', app.mergeAttributes('31', scope, {}, {
            "id": "footer_31",
            "key": app.getKey('id', '31')
          }))));
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