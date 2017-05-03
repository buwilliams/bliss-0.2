var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = {
  write: function(outputPath, projectJson, startId) {
    var filename = `${projectJson.build}.css`;
    var strData = this.build(projectJson, startId);
    var fullpath = path.join(outputPath, filename);
    fs.writeFileSync(fullpath, strData);
  },

  build: function(projectJson, startId) {
    return "";
  }
}
