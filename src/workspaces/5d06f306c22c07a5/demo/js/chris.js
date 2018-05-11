var chris = (function() {
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
            "id": "chris_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('nav', app.mergeAttributes('2', scope, {}, {
              "className": "navbar navbar-expand-lg navbar-light bg-light",
              "id": "nav_2",
              "key": app.getKey('id', '2')
            }),
            React.createElement('a', app.mergeAttributes('3', scope, {}, {
              "href": "#",
              "className": "navbar-brand",
              "id": "a_3",
              "key": app.getKey('id', '3')
            }), 'Navbar'),
            React.createElement('button', app.mergeAttributes('4', scope, {}, {
                "type": "button",
                "data-toggle": "collapse",
                "data-target": "#navbarSupportedContent",
                "aria-controls": "navbarSupportedContent",
                "aria-expanded": "false",
                "aria-label": "Toggle navigation",
                "className": "navbar-toggler",
                "id": "button_4",
                "key": app.getKey('id', '4')
              }),
              React.createElement('span', app.mergeAttributes('5', scope, {}, {
                "className": "navbar-toggler-icon",
                "id": "span_5",
                "key": app.getKey('id', '5')
              }))),
            React.createElement('div', app.mergeAttributes('6', scope, {}, {
                "id": "navbarSupportedContent",
                "className": "collapse navbar-collapse",
                "key": app.getKey('id', '6')
              }),
              React.createElement('ul', app.mergeAttributes('7', scope, {}, {
                  "className": "navbar-nav mr-auto",
                  "id": "ul_7",
                  "key": app.getKey('id', '7')
                }),
                React.createElement('li', app.mergeAttributes('8', scope, {}, {
                    "className": "nav-item active",
                    "id": "li_8",
                    "key": app.getKey('id', '8')
                  }),
                  React.createElement('a', app.mergeAttributes('9', scope, {}, {
                      "href": "#",
                      "className": "nav-link",
                      "id": "a_9",
                      "key": app.getKey('id', '9')
                    }), 'Home',
                    React.createElement('span', app.mergeAttributes('10', scope, {}, {
                      "className": "sr-only",
                      "id": "span_10",
                      "key": app.getKey('id', '10')
                    }), '(current)'))),
                React.createElement('li', app.mergeAttributes('11', scope, {}, {
                    "className": "nav-item",
                    "id": "li_11",
                    "key": app.getKey('id', '11')
                  }),
                  React.createElement('a', app.mergeAttributes('12', scope, {}, {
                    "href": "#",
                    "className": "nav-link",
                    "id": "a_12",
                    "key": app.getKey('id', '12')
                  }), 'Link')),
                React.createElement('li', app.mergeAttributes('13', scope, {}, {
                    "className": "nav-item dropdown",
                    "id": "li_13",
                    "key": app.getKey('id', '13')
                  }),
                  React.createElement('a', app.mergeAttributes('14', scope, {}, {
                    "href": "#",
                    "id": "navbarDropdown",
                    "role": "button",
                    "data-toggle": "dropdown",
                    "aria-haspopup": "true",
                    "aria-expanded": "false",
                    "className": "nav-link dropdown-toggle",
                    "key": app.getKey('id', '14')
                  }), 'Dropdown'),
                  React.createElement('div', app.mergeAttributes('15', scope, {}, {
                      "aria-labelledby": "navbarDropdown",
                      "className": "dropdown-menu",
                      "id": "div_15",
                      "key": app.getKey('id', '15')
                    }),
                    React.createElement('a', app.mergeAttributes('16', scope, {}, {
                      "href": "#",
                      "className": "dropdown-item",
                      "id": "a_16",
                      "key": app.getKey('id', '16')
                    }), 'Action'),
                    React.createElement('a', app.mergeAttributes('17', scope, {}, {
                      "href": "#",
                      "className": "dropdown-item",
                      "id": "a_17",
                      "key": app.getKey('id', '17')
                    }), 'Another action'),
                    React.createElement('div', app.mergeAttributes('18', scope, {}, {
                      "className": "dropdown-divider",
                      "id": "div_18",
                      "key": app.getKey('id', '18')
                    })),
                    React.createElement('a', app.mergeAttributes('19', scope, {}, {
                      "href": "#",
                      "className": "dropdown-item",
                      "id": "a_19",
                      "key": app.getKey('id', '19')
                    }), 'Something else here'))),
                React.createElement('li', app.mergeAttributes('20', scope, {}, {
                    "className": "nav-item",
                    "id": "li_20",
                    "key": app.getKey('id', '20')
                  }),
                  React.createElement('a', app.mergeAttributes('21', scope, {}, {
                    "href": "#",
                    "className": "nav-link disabled",
                    "id": "a_21",
                    "key": app.getKey('id', '21')
                  }), 'Disabled'))),
              React.createElement('form', app.mergeAttributes('22', scope, {}, {
                  "className": "form-inline my-2 my-lg-0",
                  "id": "form_22",
                  "key": app.getKey('id', '22')
                }),
                React.createElement('input', app.mergeAttributes('23', scope, {}, {
                  "type": "search",
                  "placeholder": "Search",
                  "aria-label": "Search",
                  "className": "form-control mr-sm-2",
                  "id": "input_23",
                  "key": app.getKey('id', '23')
                })),
                React.createElement('button', app.mergeAttributes('24', scope, {}, {
                  "type": "submit",
                  "className": "btn btn-outline-success my-2 my-sm-0",
                  "id": "button_24",
                  "key": app.getKey('id', '24')
                }), 'Search'))))));
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