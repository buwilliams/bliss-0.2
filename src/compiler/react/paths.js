const path = require('path');
const env = require('./env.js');

module.exports = {
  app: function() {
    return path.join(env.workspace);
  }
}
