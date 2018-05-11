var home = (function() {
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
    app.methods["77"] = {};
    app.methods["77"]['handleClick'] = function(scope, attributes) {
      var currentValue = app.state.settings.showVideo
      return function(e) {
        app.dispatch({
          path: '/settings',
          action: 'set',
          key: 'showVideo',
          value: !currentValue
        })
      }
    };
    app.methods["79"] = {};
    app.methods["79"]['shouldShow'] = function(scope, attributes) {
      return app.state.settings.showVideo;
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
    app.schema['/settings'] = {};
    app.schema['/settings']['init'] = function(data, args) {
      var newData = {
        showVideo: false
      }
      return newData;
    }
    app.schema['/settings']['set'] = function(data, args) {
      var newData = Object.assign({}, data)
      newData[args.key] = args.value
      return newData;
    }
    if (app.schema['/settings']['init']) {
      app.assignPath(app.state, '/settings', app.schema['/settings']['init']());
    } else {
      app.assignPath(app.state, '/settings');
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
            "className": "container-fluid",
            "id": "blissUiWebsite_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('div', app.mergeAttributes('40', scope, {}, {
              "className": "row",
              "id": "headerRow_40",
              "key": app.getKey('id', '40')
            }),
            React.createElement('div', app.mergeAttributes('42', scope, {}, {
                "className": "col header-col",
                "id": "headerCol_42",
                "key": app.getKey('id', '42')
              }),
              React.createElement('h1', app.mergeAttributes('2', scope, {}, {
                  "className": "header",
                  "id": "header_2",
                  "key": app.getKey('id', '2')
                }), 'Bliss UI',
                React.createElement('small', app.mergeAttributes('8', scope, {}, {
                  "className": "small",
                  "id": "smallHeader_8",
                  "key": app.getKey('id', '8')
                }), 'Inspired App Platform')))),
          React.createElement('div', app.mergeAttributes('45', scope, {}, {
              "className": "row",
              "id": "contentRow_45",
              "key": app.getKey('id', '45')
            }),
            React.createElement('div', app.mergeAttributes('9', scope, {}, {
                "className": "col-md-8 offset-md-2 content",
                "id": "contentCol_9",
                "key": app.getKey('id', '9')
              }),
              React.createElement('div', app.mergeAttributes('75', scope, {}, {
                  "href": "#",
                  "id": "menuItemCopy_75",
                  "key": app.getKey('id', '75')
                }),
                React.createElement('a', app.mergeAttributes('77', scope, {
                  "onClick": "handleClick"
                }, {
                  "href": "#",
                  "id": "watchLink_77",
                  "key": app.getKey('id', '77')
                }), 'Watch'),
                React.createElement('a', app.mergeAttributes('73', scope, {}, {
                  "href": "/hosted/",
                  "target": "_blank",
                  "id": "browseLink_73",
                  "key": app.getKey('id', '73')
                }), 'Browse'),
                React.createElement('a', app.mergeAttributes('76', scope, {}, {
                  "href": "/bliss/",
                  "target": "_blank",
                  "id": "playLink_76",
                  "key": app.getKey('id', '76')
                }), 'Sign-in')),
              (function(scope) {
                var out = [];
                scope['shouldShow'] = app.methods['79']['shouldShow'](scope);
                if (app.methods['79']['shouldShow'](scope) === true) {
                  out.push(React.createElement('div', app.mergeAttributes('79', scope, {}, {
                      "id": "videoContainer_79",
                      "key": app.getKey('id', '79')
                    }),
                    React.createElement('iframe', app.mergeAttributes('78', scope, {}, {
                      "name": "",
                      "width": "560",
                      "height": "315",
                      "src": "https://www.youtube.com/embed/j7bxCtu3SVo?rel=0&controls=0&showinfo=0&autoplay=1",
                      "frameBorder": "0",
                      "allowFullScreen": "true",
                      "id": "todoVideo_78",
                      "key": app.getKey('id', '78')
                    }))));
                }
                return out;
              })(scope),
              React.createElement('div', app.mergeAttributes('80', scope, {}, {
                  "id": "layoutContainer_80",
                  "key": app.getKey('id', '80')
                }),
                React.createElement('div', app.mergeAttributes('82', scope, {}, {
                  "id": "home_82",
                  "key": app.getKey('id', '82')
                }), 'hey there chris')),
              React.createElement('p', app.mergeAttributes('22', scope, {}, {
                  "id": "para_22",
                  "key": app.getKey('id', '22')
                }),
                React.createElement('span', app.mergeAttributes('23', scope, {}, {
                  "id": "span_23",
                  "key": app.getKey('id', '23')
                }), 'Let\'s get connected!  '),
                React.createElement('a', app.mergeAttributes('24', scope, {}, {
                    "href": "mailto: buddy@blissui.com",
                    "id": "link_24",
                    "key": app.getKey('id', '24')
                  }),
                  React.createElement('i', app.mergeAttributes('56', scope, {}, {
                    "className": "fa fa-envelope",
                    "id": "emailIcon_56",
                    "key": app.getKey('id', '56')
                  })),
                  React.createElement('span', app.mergeAttributes('57', scope, {}, {
                    "id": "emailAddress_57",
                    "key": app.getKey('id', '57')
                  }), 'email')),
                React.createElement('span', app.mergeAttributes('25', scope, {}, {
                  "id": "span_25",
                  "key": app.getKey('id', '25')
                }), ' or '),
                React.createElement('a', app.mergeAttributes('26', scope, {}, {
                    "href": "https://twitter.com/buwilliams",
                    "target": "_blank",
                    "id": "link_26",
                    "key": app.getKey('id', '26')
                  }),
                  React.createElement('i', app.mergeAttributes('54', scope, {}, {
                    "className": "fa fa-twitter",
                    "id": "twitterIcon_54",
                    "key": app.getKey('id', '54')
                  })),
                  React.createElement('span', app.mergeAttributes('55', scope, {}, {
                    "id": "twitterHandle_55",
                    "key": app.getKey('id', '55')
                  }), 'twitter')))))));
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