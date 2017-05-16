const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

module.exports = {
  removePackageJson: function(path) {
    fs.unlinkSync(path.join(path, "package.json"));
  },

  createPackageJson: function(projectJson) {
    var packageJson = {
      "name": "tmp",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {},
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {}
    }

    projectJson.packages.forEach(function(dep) {
      packageJson.dependencies[dep.name] = dep.version;
    });

    return packageJson;
  },

  writePackageJson: function(path, projectJson) {
    var packageJson = this.createPackageJson(projectJson);
    fs.writeFileSync(path.join(path, "package.json"), JSON.stringify(packageJson, null, 2));
  },

  installPackageJson: function(path) {
    var code = execSync('npm install', {"cwd", path});
  },

  update: function(path, projectJson) {
    this.removePackageJson(path);
    this.writePackageJson(path, projectJson);
    this.installPackageJson(path);
  }
};
