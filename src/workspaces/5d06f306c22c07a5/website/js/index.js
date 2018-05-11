var index = (function() {
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
                    "className": "container-fluid",
                    "id": "index_82",
                    "key": app.getKey('id', '82')
                  }),
                  React.createElement('div', app.mergeAttributes('126', scope, {}, {
                      "id": "whatIsBliss_126",
                      "key": app.getKey('id', '126')
                    }),
                    React.createElement('h2', app.mergeAttributes('83', scope, {}, {
                      "id": "whatIsBlissui_83",
                      "key": app.getKey('id', '83')
                    }), 'What is BlissUI?'),
                    React.createElement('p', app.mergeAttributes('90', scope, {}, {
                        "id": "para_90",
                        "key": app.getKey('id', '90')
                      }),
                      React.createElement('span', app.mergeAttributes('116', scope, {}, {
                        "id": "span_116",
                        "key": app.getKey('id', '116')
                      }), 'Simply put, it’s an '),
                      React.createElement('span', app.mergeAttributes('118', scope, {}, {
                        "id": "span_118",
                        "key": app.getKey('id', '118')
                      }), 'AMS'),
                      React.createElement('span', app.mergeAttributes('117', scope, {}, {
                        "id": "span_117",
                        "key": app.getKey('id', '117')
                      }), ', think content management system but for apps. It\'s built to remove technical barriers so that you can focus on creating and delivering. It\'s in the cloud so all you need is a browser to publish apps (no IDEs, servers, source control, etc). Click the publish button and it\'s live.')),
                    React.createElement('p', app.mergeAttributes('119', scope, {}, {
                      "id": "para_119",
                      "key": app.getKey('id', '119')
                    }))),
                  React.createElement('div', app.mergeAttributes('127', scope, {}, {
                      "id": "theMission_127",
                      "key": app.getKey('id', '127')
                    }),
                    React.createElement('h2', app.mergeAttributes('122', scope, {}, {
                      "id": "mission_122",
                      "key": app.getKey('id', '122')
                    }), 'The mission'),
                    React.createElement('p', app.mergeAttributes('114', scope, {}, {
                      "id": "para_114",
                      "key": app.getKey('id', '114')
                    }), 'The mission is simple yet enormous, we want to remove all barriers that get in the way of inspiration. To touch that part of us  makes us uniquely human. This mission is our mojo.'),
                    React.createElement('div', app.mergeAttributes('110', scope, {}, {
                        "id": "chevronBottom_110",
                        "key": app.getKey('id', '110')
                      }),
                      React.createElement('i', app.mergeAttributes('109', scope, {}, {
                        "className": "fa fa-chevron-down",
                        "id": "chevronDownIcon_109",
                        "key": app.getKey('id', '109')
                      }))),
                    React.createElement('div', app.mergeAttributes('108', scope, {}, {
                        "className": "screenshot",
                        "id": "screenshot_108",
                        "key": app.getKey('id', '108')
                      }),
                      React.createElement('img', app.mergeAttributes('107', scope, {}, {
                        "src": "https://i.imgur.com/ood3FcY.png",
                        "width": "100%",
                        "id": "image_107",
                        "key": app.getKey('id', '107')
                      }))),
                    React.createElement('div', app.mergeAttributes('111', scope, {}, {
                        "id": "ellipses_111",
                        "key": app.getKey('id', '111')
                      }),
                      React.createElement('img', app.mergeAttributes('112', scope, {}, {
                        "src": "https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/svg/ellipses.svg",
                        "width": "50",
                        "alt": "separating content",
                        "id": "ellipsesImage_112",
                        "key": app.getKey('id', '112')
                      })))),
                  React.createElement('div', app.mergeAttributes('128', scope, {}, {
                      "id": "gettingStarted_128",
                      "key": app.getKey('id', '128')
                    }),
                    React.createElement('h2', app.mergeAttributes('88', scope, {}, {
                      "id": "gettingStarted_88",
                      "key": app.getKey('id', '88')
                    }), 'Getting Started'),
                    React.createElement('ol', app.mergeAttributes('95', scope, {}, {
                        "id": "ol_95",
                        "key": app.getKey('id', '95')
                      }),
                      React.createElement('li', app.mergeAttributes('121', scope, {}, {
                          "id": "li_121",
                          "key": app.getKey('id', '121')
                        }),
                        React.createElement('span', app.mergeAttributes('123', scope, {}, {
                          "id": "browseSpan_123",
                          "key": app.getKey('id', '123')
                        }), 'Browse '),
                        React.createElement('a', app.mergeAttributes('120', scope, {}, {
                          "href": "/hosted/",
                          "target": "_blank",
                          "id": "publishedAppsLink_120",
                          "key": app.getKey('id', '120')
                        }), 'published apps')),
                      React.createElement('li', app.mergeAttributes('96', scope, {}, {
                          "id": "li_96",
                          "key": app.getKey('id', '96')
                        }), 'Watch ',
                        React.createElement('a', app.mergeAttributes('97', scope, {}, {
                          "href": "https://www.youtube.com/watch?v=j7bxCtu3SVo",
                          "target": "_blank",
                          "id": "link_97",
                          "key": app.getKey('id', '97')
                        }), 'creating a Todo App')),
                      React.createElement('li', app.mergeAttributes('98', scope, {}, {
                          "id": "li_98",
                          "key": app.getKey('id', '98')
                        }),
                        React.createElement('span', app.mergeAttributes('124', scope, {}, {
                          "id": "span_124",
                          "key": app.getKey('id', '124')
                        }), 'Create your '),
                        React.createElement('a', app.mergeAttributes('99', scope, {}, {
                          "href": "https://blissui.com/bliss/",
                          "target": "_blank",
                          "id": "link_99",
                          "key": app.getKey('id', '99')
                        }), 'free account'),
                        React.createElement('span', app.mergeAttributes('125', scope, {}, {
                          "id": "spanCopy_125",
                          "key": app.getKey('id', '125')
                        }), ' to use it right away')),
                      React.createElement('li', app.mergeAttributes('100', scope, {}, {
                        "id": "li_100",
                        "key": app.getKey('id', '100')
                      }), 'Experiment!'),
                      React.createElement('li', app.mergeAttributes('101', scope, {}, {
                        "id": "li_101",
                        "key": app.getKey('id', '101')
                      }), 'Share what you make, we\'d love to see it'))),
                  React.createElement('div', app.mergeAttributes('129', scope, {}, {
                      "id": "theInspiration_129",
                      "key": app.getKey('id', '129')
                    }),
                    React.createElement('h2', app.mergeAttributes('84', scope, {}, {
                      "id": "theInspirationForBlissui_84",
                      "key": app.getKey('id', '84')
                    }), 'The inspiration for BlissUI'),
                    React.createElement('p', app.mergeAttributes('91', scope, {}, {
                      "id": "para_91",
                      "key": app.getKey('id', '91')
                    }), 'Years ago, we have visual tools for creating applications. Back then if you wanted a button in your program, you dragged it there. You could edit properties in a visual tool. Those tools were before web apps took hold. It feels that we’ve taken a step backwards really. Now everything is code, frameworks, burdensome processes, and more code. We want to bring back that visual experience and see just how freeing it could really be. Instead of a general purpose IDE, BlissUI gives you a full featured toolkit for building web apps.'),
                    React.createElement('p', app.mergeAttributes('94', scope, {}, {
                      "id": "para_94",
                      "key": app.getKey('id', '94')
                    }), 'BlissUI is so inspired it built itself. I know that’s confusing but let me say it a different way, we used BlissUI to create BlissUI. How inspired is that?!'),
                    React.createElement('p', app.mergeAttributes('115', scope, {}, {
                      "id": "para_115",
                      "key": app.getKey('id', '115')
                    }), 'I can almost hear you now… people have tried that. These solutions are always less than ideal. There’s always a greatly limiting architecture. Do not be afraid! BlissUI is an open system. It’s built with open-source and supports the community. We try hard not to lock you in. It’s is not a black box. It’s not even a box. It’s a spaceship. Aren’t you curious? A harmony of code and visual tooling is waiting for you. Are you ready to go exploring?')),
                  React.createElement('div', app.mergeAttributes('130', scope, {}, {
                      "id": "quickPrototypes_130",
                      "key": app.getKey('id', '130')
                    }),
                    React.createElement('h2', app.mergeAttributes('86', scope, {}, {
                      "id": "quickPrototypes_86",
                      "key": app.getKey('id', '86')
                    }), 'Quick Prototypes'),
                    React.createElement('p', app.mergeAttributes('113', scope, {}, {
                      "id": "para_113",
                      "key": app.getKey('id', '113')
                    }), 'Presently, BlissUI creates React.js apps and pairs nicely with Firebase. You don’t need to worry about those details. BlissUI takes standard technologies such as HTML, CSS, JavaScript, React, Data Management and puts them into a nice visual tool so that you can focus on exploring concepts, ideas, and beauty.'),
                    React.createElement('p', app.mergeAttributes('92', scope, {}, {
                      "id": "para_92",
                      "key": app.getKey('id', '92')
                    }), 'BlissUI helps you rapidly prototype and experiment with the ideas you have. You can realistically build and publish an app in a few short minutes. So it’s a great way to explore your ideas and it’s fun to experience.')),
                  React.createElement('div', app.mergeAttributes('131', scope, {}, {
                      "id": "currentState_131",
                      "key": app.getKey('id', '131')
                    }),
                    React.createElement('h2', app.mergeAttributes('87', scope, {}, {
                      "id": "currentStateOfBlissui_87",
                      "key": app.getKey('id', '87')
                    }), 'Current State of BlissUI'),
                    React.createElement('p', app.mergeAttributes('93', scope, {}, {
                      "id": "para_93",
                      "key": app.getKey('id', '93')
                    }), 'The first version of BlissUI is ready for experimental use. You can build apps with BlissUI right now. At this time, there’s no documentation so it’s pure play. If more folks become interested, there’s a lot we can do.')),
                  React.createElement('div', app.mergeAttributes('85', scope, {}, {
                      "id": "ideasForTheFuture_85",
                      "key": app.getKey('id', '85')
                    }),
                    React.createElement('h2', app.mergeAttributes('89', scope, {}, {
                      "id": "ideasForFutureDevelopment_89",
                      "key": app.getKey('id', '89')
                    }), 'Ideas for future development'),
                    React.createElement('ul', app.mergeAttributes('102', scope, {}, {
                        "id": "ul_102",
                        "key": app.getKey('id', '102')
                      }),
                      React.createElement('li', app.mergeAttributes('103', scope, {}, {
                        "id": "li_103",
                        "key": app.getKey('id', '103')
                      }), 'An Education version of BlissUI to help folks learn how to program'),
                      React.createElement('li', app.mergeAttributes('104', scope, {}, {
                        "id": "liCopy_104",
                        "key": app.getKey('id', '104')
                      }), 'Marketplace to share components'),
                      React.createElement('li', app.mergeAttributes('105', scope, {}, {
                        "id": "liCopyCopy_105",
                        "key": app.getKey('id', '105')
                      }), 'Publish apps to existing products'),
                      React.createElement('li', app.mergeAttributes('106', scope, {}, {
                        "id": "liCopyCopyCopy_106",
                        "key": app.getKey('id', '106')
                      }), 'Tight integration with cloud-based products such as Firebase'))))),
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