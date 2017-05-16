const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

module.exports = {
  removePackageJson: function(workspace) {
    var packagePath = path.join(workspace, "package.json");
    if(fs.existsSync(packagePath)) {
      fs.unlinkSync(packagePath);
    }
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

  writePackageJson: function(workspace, projectJson) {
    var packageJson = this.createPackageJson(projectJson);
    fs.writeFileSync(path.join(workspace, "package.json"), JSON.stringify(packageJson, null, 2));
  },

  installPackageJson: function(workspace) {
    var code = execSync('npm install', {"cwd": workspace});
  },

  update: function(workspace, projectJson) {
    this.removePackageJson(workspace);
    this.writePackageJson(workspace, projectJson);
    this.installPackageJson(workspace);
  }
};
