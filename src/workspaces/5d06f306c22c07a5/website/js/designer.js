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
          React.createElement('div', app.mergeAttributes('7', scope, {}, {
              "id": "container_7",
              "key": app.getKey('id', '7')
            }),
            React.createElement('h1', app.mergeAttributes('4', scope, {}, {
              "id": "header_4",
              "key": app.getKey('id', '4')
            }), 'Bliss UI'),
            React.createElement('hr', app.mergeAttributes('5', scope, {}, {
              "id": "seperator_5",
              "key": app.getKey('id', '5')
            })),
            React.createElement('span', app.mergeAttributes('6', scope, {}, {
              "id": "comingSoon_6",
              "key": app.getKey('id', '6')
            }), 'Private beta is only a few weeks away, around mid-August. I\'m finishing up private workspaces. Once that\'s complete, I\'ll be in touch. Thanks for your patience folks! - Buddy'),
            React.createElement('h3', app.mergeAttributes('9', scope, {}, {
              "id": "todoAppHeader_9",
              "key": app.getKey('id', '9')
            }), 'How to build a TODO app with Bliss:'),
            React.createElement('iframe', app.mergeAttributes('8', scope, {}, {
              "width": "560",
              "height": "315",
              "frameborder": "0",
              "allowfullscreen": "true",
              "src": "https://www.youtube.com/embed/Ka9OJSGVpvo",
              "id": "youtubeVideo_8",
              "key": app.getKey('id', '8')
            })),
            React.createElement('h3', app.mergeAttributes('10', scope, {}, {
              "id": "blissOverview_10",
              "key": app.getKey('id', '10')
            }), 'What is Bliss? Here\'s an introduction:'),
            React.createElement('iframe', app.mergeAttributes('11', scope, {}, {
              "width": "560",
              "height": "315",
              "frameborder": "0",
              "allowfullscreen": "true",
              "src": "https://www.youtube.com/embed/YRtg_aVpdqA",
              "id": "youtubeVideo_11",
              "key": app.getKey('id', '11')
            })))));
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