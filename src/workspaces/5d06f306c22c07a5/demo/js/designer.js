var demoBlissui = (function() {
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
            "className": "container",
            "id": "demoBlissui_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('div', app.mergeAttributes('2', scope, {}, {
              "className": "row",
              "id": "rowTitle_2",
              "key": app.getKey('id', '2')
            }),
            React.createElement('div', app.mergeAttributes('11', scope, {}, {
                "className": "col-md-12",
                "id": "introContainer_11",
                "key": app.getKey('id', '11')
              }),
              React.createElement('h1', app.mergeAttributes('12', scope, {}, {
                  "id": "header_12",
                  "key": app.getKey('id', '12')
                }), 'BlissUI',
                React.createElement('small', app.mergeAttributes('13', scope, {}, {
                  "id": "subtitle_13",
                  "key": app.getKey('id', '13')
                }), ' User interfaces in the cloud.')))),
          React.createElement('div', app.mergeAttributes('4', scope, {}, {
              "className": "row",
              "id": "rowBenefits_4",
              "key": app.getKey('id', '4')
            }),
            React.createElement('div', app.mergeAttributes('3', scope, {}, {
                "className": "col-md-3",
                "id": "columnSpeed_3",
                "key": app.getKey('id', '3')
              }),
              React.createElement('div', app.mergeAttributes('15', scope, {}, {
                "id": "header_15",
                "key": app.getKey('id', '15')
              }), 'Speed'),
              React.createElement('ol', app.mergeAttributes('16', scope, {}, {
                  "id": "list_16",
                  "key": app.getKey('id', '16')
                }),
                React.createElement('li', app.mergeAttributes('17', scope, {}, {
                  "id": "devEnv_17",
                  "key": app.getKey('id', '17')
                }), 'No development environment setup'),
                React.createElement('li', app.mergeAttributes('38', scope, {}, {
                  "id": "reUsableComponents_38",
                  "key": app.getKey('id', '38')
                }), 'Make your own re-usable components'),
                React.createElement('li', app.mergeAttributes('19', scope, {}, {
                  "id": "marketplace_19",
                  "key": app.getKey('id', '19')
                }), 'Marketplace for reusable components and themes'),
                React.createElement('li', app.mergeAttributes('18', scope, {}, {
                  "id": "uiFramework_18",
                  "key": app.getKey('id', '18')
                }), 'Small learning curve'))),
            React.createElement('div', app.mergeAttributes('6', scope, {}, {
                "className": "col-md-3",
                "id": "columnSimplicity_6",
                "key": app.getKey('id', '6')
              }),
              React.createElement('div', app.mergeAttributes('20', scope, {}, {
                "id": "header_20",
                "key": app.getKey('id', '20')
              }), 'Simplicity'),
              React.createElement('ol', app.mergeAttributes('21', scope, {}, {
                  "id": "list_21",
                  "key": app.getKey('id', '21')
                }),
                React.createElement('li', app.mergeAttributes('22', scope, {}, {
                  "id": "cleanUi_22",
                  "key": app.getKey('id', '22')
                }), 'Clean UI where designers can be involved'),
                React.createElement('li', app.mergeAttributes('23', scope, {}, {
                  "id": "properties_23",
                  "key": app.getKey('id', '23')
                }), 'Elements have properties'),
                React.createElement('li', app.mergeAttributes('24', scope, {}, {
                  "id": "javascript_24",
                  "key": app.getKey('id', '24')
                }), 'Elements also have JavaScript'),
                React.createElement('li', app.mergeAttributes('25', scope, {}, {
                  "id": "simpleDataManagement_25",
                  "key": app.getKey('id', '25')
                }), 'Easy data management'),
                React.createElement('li', app.mergeAttributes('26', scope, {}, {
                  "id": "allYouNeedIsABrowser_26",
                  "key": app.getKey('id', '26')
                }), 'All you need is a browser'))),
            React.createElement('div', app.mergeAttributes('5', scope, {}, {
                "className": "col-md-3",
                "id": "columnPower_5",
                "key": app.getKey('id', '5')
              }),
              React.createElement('div', app.mergeAttributes('27', scope, {}, {
                "id": "header_27",
                "key": app.getKey('id', '27')
              }), 'Power'),
              React.createElement('ol', app.mergeAttributes('28', scope, {}, {
                  "id": "list_28",
                  "key": app.getKey('id', '28')
                }),
                React.createElement('li', app.mergeAttributes('30', scope, {}, {
                  "id": "realStateful_30",
                  "key": app.getKey('id', '30')
                }), 'Real stateful UIs'),
                React.createElement('li', app.mergeAttributes('29', scope, {}, {
                  "id": "moveElements_29",
                  "key": app.getKey('id', '29')
                }), 'Move elements anytime'),
                React.createElement('li', app.mergeAttributes('31', scope, {}, {
                  "id": "supportsNodeModules_31",
                  "key": app.getKey('id', '31')
                }), 'Supports node modules (open source)'),
                React.createElement('li', app.mergeAttributes('32', scope, {}, {
                  "id": "cssVariables_32",
                  "key": app.getKey('id', '32')
                }), 'CSS variables'),
                React.createElement('li', app.mergeAttributes('34', scope, {}, {
                  "id": "mobileReady_34",
                  "key": app.getKey('id', '34')
                }), 'Mobile ready'),
                React.createElement('li', app.mergeAttributes('33', scope, {}, {
                  "id": "bootstrapped_33",
                  "key": app.getKey('id', '33')
                }), 'Bootstrapped architecture'))),
            React.createElement('div', app.mergeAttributes('10', scope, {}, {
                "className": "col-md-3",
                "id": "column_10",
                "key": app.getKey('id', '10')
              }),
              React.createElement('div', app.mergeAttributes('35', scope, {}, {
                "id": "text_35",
                "key": app.getKey('id', '35')
              }), 'Column 5'))),
          React.createElement('div', app.mergeAttributes('9', scope, {}, {
              "className": "row",
              "id": "rowPlay_9",
              "key": app.getKey('id', '9')
            }),
            React.createElement('div', app.mergeAttributes('7', scope, {}, {
                "className": "col-md-9",
                "id": "column_7",
                "key": app.getKey('id', '7')
              }),
              React.createElement('div', app.mergeAttributes('36', scope, {}, {
                "id": "text_36",
                "key": app.getKey('id', '36')
              }), 'Column 4'))),
          React.createElement('div', app.mergeAttributes('14', scope, {}, {
              "className": "row",
              "id": "rowPlay_14",
              "key": app.getKey('id', '14')
            }),
            React.createElement('div', app.mergeAttributes('8', scope, {}, {
                "className": "col-md-6",
                "id": "column_8",
                "key": app.getKey('id', '8')
              }),
              React.createElement('div', app.mergeAttributes('37', scope, {}, {
                "id": "text_37",
                "key": app.getKey('id', '37')
              }), 'Column 6')))));
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