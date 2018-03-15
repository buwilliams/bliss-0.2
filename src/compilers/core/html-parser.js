const parse5 = require('parse5');

module.exports = {
  parse: function(htmlString) {
    var parsed = parse5.parse(htmlString);
    return parsed;
  },

  parseFragment: function(htmlString) {
    var parsed = parse5.parseFragment(htmlString);
    return parsed;
  },

  toProject: function(htmlString, projectJson, appendId) {
    var frag = this.parseFragment(htmlString);
    return this._toProject(frag.childNodes[0], projectJson, appendId);
  },

  _toProject: function(htmlRef, projectJson, appendId) {
    // create component
    // set attributes
    // set parent, child, next, previous
    return projectJson;
  }
};
