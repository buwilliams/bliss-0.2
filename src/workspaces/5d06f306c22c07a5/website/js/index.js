var websiteV = (function() {
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
    app.rootProps = {};
    app.getRootProps = function(name) {
      return app.rootProps[name];
    };
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
            "id": "websiteV_1",
            "key": app.getKey('id', '1')
          }),
          React.createElement('div', app.mergeAttributes('6', scope, {}, {
              "id": "headerContainer_6",
              "key": app.getKey('id', '6')
            }),
            React.createElement('a', app.mergeAttributes('58', scope, {}, {
                "href": "/",
                "id": "blissLink_58",
                "key": app.getKey('id', '58')
              }),
              React.createElement('div', app.mergeAttributes('2', scope, {}, {
                  "id": "blissui_2",
                  "key": app.getKey('id', '2')
                }), 'BlissUI - ',
                React.createElement('small', app.mergeAttributes('13', scope, {}, {
                  "id": "removingBarriers_13",
                  "key": app.getKey('id', '13')
                }), 'removing barriers to your creativity'))),
            React.createElement('div', app.mergeAttributes('7', scope, {}, {
                "id": "menuContainer_7",
                "key": app.getKey('id', '7')
              }),
              React.createElement('a', app.mergeAttributes('10', scope, {}, {
                "href": "https://www.youtube.com/watch?v=j7bxCtu3SVo",
                "target": "_blank",
                "id": "introVideo_10",
                "key": app.getKey('id', '10')
              }), 'Intro Video'),
              React.createElement('a', app.mergeAttributes('9', scope, {}, {
                "href": "/hosted/5d06f306c22c07a5/bliss_docs/index.html",
                "id": "docs_9",
                "key": app.getKey('id', '9')
              }), 'Docs'),
              React.createElement('a', app.mergeAttributes('12', scope, {}, {
                "href": "/hosted/",
                "id": "browse_12",
                "key": app.getKey('id', '12')
              }), 'Browse'),
              React.createElement('a', app.mergeAttributes('11', scope, {}, {
                "href": "/bliss/",
                "id": "launch_11",
                "key": app.getKey('id', '11')
              }), 'Launch'))),
          React.createElement('div', app.mergeAttributes('14', scope, {}, {
              "id": "hero_14",
              "key": app.getKey('id', '14')
            }),
            React.createElement('h1', app.mergeAttributes('4', scope, {}, {
              "id": "header_4",
              "key": app.getKey('id', '4')
            }), 'Building web apps shouldn’t be a pain.'),
            React.createElement('h2', app.mergeAttributes('5', scope, {}, {
              "id": "subheader_5",
              "key": app.getKey('id', '5')
            }), 'So, why are we making apps the same old way?')),
          React.createElement('div', app.mergeAttributes('15', scope, {}, {
              "id": "threeBigProblems_15",
              "key": app.getKey('id', '15')
            }),
            React.createElement('div', app.mergeAttributes('16', scope, {}, {
                "className": "problem",
                "id": "visualContainer_16",
                "key": app.getKey('id', '16')
              }),
              React.createElement('h3', app.mergeAttributes('17', scope, {}, {
                "id": "visualDesign_17",
                "key": app.getKey('id', '17')
              }), 'Visual Design'),
              React.createElement('div', app.mergeAttributes('18', scope, {}, {
                "id": "visualDesignText_18",
                "key": app.getKey('id', '18')
              }), 'Current editors put code front and center. Does it make sense to be staring at text when your creation is visual? With Bliss, design is the focal point enabling you to see the experience you’re work.')),
            React.createElement('div', app.mergeAttributes('22', scope, {}, {
                "className": "problem",
                "id": "prototypeContainer_22",
                "key": app.getKey('id', '22')
              }),
              React.createElement('h3', app.mergeAttributes('23', scope, {}, {
                "id": "prototype_23",
                "key": app.getKey('id', '23')
              }), 'Prototype'),
              React.createElement('div', app.mergeAttributes('24', scope, {}, {
                "id": "prototypeText_24",
                "key": app.getKey('id', '24')
              }), 'The best way to test ideas isn’t static mockups. Bliss allows you to try your ideas on the fly, minimizing the amount of time spent coding.')),
            React.createElement('div', app.mergeAttributes('25', scope, {}, {
                "className": "problem",
                "id": "collaborateContainer_25",
                "key": app.getKey('id', '25')
              }),
              React.createElement('h3', app.mergeAttributes('26', scope, {}, {
                "id": "collaborate_26",
                "key": app.getKey('id', '26')
              }), 'Collaborate'),
              React.createElement('div', app.mergeAttributes('27', scope, {}, {
                "id": "collaborateText_27",
                "key": app.getKey('id', '27')
              }), 'Current collaboration processes assumes a developer will deploy code to a Dev or QA infrastructure which is already in place. When you use Bliss, all you need to do is click publish and share the URL.'))),
          React.createElement('div', app.mergeAttributes('28', scope, {}, {
              "id": "introducingBlissContainer_28",
              "key": app.getKey('id', '28')
            }),
            React.createElement('h2', app.mergeAttributes('29', scope, {}, {
              "id": "introducingBlissui_29",
              "key": app.getKey('id', '29')
            }), 'Introducing BlissUI'),
            React.createElement('h3', app.mergeAttributes('30', scope, {}, {
              "id": "revolutionize_30",
              "key": app.getKey('id', '30')
            }), 'A platform designed to revolutionize digital development.'),
            React.createElement('div', app.mergeAttributes('31', scope, {}, {
                "id": "featureContainer_31",
                "key": app.getKey('id', '31')
              }),
              React.createElement('div', app.mergeAttributes('33', scope, {}, {
                  "className": "feature",
                  "id": "organizedContainer_33",
                  "key": app.getKey('id', '33')
                }),
                React.createElement('h3', app.mergeAttributes('32', scope, {}, {
                  "id": "organized_32",
                  "key": app.getKey('id', '32')
                }), 'Organized'),
                React.createElement('div', app.mergeAttributes('34', scope, {}, {
                  "id": "organizedText_34",
                  "key": app.getKey('id', '34')
                }), 'Code shown at the right places. Everything is organized. No more opening JavaScript files, CSS files, and HTML templates. Bliss UI brings them together. ')),
              React.createElement('div', app.mergeAttributes('35', scope, {}, {
                  "className": "feature",
                  "id": "autoCompileContainer_35",
                  "key": app.getKey('id', '35')
                }),
                React.createElement('h3', app.mergeAttributes('36', scope, {}, {
                  "id": "autoCompile_36",
                  "key": app.getKey('id', '36')
                }), 'Auto-compile'),
                React.createElement('div', app.mergeAttributes('37', scope, {}, {
                  "id": "autoCompileText_37",
                  "key": app.getKey('id', '37')
                }), 'No build tools or configuration because who needs them? Make changes and watch them come to life.')),
              React.createElement('div', app.mergeAttributes('38', scope, {}, {
                  "className": "feature",
                  "id": "dataEditorContainer_38",
                  "key": app.getKey('id', '38')
                }),
                React.createElement('h3', app.mergeAttributes('39', scope, {}, {
                  "id": "dataEditor_39",
                  "key": app.getKey('id', '39')
                }), 'Data Editor'),
                React.createElement('div', app.mergeAttributes('40', scope, {}, {
                  "id": "dataEditorText_40",
                  "key": app.getKey('id', '40')
                }), 'BlissUI makes handling data a breeze. With our editor, you can manage it all from one place.')),
              React.createElement('div', app.mergeAttributes('41', scope, {}, {
                  "className": "feature",
                  "id": "layoutsPluginsContainer_41",
                  "key": app.getKey('id', '41')
                }),
                React.createElement('h3', app.mergeAttributes('42', scope, {}, {
                  "id": "layoutsAndComponents_42",
                  "key": app.getKey('id', '42')
                }), 'Layouts and Components'),
                React.createElement('div', app.mergeAttributes('43', scope, {}, {
                  "id": "layoutsPluginsText_43",
                  "key": app.getKey('id', '43')
                }), 'Create layout pages and use them in other places. Publish any page as a component to re-use in other pages.')),
              React.createElement('div', app.mergeAttributes('44', scope, {}, {
                  "className": "feature",
                  "id": "restfulIntegration_44",
                  "key": app.getKey('id', '44')
                }),
                React.createElement('h3', app.mergeAttributes('45', scope, {}, {
                  "id": "apiIntegration_45",
                  "key": app.getKey('id', '45')
                }), 'API  Integration'),
                React.createElement('div', app.mergeAttributes('46', scope, {}, {
                  "id": "apiIntegrationText_46",
                  "key": app.getKey('id', '46')
                }), 'Integrate with any API or backend over REST. Bliss compiles to a single-page app so it can talk with any web technology you already know.')),
              React.createElement('div', app.mergeAttributes('47', scope, {}, {
                  "className": "feature",
                  "id": "openSourceContainer_47",
                  "key": app.getKey('id', '47')
                }),
                React.createElement('h3', app.mergeAttributes('48', scope, {}, {
                  "id": "openSource_48",
                  "key": app.getKey('id', '48')
                }), 'Open Source'),
                React.createElement('div', app.mergeAttributes('49', scope, {}, {
                  "id": "openSourceText_49",
                  "key": app.getKey('id', '49')
                }), 'Have a library you want to use? No problem. Bliss UI supports node packages from npm.')),
              React.createElement('div', app.mergeAttributes('53', scope, {}, {
                  "className": "feature",
                  "id": "downloadContainer_53",
                  "key": app.getKey('id', '53')
                }),
                React.createElement('h3', app.mergeAttributes('54', scope, {}, {
                  "id": "download_54",
                  "key": app.getKey('id', '54')
                }), 'Download and Export'),
                React.createElement('div', app.mergeAttributes('55', scope, {}, {
                  "id": "downloadText_55",
                  "key": app.getKey('id', '55')
                }), 'Want to eject? With a single-click you can download your entire website. The static files are ready for your favorite host.')),
              React.createElement('div', app.mergeAttributes('50', scope, {}, {
                  "className": "feature",
                  "id": "hostingContainer_50",
                  "key": app.getKey('id', '50')
                }),
                React.createElement('h3', app.mergeAttributes('51', scope, {}, {
                  "id": "cloudHosting_51",
                  "key": app.getKey('id', '51')
                }), 'Cloud Hosting'),
                React.createElement('div', app.mergeAttributes('52', scope, {}, {
                  "id": "cloudHostingText_52",
                  "key": app.getKey('id', '52')
                }), 'Want to share your work with friends? Bliss UI will host your projects for free.')))),
          React.createElement('div', app.mergeAttributes('56', scope, {}, {
              "id": "useBlissContainer_56",
              "key": app.getKey('id', '56')
            }),
            React.createElement('h2', app.mergeAttributes('57', scope, {}, {
              "id": "useBliss_57",
              "key": app.getKey('id', '57')
            }), 'How will you use Bliss UI?'),
            React.createElement('a', app.mergeAttributes('59', scope, {}, {
              "href": "/bliss/",
              "id": "startNowLink_59",
              "key": app.getKey('id', '59')
            }), 'Start Creating Now'))));
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