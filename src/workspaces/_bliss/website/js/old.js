var blissUiWebsite = (function() {
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
            "id": "blissUiWebsite_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('h1', app.mergeAttributes('2', scope, {}, {
              "className": "header",
              "id": "header_2",
              "key": app.getKey('id', '2')
            }), 'Bliss UI',
            React.createElement('small', app.mergeAttributes('8', scope, {}, {
              "className": "small",
              "id": "new_8",
              "key": app.getKey('id', '8')
            }), 'App Creation Toolkit')),
          React.createElement('div', app.mergeAttributes('9', scope, {}, {
              "className": "content",
              "id": "content_9",
              "key": app.getKey('id', '9')
            }),
            React.createElement('h2', app.mergeAttributes('4', scope, {}, {
              "id": "whatIsBlissui_4",
              "key": app.getKey('id', '4')
            }), 'What is BlissUI?'),
            React.createElement('p', app.mergeAttributes('15', scope, {}, {
              "id": "para_15",
              "key": app.getKey('id', '15')
            }), 'Simply put, it’s a webapp creation toolkit. It presently builds React.js applications and pairs nicely with Firebase. But these are just the technical details. What’s interesting is that you don’t need to worry much about that. BlissUI takes standard technologies such as HTML, CSS, JavaScript, React, Data Management and puts them into a nice visual tool so that you can focus on creating and experimenting. That’s the kind of environment I want to work in.'),
            React.createElement('h2', app.mergeAttributes('6', scope, {}, {
              "id": "theInspirationForBlissui_6",
              "key": app.getKey('id', '6')
            }), 'The inspiration for BlissUI'),
            React.createElement('p', app.mergeAttributes('16', scope, {}, {
              "id": "para_16",
              "key": app.getKey('id', '16')
            }), 'Years ago, we have nice visual tools for creating applications. I remember back when if you wanted a button in your program, you dragged it there. You could edit the properties of it in some visual tool. Those tools were before web apps surfaced. It feels that we’ve taken a step backwards really. Now everything is code, code, and more code. I wanted to bring back that visual experience and see just how nice it could really be. A harmony of code and visual tooling.'),
            React.createElement('p', app.mergeAttributes('21', scope, {}, {
              "id": "para_21",
              "key": app.getKey('id', '21')
            }), 'Instead of a general purpose IDE, BlissUI gives you a full featured toolkit for building web apps.'),
            React.createElement('h2', app.mergeAttributes('10', scope, {}, {
              "id": "theNiche_10",
              "key": app.getKey('id', '10')
            }), 'The niche'),
            React.createElement('p', app.mergeAttributes('17', scope, {}, {
              "id": "para_17",
              "key": app.getKey('id', '17')
            }), 'BlissUI helps you rapidly prototype and experiment with the ideas you have. You can realistically build and publish an app in a few short minutes. So it’s a great way to explore your ideas. Through my research I haven’t been able to find anything quite like it. It’s actually a lot of fun to use.'),
            React.createElement('h2', app.mergeAttributes('11', scope, {}, {
              "id": "currentStateOfBlissui_11",
              "key": app.getKey('id', '11')
            }), 'Current State of BlissUI'),
            React.createElement('p', app.mergeAttributes('18', scope, {}, {
              "id": "para_18",
              "key": app.getKey('id', '18')
            }), 'The first version of BlissUI is ready for experimental use. You can build apps with BlissUI right now. At this time, there’s no documentation so it’s pure play. If more folks become interested, there’s a lot we can do.'),
            React.createElement('p', app.mergeAttributes('22', scope, {}, {
                "id": "para_22",
                "key": app.getKey('id', '22')
              }),
              React.createElement('span', app.mergeAttributes('23', scope, {}, {
                "id": "span_23",
                "key": app.getKey('id', '23')
              }), 'Feel free to reach out for help - '),
              React.createElement('a', app.mergeAttributes('24', scope, {}, {
                "href": "mailto: bliss@blissui.com",
                "id": "link_24",
                "key": app.getKey('id', '24')
              }), 'bliss@blissui.com'),
              React.createElement('span', app.mergeAttributes('25', scope, {}, {
                "id": "span_25",
                "key": app.getKey('id', '25')
              }), ' or '),
              React.createElement('a', app.mergeAttributes('26', scope, {}, {
                "href": "bliss@blissui.com",
                "target": "_blank",
                "id": "link_26",
                "key": app.getKey('id', '26')
              }), '@buwilliams')),
            React.createElement('h2', app.mergeAttributes('13', scope, {}, {
              "id": "gettingStarted_13",
              "key": app.getKey('id', '13')
            }), 'Getting Started'),
            React.createElement('ol', app.mergeAttributes('27', scope, {}, {
                "id": "ol_27",
                "key": app.getKey('id', '27')
              }),
              React.createElement('li', app.mergeAttributes('28', scope, {}, {
                  "id": "li_28",
                  "key": app.getKey('id', '28')
                }), 'Watch the video for  ',
                React.createElement('a', app.mergeAttributes('29', scope, {}, {
                  "href": "https://www.youtube.com/watch?v=Ka9OJSGVpvo",
                  "target": "_blank",
                  "id": "link_29",
                  "key": app.getKey('id', '29')
                }), 'creating a Todo App')),
              React.createElement('li', app.mergeAttributes('30', scope, {}, {
                  "id": "li_30",
                  "key": app.getKey('id', '30')
                }), 'Create your ',
                React.createElement('a', app.mergeAttributes('31', scope, {}, {
                  "href": "https://blissui.com/bliss/",
                  "target": "_blank",
                  "id": "link_31",
                  "key": app.getKey('id', '31')
                }), 'free account')),
              React.createElement('li', app.mergeAttributes('32', scope, {}, {
                "id": "li_32",
                "key": app.getKey('id', '32')
              }), 'Build something fun'),
              React.createElement('li', app.mergeAttributes('33', scope, {}, {
                "id": "li_33",
                "key": app.getKey('id', '33')
              }), 'Publish to share with friends')),
            React.createElement('h2', app.mergeAttributes('14', scope, {}, {
              "id": "ideasForFutureDevelopment_14",
              "key": app.getKey('id', '14')
            }), 'Ideas for future development'),
            React.createElement('ul', app.mergeAttributes('34', scope, {}, {
                "id": "ul_34",
                "key": app.getKey('id', '34')
              }),
              React.createElement('li', app.mergeAttributes('35', scope, {}, {
                "id": "li_35",
                "key": app.getKey('id', '35')
              }), 'An Education version of BlissUI to help folks learn how to program'),
              React.createElement('li', app.mergeAttributes('36', scope, {}, {
                "id": "liCopy_36",
                "key": app.getKey('id', '36')
              }), 'Marketplace to share components'),
              React.createElement('li', app.mergeAttributes('37', scope, {}, {
                "id": "liCopyCopy_37",
                "key": app.getKey('id', '37')
              }), 'Publish apps to existing products'),
              React.createElement('li', app.mergeAttributes('38', scope, {}, {
                "id": "liCopyCopyCopy_38",
                "key": app.getKey('id', '38')
              }), 'Tight integration with cloud-based products such as Firebase'))),
          React.createElement('div', app.mergeAttributes('39', scope, {}, {
            "id": "div_39",
            "key": app.getKey('id', '39')
          }), 'foo'),
          React.createElement('div', app.mergeAttributes('40', scope, {}, {
            "id": "div_40",
            "key": app.getKey('id', '40')
          }), 'fob')));
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