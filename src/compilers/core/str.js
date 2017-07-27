const _ = require('lodash')
const shorter = require('shorter')
const metrohash64 = require('metrohash').metrohash64;

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

  getSnake: function(str) {
    var newStr = str.replace(/[^a-z0-9\s_]/gi, '').trim();
    newStr = newStr.replace(/\s/g, '_').toLowerCase();
    return newStr;
  },

  getRefId: function(name, id) {
    return this.getCamel(name) + `_${id}`;
  },

  token: function(input) {
    return metrohash64(input);
  },

  encode: function(string) {
    const encoded = shorter.compress(string)
    return encoded.toString('hex')
  },

  decode: function(string) {
    const decoded = shorter.decompress(Buffer.from(string, 'hex'))
    return decoded.toString()
  }
};
