var _ = require('lodash');

module.exports = {
  getCamel: function(str) {
    str = str.replace(/[^a-z]/gi, ' ').trim();
    var out = str.split(" ").map(function(word, index) {
      if(index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
      }
    }).join("");
    return out;
  },

  getNamespace: function(namespace) {
    if(_.isNil(namespace) || namespace === '') {
      return "app.js";
    } else {
      return `app.js["${namespace}"]`;
    }
  },

  getFn: function(fnDef, namespace) {
    namespace = this.getNamespace(namespace);
    return `${namespace}.${fnDef.name} = ${fnDef.body}`;
  },

  getFns: function(fnsDef, namespace) {
    var that = this;
    //namespace = this.getNamespace(namespace);
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
