var screencast = (function() {
  var createApp = function(component) {
    if (typeof component === 'undefined') return {};
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js.init = function() {
      app.render();
    }
    app.methods["4"] = {};
    app.methods["4"].loop = function() {
      // made an ajax request to get data
      return [0, 1, 2, 3, 4];
    };
    app.methods["5"] = {};
    app.methods["5"].shouldShow = function() {
      return false;
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
            "id": "screencast_1",
            "key": app.getKey('id', '1')
          }),
          (function(scope) {
            var out = [];
            var list = scope['loop'] = app.methods['4']['loop'](scope);
            for (var i = 0; i < list.length; i++) {
              scope['loop_index'] = i;
              out.push(React.createElement('div', app.mergeAttributes('4', scope, {}, {
                  "id": "container_4",
                  "key": app.getKey('id', '4', i)
                }),
                React.createElement('div', app.mergeAttributes('2', scope, {}, {
                  "id": "message_2",
                  "key": app.getKey('id', '2')
                }), "Hello, screencast!")));
            }
            return out;
          })(scope),
          React.createElement('div', app.mergeAttributes('5', scope, {}, {
              "id": "container_5",
              "key": app.getKey('id', '5')
            }),
            React.createElement('div', app.mergeAttributes('6', scope, {}, {
              "id": "messageCopy_6",
              "key": app.getKey('id', '6')
            }), "Hello, screencast!"))));
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