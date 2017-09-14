var blissDocs = (function() {
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
    app.methods["38"] = {};
    app.methods["38"]['handleClick'] = function(scope, attributes) {
      return function(e) {
        alert('hello there')
      }
    };
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
    app.schema['/demo'] = {};
    app.schema['/demo']['init'] = function(data, args) {
      var newData = {
        'list': ['One', 'Two']
      }
      return newData;
    }
    if (app.schema['/demo']['init']) {
      app.assignPath(app.state, '/demo', app.schema['/demo']['init']());
    } else {
      app.assignPath(app.state, '/demo');
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
            "className": "ui grid container",
            "id": "blissDocs_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('div', app.mergeAttributes('40', scope, {}, {
              "className": "ui row",
              "id": "row_40",
              "key": app.getKey('id', '40')
            }),
            React.createElement('h1', app.mergeAttributes('38', scope, {
              "onClick": "handleClick"
            }, {
              "className": "sixteen wide column",
              "id": "header_38",
              "key": app.getKey('id', '38')
            }), 'Bliss UI Docs')),
          React.createElement('div', app.mergeAttributes('41', scope, {}, {
              "className": "ui row",
              "id": "row_41",
              "key": app.getKey('id', '41')
            }),
            React.createElement('div', app.mergeAttributes('22', scope, {}, {
                "className": "four wide column",
                "id": "leftColumn_22",
                "key": app.getKey('id', '22')
              }),
              React.createElement('div', app.mergeAttributes('2', scope, {}, {
                  "className": "ui secondary vertical pointing menu",
                  "id": "menu_2",
                  "key": app.getKey('id', '2')
                }),
                React.createElement('a', app.mergeAttributes('3', scope, {}, {
                  "href": "#introducing",
                  "className": "item active",
                  "id": "introducingBlissUi_3",
                  "key": app.getKey('id', '3')
                }), 'Introducing Bliss UI'),
                React.createElement('a', app.mergeAttributes('36', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "gettingStarted_36",
                  "key": app.getKey('id', '36')
                }), 'Getting Started'),
                React.createElement('a', app.mergeAttributes('7', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "hosting_7",
                  "key": app.getKey('id', '7')
                }), 'Hosting'),
                React.createElement('a', app.mergeAttributes('4', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "workspaces_4",
                  "key": app.getKey('id', '4')
                }), 'Workspaces'),
                React.createElement('a', app.mergeAttributes('5', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "projects_5",
                  "key": app.getKey('id', '5')
                }), 'Projects'),
                React.createElement('a', app.mergeAttributes('6', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "components_6",
                  "key": app.getKey('id', '6')
                }), 'Components'),
                React.createElement('a', app.mergeAttributes('8', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "elements_8",
                  "key": app.getKey('id', '8')
                }), 'Elements'),
                React.createElement('a', app.mergeAttributes('10', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "css_10",
                  "key": app.getKey('id', '10')
                }), 'CSS'),
                React.createElement('a', app.mergeAttributes('17', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "cssVariables_17",
                  "key": app.getKey('id', '17')
                }), 'CSS  Variables'),
                React.createElement('a', app.mergeAttributes('11', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "javascript_11",
                  "key": app.getKey('id', '11')
                }), 'JavaScript'),
                React.createElement('a', app.mergeAttributes('20', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "dataEditor_20",
                  "key": app.getKey('id', '20')
                }), 'Data Editor'),
                React.createElement('a', app.mergeAttributes('12', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "assets_12",
                  "key": app.getKey('id', '12')
                }), 'Assets'),
                React.createElement('a', app.mergeAttributes('13', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "properties_13",
                  "key": app.getKey('id', '13')
                }), 'Properties'),
                React.createElement('a', app.mergeAttributes('18', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "globalJavascript_18",
                  "key": app.getKey('id', '18')
                }), 'Global JavaScript'),
                React.createElement('a', app.mergeAttributes('19', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "globalCss_19",
                  "key": app.getKey('id', '19')
                }), 'Global JavaScript'),
                React.createElement('a', app.mergeAttributes('14', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "nodeModules_14",
                  "key": app.getKey('id', '14')
                }), 'Node Modules'),
                React.createElement('a', app.mergeAttributes('15', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "pageLoad_15",
                  "key": app.getKey('id', '15')
                }), 'Page Load'),
                React.createElement('a', app.mergeAttributes('16', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "settings_16",
                  "key": app.getKey('id', '16')
                }), 'Settings'),
                React.createElement('a', app.mergeAttributes('21', scope, {}, {
                  "href": "#comingsoon",
                  "className": "item",
                  "id": "blissJavascriptReference_21",
                  "key": app.getKey('id', '21')
                }), 'Bliss JavaScript Reference'))),
            React.createElement('div', app.mergeAttributes('23', scope, {}, {
                "className": "twelve wide column",
                "id": "rightColumn_23",
                "key": app.getKey('id', '23')
              }),
              React.createElement('div', app.mergeAttributes('30', scope, {}, {
                  "id": "introducingBlissUiContent_30",
                  "key": app.getKey('id', '30')
                }),
                React.createElement('a', app.mergeAttributes('31', scope, {}, {
                  "name": "introducing",
                  "id": "link_31",
                  "key": app.getKey('id', '31')
                })),
                React.createElement('h2', app.mergeAttributes('24', scope, {}, {
                  "className": "ui header dividing",
                  "id": "header_24",
                  "key": app.getKey('id', '24')
                }), 'Introducing Bliss UI'),
                React.createElement('p', app.mergeAttributes('25', scope, {}, {
                  "id": "copy_25",
                  "key": app.getKey('id', '25')
                }), 'Hello. My name is Buddy, I\'m the creator of Bliss UI and I\'m very proud to share this labor of love with you. Let me start by sharing the inspiration for Bliss UI, in 2012, Bret Victor gave a talk entitled, "Inventing on Principal", in his talk he suggests that "creators need an immediate connection with their creations." He said that as you work you need see what you\'re making right then as if you were drawing on paper. On paper, you can see what you draw instantly. This is not true for the UI/UX in web apps.'),
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
                }), 'Today, it simply takes too long. Too long to turn those ideas into wireframes, mockups, and code. I say no more. I say, let\'s go from concept to production in minutes. I say let\'s do it together in the same room at the same time.')),
              React.createElement('div', app.mergeAttributes('32', scope, {}, {
                  "id": "comingSoonContent_32",
                  "key": app.getKey('id', '32')
                }),
                React.createElement('a', app.mergeAttributes('34', scope, {}, {
                  "name": "comingsoon",
                  "id": "link_34",
                  "key": app.getKey('id', '34')
                })),
                React.createElement('h2', app.mergeAttributes('33', scope, {}, {
                  "className": "ui header dividing",
                  "id": "header_33",
                  "key": app.getKey('id', '33')
                }), 'Coming soon'),
                React.createElement('p', app.mergeAttributes('29', scope, {}, {
                  "id": "copy_29",
                  "key": app.getKey('id', '29')
                }), 'These docs are not finished yet. I expect to be finished with them by the end of September 2017.'))))));
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