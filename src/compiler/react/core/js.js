var _ = require('lodash');

module.exports = {
  getNamespace: function(namespace) {
    if(_.isNil(namespace) || namespace === '') {
      return "app.js";
    } else {
      return `app.${namespace}`;
    }
  },

  getFn: function(fnDef, namespace) {
    namespace = this.getNamespace(namespace);
    return `${namespace}.${fnDef.name} = ${fnDef.body}`;
  },

  getFns: function(fnsDef, namespace) {
    var that = this;
    namespace = this.getNamespace(namespace);
    return fnsDef.map(function(fn) {
      return that.getFn(fn, namespace);
    });
  },

  getFnsString: function(fnsDef, namespace) {
    return this.getFns(fnsDef, namespace).join("\n");
  },

  getJsVarsString: function(jsVars) {
    var namespace = this.getNamespace("jsVars");
    return null;
  }
};
