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
                }), 'Inspired Web App Toolkit')))),
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
              React.createElement('h2', app.mergeAttributes('4', scope, {}, {
                "id": "whatIsBlissui_4",
                "key": app.getKey('id', '4')
              }), 'What is BlissUI?'),
              React.createElement('p', app.mergeAttributes('15', scope, {}, {
                  "id": "para_15",
                  "key": app.getKey('id', '15')
                }),
                React.createElement('span', app.mergeAttributes('62', scope, {}, {
                  "id": "span_62",
                  "key": app.getKey('id', '62')
                }), 'Simply put, it’s a '),
                React.createElement('span', app.mergeAttributes('64', scope, {}, {
                  "id": "span_64",
                  "key": app.getKey('id', '64')
                }), 'web app toolkit'),
                React.createElement('span', app.mergeAttributes('63', scope, {}, {
                  "id": "span_63",
                  "key": app.getKey('id', '63')
                }), ' built to remove technical barriers so that you can focus on designing and creating. It\'s is in the cloud so all you need is a browser to publish apps (no IDEs, servers, source control, etc). Click the publish button and it\'s live.')),
              React.createElement('p', app.mergeAttributes('65', scope, {}, {
                "id": "para_65",
                "key": app.getKey('id', '65')
              })),
              React.createElement('h2', app.mergeAttributes('69', scope, {}, {
                "id": "mission_69",
                "key": app.getKey('id', '69')
              }), 'The mission'),
              React.createElement('p', app.mergeAttributes('60', scope, {}, {
                "id": "para_60",
                "key": app.getKey('id', '60')
              }), 'The mission is simple yet enormous, we want to remove all barriers that get in the way of inspiration. To bring back that thing that makes us uniquely human. But hey, maybe we’re crazy.'),
              React.createElement('div', app.mergeAttributes('51', scope, {}, {
                  "id": "chevronBottom_51",
                  "key": app.getKey('id', '51')
                }),
                React.createElement('i', app.mergeAttributes('50', scope, {}, {
                  "className": "fa fa-chevron-down",
                  "id": "chevronDownIcon_50",
                  "key": app.getKey('id', '50')
                }))),
              React.createElement('div', app.mergeAttributes('47', scope, {}, {
                  "className": "screenshot",
                  "id": "screenshot_47",
                  "key": app.getKey('id', '47')
                }),
                React.createElement('img', app.mergeAttributes('46', scope, {}, {
                  "src": "https://i.imgur.com/ood3FcY.png",
                  "width": "100%",
                  "id": "image_46",
                  "key": app.getKey('id', '46')
                }))),
              React.createElement('div', app.mergeAttributes('52', scope, {}, {
                  "id": "ellipses_52",
                  "key": app.getKey('id', '52')
                }),
                React.createElement('img', app.mergeAttributes('53', scope, {}, {
                  "src": "https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/svg/ellipses.svg",
                  "width": "50",
                  "alt": "separating content",
                  "id": "ellipsesImage_53",
                  "key": app.getKey('id', '53')
                }))),
              React.createElement('h2', app.mergeAttributes('13', scope, {}, {
                "id": "gettingStarted_13",
                "key": app.getKey('id', '13')
              }), 'Getting Started'),
              React.createElement('ol', app.mergeAttributes('27', scope, {}, {
                  "id": "ol_27",
                  "key": app.getKey('id', '27')
                }),
                React.createElement('li', app.mergeAttributes('67', scope, {}, {
                    "id": "li_67",
                    "key": app.getKey('id', '67')
                  }),
                  React.createElement('span', app.mergeAttributes('70', scope, {}, {
                    "id": "browseSpan_70",
                    "key": app.getKey('id', '70')
                  }), 'Browse '),
                  React.createElement('a', app.mergeAttributes('66', scope, {}, {
                    "href": "/hosted/",
                    "target": "_blank",
                    "id": "publishedAppsLink_66",
                    "key": app.getKey('id', '66')
                  }), 'published apps')),
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
                  }),
                  React.createElement('span', app.mergeAttributes('71', scope, {}, {
                    "id": "span_71",
                    "key": app.getKey('id', '71')
                  }), 'Create your '),
                  React.createElement('a', app.mergeAttributes('31', scope, {}, {
                    "href": "https://blissui.com/bliss/",
                    "target": "_blank",
                    "id": "link_31",
                    "key": app.getKey('id', '31')
                  }), 'free account'),
                  React.createElement('span', app.mergeAttributes('72', scope, {}, {
                    "id": "spanCopy_72",
                    "key": app.getKey('id', '72')
                  }), ' to use it right away')),
                React.createElement('li', app.mergeAttributes('32', scope, {}, {
                  "id": "li_32",
                  "key": app.getKey('id', '32')
                }), 'Experiment!'),
                React.createElement('li', app.mergeAttributes('33', scope, {}, {
                  "id": "li_33",
                  "key": app.getKey('id', '33')
                }), 'Share what you make, we\'d love to see it')),
              React.createElement('h2', app.mergeAttributes('6', scope, {}, {
                "id": "theInspirationForBlissui_6",
                "key": app.getKey('id', '6')
              }), 'The inspiration for BlissUI'),
              React.createElement('p', app.mergeAttributes('16', scope, {}, {
                "id": "para_16",
                "key": app.getKey('id', '16')
              }), 'Years ago, we have visual tools for creating applications. Back then if you wanted a button in your program, you dragged it there. You could edit properties in a visual tool. Those tools were before web apps took hold. It feels that we’ve taken a step backwards really. Now everything is code, frameworks, burdensome processes, and more code. We want to bring back that visual experience and see just how freeing it could really be. Instead of a general purpose IDE, BlissUI gives you a full featured toolkit for building web apps.'),
              React.createElement('p', app.mergeAttributes('21', scope, {}, {
                "id": "para_21",
                "key": app.getKey('id', '21')
              }), 'BlissUI is so inspired it built itself. I know that’s confusing but let me say it a different way, we used BlissUI to create BlissUI. How inspired is that?!'),
              React.createElement('p', app.mergeAttributes('61', scope, {}, {
                "id": "para_61",
                "key": app.getKey('id', '61')
              }), 'I can almost hear you now… people have tried that. These solutions are always less than ideal. There’s always a greatly limiting architecture. Do not be afraid! BlissUI is an open system. It’s built with open-source and supports the community. We try hard not to lock you in. It’s is not a black box. It’s not even a box. It’s a spaceship. Aren’t you curious? A harmony of code and visual tooling is waiting for you. Are you ready to go exploring?'),
              React.createElement('h2', app.mergeAttributes('10', scope, {}, {
                "id": "quickPrototypes_10",
                "key": app.getKey('id', '10')
              }), 'Quick Prototypes'),
              React.createElement('p', app.mergeAttributes('59', scope, {}, {
                "id": "para_59",
                "key": app.getKey('id', '59')
              }), 'Presently, BlissUI creates React.js apps and pairs nicely with Firebase. You don’t need to worry about those details. BlissUI takes standard technologies such as HTML, CSS, JavaScript, React, Data Management and puts them into a nice visual tool so that you can focus on exploring concepts, ideas, and beauty.'),
              React.createElement('p', app.mergeAttributes('17', scope, {}, {
                "id": "para_17",
                "key": app.getKey('id', '17')
              }), 'BlissUI helps you rapidly prototype and experiment with the ideas you have. You can realistically build and publish an app in a few short minutes. So it’s a great way to explore your ideas and it’s fun to experience.'),
              React.createElement('h2', app.mergeAttributes('11', scope, {}, {
                "id": "currentStateOfBlissui_11",
                "key": app.getKey('id', '11')
              }), 'Current State of BlissUI'),
              React.createElement('p', app.mergeAttributes('18', scope, {}, {
                "id": "para_18",
                "key": app.getKey('id', '18')
              }), 'The first version of BlissUI is ready for experimental use. You can build apps with BlissUI right now. At this time, there’s no documentation so it’s pure play. If more folks become interested, there’s a lot we can do.'),
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
                }), 'Tight integration with cloud-based products such as Firebase')),
              React.createElement('p', app.mergeAttributes('22', scope, {}, {
                  "id": "para_22",
                  "key": app.getKey('id', '22')
                }),
                React.createElement('span', app.mergeAttributes('23', scope, {}, {
                  "id": "span_23",
                  "key": app.getKey('id', '23')
                }), 'Let\'s get connected!  '),
                React.createElement('a', app.mergeAttributes('24', scope, {}, {
                    "href": "mailto: bliss@blissui.com",
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