const path = require('path');
const fs = require('fs');
const fse = require('fs-extra')

module.exports = {
  write: function(projectJson, inputPath, outputPath) {
    fse.copySync(inputPath, outputPath)
    fs.moveSync(`${outputPath}/designer.html`, `${outputPath}/index.html`,
      {overwrite: true});
  }
}
