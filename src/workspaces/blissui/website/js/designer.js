var blissUiWebsite = (function() {
  var createApp = function(component) {
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js.init = function() {
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
          React.createElement('div', app.mergeAttributes('7', scope, {}, {
              "id": "container_7",
              "key": app.getKey('id', '7')
            }),
            React.createElement('h1', app.mergeAttributes('4', scope, {}, {
                "id": "header_4",
                "key": app.getKey('id', '4')
              }), "Bliss UI",
              React.createElement('small', app.mergeAttributes('20', scope, {}, {
                "id": "subheader_20",
                "key": app.getKey('id', '20')
              }), "Create UIs in the cloud")),
            React.createElement('hr', app.mergeAttributes('5', scope, {}, {
              "id": "seperator_5",
              "key": app.getKey('id', '5')
            })),
            React.createElement('div', app.mergeAttributes('25', scope, {}, {
                "id": "videoContainer_25",
                "key": app.getKey('id', '25')
              }),
              React.createElement('iframe', app.mergeAttributes('24', scope, {}, {
                "src": "https://www.youtube.com/embed/YRtg_aVpdqA",
                "frameborder": "0",
                "width": "560",
                "height": "315",
                "allowfullscreen": "true",
                "id": "youtubeVideo_24",
                "key": app.getKey('id', '24')
              }))),
            React.createElement('span', app.mergeAttributes('6', scope, {}, {
              "id": "brief_6",
              "key": app.getKey('id', '6')
            }), "You are the heart of Bliss UI. The private beta is expected to start on August 1st, 2017! I'll be in touch with you around that time. Looking forward to building a great future together."),
            React.createElement('div', app.mergeAttributes('8', scope, {}, {
              "id": "featuresHeader_8",
              "key": app.getKey('id', '8')
            }), "Private Beta Features"),
            React.createElement('ul', app.mergeAttributes('9', scope, {}, {
                "id": "featureList_9",
                "key": app.getKey('id', '9')
              }),
              React.createElement('li', app.mergeAttributes('10', scope, {}, {
                "id": "feature_10",
                "key": app.getKey('id', '10')
              }), "Your own playground to build whatever you want"),
              React.createElement('li', app.mergeAttributes('12', scope, {}, {
                "id": "feature_12",
                "key": app.getKey('id', '12')
              }), "Free application hosting"),
              React.createElement('li', app.mergeAttributes('11', scope, {}, {
                "id": "feature_11",
                "key": app.getKey('id', '11')
              }), "Request any feature and be taken seriously"),
              React.createElement('li', app.mergeAttributes('14', scope, {}, {
                "id": "feature_14",
                "key": app.getKey('id', '14')
              }), "Shape what building apps looks like in the future"),
              React.createElement('li', app.mergeAttributes('13', scope, {}, {
                "id": "feature_13",
                "key": app.getKey('id', '13')
              }), "You help decide what Bliss UI becomes")),
            React.createElement('div', app.mergeAttributes('16', scope, {}, {
              "id": "plannedFeaturesHeader_16",
              "key": app.getKey('id', '16')
            }), "What's in the development backlog?"),
            React.createElement('ul', app.mergeAttributes('15', scope, {}, {
                "id": "backlogList_15",
                "key": app.getKey('id', '15')
              }),
              React.createElement('li', app.mergeAttributes('18', scope, {}, {
                "id": "backlog_18",
                "key": app.getKey('id', '18')
              }), "Data/state management. The goal here is to make the 'hard part' of apps easy."),
              React.createElement('li', app.mergeAttributes('22', scope, {}, {
                "id": "backlog_22",
                "key": app.getKey('id', '22')
              }), "Authentication and authorization."),
              React.createElement('li', app.mergeAttributes('21', scope, {}, {
                "id": "backlog_21",
                "key": app.getKey('id', '21')
              }), "Subscriptions. Allow users to sign-up to use the product."),
              React.createElement('li', app.mergeAttributes('19', scope, {}, {
                "id": "backlog_19",
                "key": app.getKey('id', '19')
              }), "Marketplace. Make components and sell them on the marketplace."),
              React.createElement('li', app.mergeAttributes('17', scope, {}, {
                "id": "backlog_17",
                "key": app.getKey('id', '17')
              }), "Firebase Support. The goal is to make Bliss the leading choice in building Firebase apps.")),
            React.createElement('div', app.mergeAttributes('23', scope, {}, {
              "id": "privateBetaSignUp_23",
              "key": app.getKey('id', '23')
            }), "Want to participate? Send an email to buddy [at] blissui [dot] com."))));
    };
    app.state = {};
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