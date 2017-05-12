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

  getRefId: function(name, id) {
    return this.getCamel(name) + `_${id}`;
  }
};
