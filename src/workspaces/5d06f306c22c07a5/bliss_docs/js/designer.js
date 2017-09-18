var blissDocs = (function() {
  var createApp = function(component) {
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js['init'] = function() {
      app.js.initRouter();
      app.render();
    }
    app.js['initRouter'] = function(scope, attributes) {
      window.addEventListener("hashchange", function() {
        app.dispatch({
          path: '/routes',
          action: 'setCurrent',
          route: location.hash
        })
      }, false);
    }
    app.methods["47"] = {};
    app.methods["47"]['repeater'] = function(scope, attributes) {
      return app.state.routes.list;
    };
    app.methods["3"] = {};
    app.methods["3"]['getText'] = function(scope, attributes) {
      var item = scope.repeater[scope.repeater_index]
      return item.label
    };

    app.methods["3"]['getClass'] = function(scope, attributes) {
      var route = scope.repeater[scope.repeater_index].route
      var current = app.state.routes.current
      return (route === current) ? "active" : ""
    }
    app.methods["3"]['getHref'] = function(scope, attributes) {
      var route = scope.repeater[scope.repeater_index].route
      return route
    }
    app.methods["3"]['shouldShow'] = function(scope, attributes) {
      var is_nil = _.isNil(scope.repeater[scope.repeater_index].route)
      return !is_nil
    }
    app.methods["30"] = {};
    app.methods["30"]['shouldShow'] = function(scope, attributes) {
      return (app.state.routes.current === '#introducing_bliss');
    }
    app.methods["32"] = {};
    app.methods["32"]['shouldShow'] = function(scope, attributes) {
      return (app.state.routes.current !== '#introducing_bliss');
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
    app.schema['/routes'] = {};
    app.schema['/routes']['init'] = function(data, args) {
      var newData = {
        current: '#introducing_bliss',
        list: [{
            label: 'Introducing Bliss UI',
            route: '#introducing_bliss'
          },
          {
            label: 'Getting Started',
            route: '#getting_started'
          },
          {
            label: 'Hosting',
            route: '#hosting'
          },
          {
            label: 'Workspaces',
            route: '#workspaces'
          },
          {
            label: 'Projects',
            route: '#projects'
          },
          {
            label: 'Components',
            route: '#components'
          },
          {
            label: 'Elements',
            route: '#elements'
          },
          {
            label: 'CSS',
            route: '#css'
          },
          {
            label: 'CSS Variables',
            route: '#css_variables'
          },
          {
            label: 'JavaScript',
            route: '#javascript'
          },
          {
            label: 'Data Editor',
            route: '#data_editor'
          },
          {
            label: 'Assets',
            route: '#assets'
          },
          {
            label: 'Properties',
            route: '#properties'
          },
          {
            label: 'Global JavaScript',
            route: '#global_javascript'
          },
          {
            label: 'Global CSS',
            route: '#global_css'
          },
          {
            label: 'Node Modules',
            route: '#node_modules'
          },
          {
            label: 'Page Load',
            route: '#page_load'
          },
          {
            label: 'Settings',
            route: '#settings'
          },
          {
            label: 'Bliss JavaScript Reference',
            route: '#bliss_javascript_reference'
          }
        ]
      }
      if (location.hash !== '') newData.current = location.hash;
      return newData;
    }
    app.schema['/routes']['setCurrent'] = function(data, args) {
      var newData = Object.assign({}, data);
      newData.current = args.route;
      return newData;
    }
    if (app.schema['/routes']['init']) {
      app.assignPath(app.state, '/routes', app.schema['/routes']['init']());
    } else {
      app.assignPath(app.state, '/routes');
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
            "className": "container",
            "id": "blissDocs_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('div', app.mergeAttributes('40', scope, {}, {
              "className": "row",
              "id": "row_40",
              "key": app.getKey('id', '40')
            }),
            React.createElement('div', app.mergeAttributes('44', scope, {}, {
                "className": "col-md-12",
                "id": "column_44",
                "key": app.getKey('id', '44')
              }),
              React.createElement('h1', app.mergeAttributes('38', scope, {}, {
                "id": "header_38",
                "key": app.getKey('id', '38')
              }), 'Bliss UI Docs'))),
          React.createElement('div', app.mergeAttributes('41', scope, {}, {
              "className": "row",
              "id": "row_41",
              "key": app.getKey('id', '41')
            }),
            React.createElement('div', app.mergeAttributes('22', scope, {}, {
                "className": "col-md-3",
                "id": "leftColumn_22",
                "key": app.getKey('id', '22')
              }),
              React.createElement('div', app.mergeAttributes('2', scope, {}, {
                  "className": "menu",
                  "id": "menu_2",
                  "key": app.getKey('id', '2')
                }),
                (function(scope) {
                  var out = [];
                  var list = scope['repeater'] = app.methods['47']['repeater'](scope);
                  for (var i = 0; i < list.length; i++) {
                    scope['repeater_index'] = i;
                    out.push(React.createElement('div', app.mergeAttributes('47', scope, {}, {
                        "id": "linkContainer_47",
                        "key": app.getKey('id', '47', i)
                      }),
                      (function(scope) {
                        var out = [];
                        scope['shouldShow'] = app.methods['3']['shouldShow'](scope);
                        if (app.methods['3']['shouldShow'](scope) === true) {
                          out.push(React.createElement('a', app.mergeAttributes('3', scope, {
                            "className": "getClass",
                            "href": "getHref"
                          }, {
                            "id": "link_3",
                            "key": app.getKey('id', '3')
                          }), app.methods['3']['getText'](scope)));
                        }
                        return out;
                      })(scope)));
                  }
                  return out;
                })(scope))),
            React.createElement('div', app.mergeAttributes('23', scope, {}, {
                "className": "col-md-9",
                "id": "rightColumn_23",
                "key": app.getKey('id', '23')
              }),
              (function(scope) {
                var out = [];
                scope['shouldShow'] = app.methods['30']['shouldShow'](scope);
                if (app.methods['30']['shouldShow'](scope) === true) {
                  out.push(React.createElement('div', app.mergeAttributes('30', scope, {}, {
                      "id": "introducingBlissUiContent_30",
                      "key": app.getKey('id', '30')
                    }),
                    React.createElement('h2', app.mergeAttributes('24', scope, {}, {
                      "id": "header_24",
                      "key": app.getKey('id', '24')
                    }), 'Introducing Bliss UI'),
                    React.createElement('hr', app.mergeAttributes('45', scope, {}, {
                      "id": "line_45",
                      "key": app.getKey('id', '45')
                    })),
                    React.createElement('p', app.mergeAttributes('25', scope, {}, {
                      "id": "copy_25",
                      "key": app.getKey('id', '25')
                    }), 'Hello, I\'m Buddy, the creator of Bliss UI and it\'s my joy to share Bliss UI with you. Let me start by sharing the inspiration for this project, back in 2012, Bret Victor gave a talk entitled, "Inventing on Principal", in his talk he suggests that "creators need an immediate connection with their creations." He said that as you work you need see what you\'re making right then as if you were drawing on paper. On paper, you can see what you draw instantly. This is not true for the UI/UX in web apps.'),
                    React.createElement('p', app.mergeAttributes('26', scope, {}, {
                      "id": "copy_26",
                      "key": app.getKey('id', '26')
                    }), 'There exists today several problems with UI/UX development. First, there is a dividing wall between designers and developers. Today a designer creates a mockup and then pitches the design over the wall and it lands in a developer\'s lap. Once the developer takes that design to code, the designer is unable to make changes without going through the same process. Is this the only process that can work?'),
                    React.createElement('p', app.mergeAttributes('27', scope, {}, {
                      "id": "copy_27",
                      "key": app.getKey('id', '27')
                    }), 'Our next problem is developer tooling. Code, code, and more code. Have you ever wondered why the tools we use to make visual software are not in fact visual themselves? Why is creating a UI the same process as writing backend code? It just doesn\'t make any sense and it doesn\'t have to be so. I made Bliss UI to be visual from the start. There\'s still code and it\'s hidden and when it\'s not hidden it\'s well organized.'),
                    React.createElement('p', app.mergeAttributes('28', scope, {}, {
                      "id": "copy_28",
                      "key": app.getKey('id', '28')
                    }), 'Finally, there is so much boilerplate programming going on and so little collaboration between disciplines. Designers, developers, and product should be able to sit in the same room virtually or physically and create a stunning look and feel along with user flow for their product.'),
                    React.createElement('p', app.mergeAttributes('42', scope, {}, {
                      "id": "copy_42",
                      "key": app.getKey('id', '42')
                    }), 'Today, it simply takes too long. Too long to turn those ideas into wireframes, mockups, and code. I say no more. I say, let\'s go from concept to production in minutes. I say let\'s do it together in the same room at the same time.')));
                }
                return out;
              })(scope),
              (function(scope) {
                var out = [];
                scope['shouldShow'] = app.methods['32']['shouldShow'](scope);
                if (app.methods['32']['shouldShow'](scope) === true) {
                  out.push(React.createElement('div', app.mergeAttributes('32', scope, {}, {
                      "id": "comingSoonContent_32",
                      "key": app.getKey('id', '32')
                    }),
                    React.createElement('h2', app.mergeAttributes('33', scope, {}, {
                      "id": "header_33",
                      "key": app.getKey('id', '33')
                    }), 'Coming soon'),
                    React.createElement('hr', app.mergeAttributes('46', scope, {}, {
                      "id": "line_46",
                      "key": app.getKey('id', '46')
                    })),
                    React.createElement('p', app.mergeAttributes('29', scope, {}, {
                      "id": "copy_29",
                      "key": app.getKey('id', '29')
                    }), 'These docs are not quite finished, sad. I expect them completed by October 1st 2017, happy.')));
                }
                return out;
              })(scope)))));
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