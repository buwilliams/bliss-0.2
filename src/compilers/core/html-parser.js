const parse5 = require('parse5');

module.exports = {
  parse: function(htmlString) {
    var parsed = parse5.parse(htmlString);
    return parsed;
  },

  parseFragment: function(htmlString) {
    var parsed = parse5.parseFragment(htmlString);
    return parsed;
  }
};
