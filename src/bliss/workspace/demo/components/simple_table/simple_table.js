var simple_table = (function() {
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
  app.methods['14'] = {};
  app.methods['14']['shouldShowEmptyRow'] = function(scope, attributes) {
    var collection = app.props.rows || [];
    return (collection.length === 0);
  };
  app.methods['15'] = {};
  app.methods['15']['emptyText'] = function(scope, attributes) {
    return app.state.emptyText || "No results to show.";
  };;
  app.methods['6'] = {};
  app.methods['6']['repeatRows'] = function(scope, attributes) {
    return app.props.rows || [];
  };;
  app.methods['11'] = {};
  app.methods['11']['getId'] = function(scope, attributes) {
    return scope.repeatRows[scope.repeatRows_index].id || '';
  };;
  app.methods['12'] = {};
  app.methods['12']['getEmail'] = function(scope, attributes) {
    return scope.repeatRows[scope.repeatRows_index].email || '';
  };;
  app.methods['10'] = {};
  app.methods['10']['getName'] = function(scope, attributes) {
    return scope.repeatRows[scope.repeatRows_index].name || '';
  };;
  app.rootComponent = function(props) {
    if (typeof props !== "undefined") app.props = props;
    var scope = {};
    return (
      React.createElement('div', app.mergeAttributes('1', scope, {}, {
          "key": app.getKey('id', '1')
        }),
        React.createElement('table', app.mergeAttributes('2', scope, {}, {
            "key": app.getKey('id', '2')
          }),
          React.createElement('thead', app.mergeAttributes('3', scope, {}, {
              "id": "tableHead",
              "key": app.getKey('id', '3')
            }),
            React.createElement('tr', app.mergeAttributes('5', scope, {}, {
                "key": app.getKey('id', '5')
              }),
              React.createElement('th', app.mergeAttributes('7', scope, {}, {
                "key": app.getKey('id', '7')
              }), "id"),
              React.createElement('th', app.mergeAttributes('9', scope, {}, {
                "key": app.getKey('id', '9')
              }), "email"),
              React.createElement('th', app.mergeAttributes('8', scope, {}, {
                "key": app.getKey('id', '8')
              }), "name"))),
          React.createElement('tbody', app.mergeAttributes('4', scope, {}, {
              "key": app.getKey('id', '4')
            }),
            (function(scope) {
              var out = [];
              scope['shouldShowEmptyRow'] = app.methods['14']['shouldShowEmptyRow'](scope);
              if (app.methods['14']['shouldShowEmptyRow'](scope) === true) {
                out.push(React.createElement('tr', app.mergeAttributes('14', scope, {}, {
                    "key": app.getKey('id', '14')
                  }),
                  React.createElement('td', app.mergeAttributes('15', scope, {}, {
                    "colSpan": "3",
                    "key": app.getKey('id', '15')
                  }), app.methods['15']['emptyText'](scope))));
              }
              return out;
            })(scope),
            (function(scope) {
              var out = [];
              var list = scope['repeatRows'] = app.methods['6']['repeatRows'](scope);
              for (var i = 0; i < list.length; i++) {
                scope['repeatRows_index'] = i;
                out.push(React.createElement('tr', app.mergeAttributes('6', scope, {}, {
                    "key": app.getKey('id', '6', i)
                  }),
                  React.createElement('td', app.mergeAttributes('11', scope, {}, {
                    "key": app.getKey('id', '11')
                  }), app.methods['11']['getId'](scope)),
                  React.createElement('td', app.mergeAttributes('12', scope, {}, {
                    "key": app.getKey('id', '12')
                  }), app.methods['12']['getEmail'](scope)),
                  React.createElement('td', app.mergeAttributes('10', scope, {}, {
                    "key": app.getKey('id', '10')
                  }), app.methods['10']['getName'](scope))));
              }
              return out;
            })(scope)))));
  };
  app.setState = function(fn) {
    fn();
  };
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
if (typeof module !== "undefined") module.exports = simple_table;