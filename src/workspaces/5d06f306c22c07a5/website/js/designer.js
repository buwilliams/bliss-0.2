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

      window.addEventListener("hashchange", function(event) {
        app.dispatch({
          path: '/nav',
          action: 'setCurrentPage',
          value: location.hash
        })
      });
    }
    app.methods["30"] = {};
    app.methods["30"]['shouldShow'] = function(scope, attributes) {
      return (app.state.nav.currentPage === "#home");
    }
    app.methods["59"] = {};
    app.methods["59"]['shouldShow'] = function(scope, attributes) {
      return (app.state.nav.currentPage === "#contact");
    }
    app.methods["68"] = {};
    app.methods["68"]['shouldShow'] = function(scope, attributes) {
      return (app.state.nav.currentPage === "#30daytrial");
    }
    app.methods["70"] = {};
    app.methods["70"]['shouldShow'] = function(scope, attributes) {
      return (app.state.nav.currentPage === "#thestory");
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
    app.schema['/nav'] = {};
    app.schema['/nav']['init'] = function(data, args) {
      var newData = {
        currentPage: '#home'
      }

      if (location.hash !== '') {
        newData.currentPage = location.hash
      }

      return newData;
    }
    app.schema['/nav']['setCurrentPage'] = function(data, args) {
      var newData = Object.assign({}, data)
      var newCurrentPage = args.value

      if (newCurrentPage === "") {
        newCurrentPage = "#home"
      }

      newData.currentPage = newCurrentPage

      return newData;
    }
    if (app.schema['/nav']['init']) {
      app.assignPath(app.state, '/nav', app.schema['/nav']['init']());
    } else {
      app.assignPath(app.state, '/nav');
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
          React.createElement('div', app.mergeAttributes('14', scope, {}, {
              "className": "header clearfix",
              "id": "header_14",
              "key": app.getKey('id', '14')
            }),
            React.createElement('a', app.mergeAttributes('22', scope, {}, {
                "href": "#home",
                "className": "menu-brand pull-left",
                "id": "brand_22",
                "key": app.getKey('id', '22')
              }), 'Bliss UI',
              React.createElement('small', app.mergeAttributes('29', scope, {}, {
                "className": "brand-small",
                "id": "subbrand_29",
                "key": app.getKey('id', '29')
              }), 'create apps visually')),
            React.createElement('div', app.mergeAttributes('17', scope, {}, {
                "className": "float-right home-menu",
                "id": "nav_17",
                "key": app.getKey('id', '17')
              }),
              React.createElement('a', app.mergeAttributes('54', scope, {}, {
                "href": "#home",
                "id": "home_54",
                "key": app.getKey('id', '54')
              }), 'Home'),
              React.createElement('a', app.mergeAttributes('19', scope, {}, {
                "href": "#30daytrial",
                "id": "tryForDays_19",
                "key": app.getKey('id', '19')
              }), 'Try for 30-days'),
              React.createElement('a', app.mergeAttributes('28', scope, {}, {
                "href": "/hosted/5d06f306c22c07a5/bliss_docs/",
                "target": "_blank",
                "id": "docs_28",
                "key": app.getKey('id', '28')
              }), 'Docs'),
              React.createElement('a', app.mergeAttributes('55', scope, {}, {
                "href": "#thestory",
                "id": "theStory_55",
                "key": app.getKey('id', '55')
              }), 'The Story'),
              React.createElement('a', app.mergeAttributes('73', scope, {}, {
                "href": "https://www.youtube.com/watch?v=Ka9OJSGVpvo",
                "target": "_blank",
                "id": "video_73",
                "key": app.getKey('id', '73')
              }), 'Sample Video'),
              React.createElement('a', app.mergeAttributes('20', scope, {}, {
                "href": "#contact",
                "id": "contact_20",
                "key": app.getKey('id', '20')
              }), 'Contact'))),
          (function(scope) {
            var out = [];
            scope['shouldShow'] = app.methods['30']['shouldShow'](scope);
            if (app.methods['30']['shouldShow'](scope) === true) {
              out.push(React.createElement('div', app.mergeAttributes('30', scope, {}, {
                  "className": "",
                  "id": "homePage_30",
                  "key": app.getKey('id', '30')
                }),
                React.createElement('div', app.mergeAttributes('31', scope, {}, {
                    "className": "hero col-md-12",
                    "id": "heroText_31",
                    "key": app.getKey('id', '31')
                  }), 'Create Beautiful UI/UX in mintues.',
                  React.createElement('i', app.mergeAttributes('53', scope, {}, {
                    "className": "fa fa-picture-o",
                    "id": "new_53",
                    "key": app.getKey('id', '53')
                  }))),
                React.createElement('div', app.mergeAttributes('46', scope, {}, {
                    "className": "row justify-content-around",
                    "id": "marketingCopy_46",
                    "key": app.getKey('id', '46')
                  }),
                  React.createElement('div', app.mergeAttributes('38', scope, {}, {
                      "className": "col-md-5",
                      "id": "column_38",
                      "key": app.getKey('id', '38')
                    }),
                    React.createElement('h3', app.mergeAttributes('39', scope, {}, {
                        "id": "aNewModel_39",
                        "key": app.getKey('id', '39')
                      }),
                      React.createElement('i', app.mergeAttributes('49', scope, {}, {
                        "className": "fa fa-bullhorn",
                        "id": "new_49",
                        "key": app.getKey('id', '49')
                      })),
                      React.createElement('span', app.mergeAttributes('50', scope, {}, {
                        "id": "new_50",
                        "key": app.getKey('id', '50')
                      }), ' A New Model')),
                    React.createElement('p', app.mergeAttributes('32', scope, {}, {
                      "id": "copy_32",
                      "key": app.getKey('id', '32')
                    }), 'We are changing the way you think about creating interfaces. In today\'s model, designers create wireframes and mockups until the product team is happy. Next, developers to turn those beautiful designs into code, lots and lots of code.'),
                    React.createElement('p', app.mergeAttributes('40', scope, {}, {
                      "id": "copy_40",
                      "key": app.getKey('id', '40')
                    }), 'What if there\'s another way? What if a product manager, designer, and developer could sit in the same room and collaborate in a true agile fashion?'),
                    React.createElement('p', app.mergeAttributes('41', scope, {}, {
                      "id": "copy_41",
                      "key": app.getKey('id', '41')
                    }), 'Introducing, Bliss UI, that better way.')),
                  React.createElement('div', app.mergeAttributes('37', scope, {}, {
                      "className": "col-md-5",
                      "id": "column_37",
                      "key": app.getKey('id', '37')
                    }),
                    React.createElement('h3', app.mergeAttributes('36', scope, {}, {
                        "id": "requiresABetterTool_36",
                        "key": app.getKey('id', '36')
                      }),
                      React.createElement('i', app.mergeAttributes('47', scope, {}, {
                        "className": "fa fa-cogs",
                        "id": "new_47",
                        "key": app.getKey('id', '47')
                      })),
                      React.createElement('span', app.mergeAttributes('48', scope, {}, {
                        "id": "new_48",
                        "key": app.getKey('id', '48')
                      }), ' Requires a Better Tool')),
                    React.createElement('p', app.mergeAttributes('35', scope, {}, {
                      "id": "copy_35",
                      "key": app.getKey('id', '35')
                    }), 'Changing how you work requires new tooling. Bliss UI provides that tooling by distributing the control eventually across your team. Now designers can design. Programers can program. Product folks can argue who is right. All on the same platform.'),
                    React.createElement('p', app.mergeAttributes('42', scope, {}, {
                      "id": "copy_42",
                      "key": app.getKey('id', '42')
                    }), 'No creating prototypes that get thrown away. No more creating static mockups. No more boilerplate code.'),
                    React.createElement('p', app.mergeAttributes('43', scope, {}, {
                      "id": "copy_43",
                      "key": app.getKey('id', '43')
                    }), 'Yes to pushing a single button to make it real. Yes to designers making changes after code has been written. Yes to fast. Yes to Bliss UI.'))),
                React.createElement('div', app.mergeAttributes('74', scope, {}, {
                    "className": "hero col-md-12",
                    "id": "heroTextCopy_74",
                    "key": app.getKey('id', '74')
                  }), 'Latest News',
                  React.createElement('i', app.mergeAttributes('75', scope, {}, {
                    "className": "fa fa-newspaper-o",
                    "id": "newCopy_75",
                    "key": app.getKey('id', '75')
                  }))),
                React.createElement('div', app.mergeAttributes('76', scope, {}, {
                    "className": "row justify-content-around",
                    "id": "marketingCopyCopy_76",
                    "key": app.getKey('id', '76')
                  }),
                  React.createElement('div', app.mergeAttributes('77', scope, {}, {
                      "className": "col-md-5",
                      "id": "columnCopy_77",
                      "key": app.getKey('id', '77')
                    }),
                    React.createElement('h5', app.mergeAttributes('78', scope, {}, {
                      "id": "aNewModelCopy_78",
                      "key": app.getKey('id', '78')
                    }), 'Thursday - 9.14.2017'),
                    React.createElement('p', app.mergeAttributes('79', scope, {}, {
                      "id": "_79",
                      "key": app.getKey('id', '79')
                    }), 'Well, well, well. We are finally ready for the public release of Bliss UI. How exciting! If you\'ve reached out you\'ll receive an email with your invitation. In the meantime, take a look at our new website and if you have any questions shoot us an email at bliss@blissui.com')))));
            }
            return out;
          })(scope),
          (function(scope) {
            var out = [];
            scope['shouldShow'] = app.methods['59']['shouldShow'](scope);
            if (app.methods['59']['shouldShow'](scope) === true) {
              out.push(React.createElement('div', app.mergeAttributes('59', scope, {}, {
                  "id": "contactPage_59",
                  "key": app.getKey('id', '59')
                }),
                React.createElement('div', app.mergeAttributes('60', scope, {}, {
                    "className": "hero col-md-12",
                    "id": "heroTextCopy_60",
                    "key": app.getKey('id', '60')
                  }), 'Need help? Want to say hello? We\'re here.',
                  React.createElement('i', app.mergeAttributes('61', scope, {}, {
                    "className": "fa fa-microphone",
                    "id": "newCopy_61",
                    "key": app.getKey('id', '61')
                  }))),
                React.createElement('div', app.mergeAttributes('62', scope, {}, {
                    "className": "row justify-content-around",
                    "id": "marketingCopyCopy_62",
                    "key": app.getKey('id', '62')
                  }),
                  React.createElement('div', app.mergeAttributes('63', scope, {}, {
                      "className": "col-md-6",
                      "id": "column_63",
                      "key": app.getKey('id', '63')
                    }),
                    React.createElement('a', app.mergeAttributes('64', scope, {}, {
                        "href": "mailto:bliss@blissui.com",
                        "id": "emailLink_64",
                        "key": app.getKey('id', '64')
                      }),
                      React.createElement('i', app.mergeAttributes('66', scope, {}, {
                        "className": "fa fa-envelope-o",
                        "id": "new_66",
                        "key": app.getKey('id', '66')
                      })),
                      React.createElement('span', app.mergeAttributes('67', scope, {}, {
                        "id": "new_67",
                        "key": app.getKey('id', '67')
                      }), ' bliss@blissui.com')),
                    React.createElement('div', app.mergeAttributes('65', scope, {}, {
                      "id": "emailCopy_65",
                      "key": app.getKey('id', '65')
                    }), 'Getting in touch with us for any reason is easy. Just shoot us an email at bliss@blissui.com. We read. We care. We will respond directly, no canned answers.')))));
            }
            return out;
          })(scope),
          (function(scope) {
            var out = [];
            scope['shouldShow'] = app.methods['68']['shouldShow'](scope);
            if (app.methods['68']['shouldShow'](scope) === true) {
              out.push(React.createElement('div', app.mergeAttributes('68', scope, {}, {
                  "id": "tryPage_68",
                  "key": app.getKey('id', '68')
                }),
                React.createElement('div', app.mergeAttributes('69', scope, {}, {
                  "id": "comingSoon_69",
                  "key": app.getKey('id', '69')
                }), 'You\'ve reached the "Try for 30-days" page. I\'m not quite ready yet. #patience')));
            }
            return out;
          })(scope),
          (function(scope) {
            var out = [];
            scope['shouldShow'] = app.methods['70']['shouldShow'](scope);
            if (app.methods['70']['shouldShow'](scope) === true) {
              out.push(React.createElement('div', app.mergeAttributes('70', scope, {}, {
                  "id": "theStoryPage_70",
                  "key": app.getKey('id', '70')
                }),
                React.createElement('div', app.mergeAttributes('72', scope, {}, {
                  "id": "comingSoon_72",
                  "key": app.getKey('id', '72')
                }), 'You\'ve reached "The Story" page. I\'m not quite ready yet. #patience')));
            }
            return out;
          })(scope),
          React.createElement('div', app.mergeAttributes('16', scope, {}, {
              "className": "footer",
              "id": "footer_16",
              "key": app.getKey('id', '16')
            }),
            React.createElement('i', app.mergeAttributes('51', scope, {}, {
              "className": "fa fa-copyright",
              "id": "new_51",
              "key": app.getKey('id', '51')
            })),
            React.createElement('span', app.mergeAttributes('52', scope, {}, {
              "id": "new_52",
              "key": app.getKey('id', '52')
            }), ' 2017 Bliss UI - Buddy Lee Technology LLC'))));
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