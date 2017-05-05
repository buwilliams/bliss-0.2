var new_project = (function() {
  var app = {};
  app.state = {};
  app.props = {}
  app.getKey = function() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) out.push(arguments[i]);
    return out.join('_');
  };
  app.mergeAttributes = function(id, scope, dynamicAttributes, attrs) {
    Object.keys(dynamicAttributes).forEach(function(key) {
      var fn = dynamicAttributes[key];
      var value = app.methods[id][fn](scope, attrs);
      attrs[key] = value;
    });
    return attrs;
  }
  app.methods = {};
  app.rootComponent = function(props) {
    if (typeof props !== "undefined") app.props = props;
    var scope = {};
    return (
      React.createElement('div', app.mergeAttributes('1', scope, {}, {
        "key": app.getKey('id', '1')
      })));
  };
  app.render = function() {
    ReactDOM.render(app.rootComponent(), document.getElementById('app'));
  };
  app.setState = function(fn) {
    fn();
    app.render();
  };
  app.js = {};
  app.js.init = function() {
    app.render();
  };
  app.js.createState = function(rawName) {
    var name = rawName.replace(/[^\w]/gi, '');

    var hasValue = function(item) {
      return (typeof item !== "undefined" && item !== null);
    };

    if (!hasValue(app.state._managed)) app.state._managed = {};
    if (!hasValue(app.state._managed[name])) app.state._managed[name] = {};

    var managed = app.state._managed[name];

    var getNewId = function() {
      return managed.nextId++;
    };

    var getAll = function() {
      return managed.data;
    };

    var find = function(id) {
      var found = null;
      for (var i = 0; i < managed.data.length; i++) {
        var item = managed.data[i];
        if (item.id === id) {
          found = item;
          break;
        }
      }
      return found;
    };

    var findBy = function(key, value) {
      var found = null;
      for (var i = 0; i < managed.data.length; i++) {
        var item = managed.data[i];
        if (item[key] === value) {
          found = item;
          break;
        }
      }
      return found;
    };

    var findIndex = function(id) {
      var found = -1;
      for (var i = 0; i < managed.data.length; i++) {
        var item = managed.data[i];
        if (item.id === id) {
          found = i;
          break;
        }
      }
      return found;
    };

    var create = function(data) {
      if (!hasValue(data)) return;
      if (!hasValue(data.id)) data.id = getNewId();
      managed.data.push(data);
    };

    var update = function(id, data) {
      var item = find(id);
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          item[key] = data[key];
        }
      }
    };

    var remove = function(id) {
      var index = findIndex(id);
      if (index) managed.data.splice(index, 1);
    };

    var removeAll = function() {
      managed.data.splice(0, managed.data.length);
    };

    var replaceAll = function(dataArray) {
      removeAll();
      for (var i = 0; i < dataArray.length; i++) {
        create(dataArray[i]);
      }
    };

    var setData = function(key, value) {
      managed.internalData[key] = value;
    };

    var getData = function(key) {
      return managed.internalData[key];
    };

    managed.selected = null;
    managed.nextId = 0;
    managed.data = [];
    managed.internalData = {};
    managed.getNewId = getNewId;
    managed.hasValue = hasValue;
    managed.getAll = getAll;
    managed.find = find;
    managed.findIndex = findIndex;
    managed.findBy = findBy;
    managed.create = create;
    managed.update = update;
    managed.remove = remove;
    managed.removeAll = removeAll;
    managed.replaceAll = replaceAll;
    managed.setData = setData;
    managed.getData = getData;

    return managed;
  };
  app.js.getState = function(rawName) {
    var name = rawName.replace(/[^\w]/gi, '');
    return app.state._managed[name];
  };
  app.js.init();
  app.component = React.createClass({
    componentDidMount: function() {
      app.props = this.props;
    },
    componentWillReceiveProps: function(newProps) {
      app.props = newProps;
    },
    render: function() {
      return app.rootComponent(this.props);
    }
  });
  return app;
})();
if (typeof module !== "undefined") module.exports = new_project;