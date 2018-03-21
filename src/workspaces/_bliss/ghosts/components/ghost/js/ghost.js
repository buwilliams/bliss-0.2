var ghost = (function() {
  var createApp = function(component) {
    if (typeof component === 'undefined') return {};
    var app = {
      js: {},
      methods: {},
      props: {},
      state: {}
    };
    app.js['init'] = function() {
      app.state.top = 0;
      app.state.left = 0;
      app.render();
      app.js.loop();
    }
    app.js['move'] = function() {
      app.setState(function() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var top = app.js.rando(0, h);
        var left = app.js.rando(0, w);
        app.state.top = top;
        app.state.left = left;
      });
    }
    app.js['rando'] = function(min, max) {
      return Math.floor(Math.random() * max) + min;
    }
    app.js['loop'] = function(scope, attributes) {
      var interval = app.js.rando(200, 500);
      app.state.timer = setInterval(function() {
        app.js.move();
      }, interval);
    }
    app.js['destroy_component'] = function() {
      clearInterval(app.state.timer);
    };
    app.methods["1"] = {};
    app.methods["1"]['getStyles'] = function(scope, attributes) {
      var styles = {};

      styles.top = app.state.top + 'px';
      styles.left = app.state.left + 'px';
      styles.backgroundColor = app.props.backgroundColor || 'gray';

      return styles;
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
        React.createElement('div', app.mergeAttributes('1', scope, {
          "style": "getStyles"
        }, {
          "id": "ghost_1",
          "key": app.getKey('id', '1')
        }), 'Ghost'));
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