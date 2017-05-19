const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const _ = require('lodash');
const fixPath = require('fix-path');

module.exports = {
  removePackageJson: function(workspace) {
    var packagePath = path.join(workspace, "package.json");
    if(fs.existsSync(packagePath)) {
      fs.unlinkSync(packagePath);
    }
  },

  createPackageJson: function(projectJson, additionalDeps) {
    var packageJson = {
      "name": "tmp",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "start": "node index.js"
      },
      "keywords": [],
      "author": "",
      "license": "UNLICENSED",
      "dependencies": {}
    }

    packageJson.name = projectJson.build;

    if(!_.isNil(additionalDeps)) {
      Object.keys(additionalDeps).forEach(function(dep) {
        packageJson.dependencies[dep] = additionalDeps[dep];
      });
    }

    projectJson.packages.forEach(function(dep) {
      packageJson.dependencies[dep.name] = dep.version;
    });

    return packageJson;
  },

  writePackageJson: function(workspace, projectJson, additionalDeps) {
    var packageJson = this.createPackageJson(projectJson, additionalDeps);
    fs.writeFileSync(path.join(workspace, "package.json"), JSON.stringify(packageJson, null, 2));
  },

  installPackageJson: function(workspace) {
    fixPath();
    var code = execSync(`npm install`, {"cwd": workspace});
  },

  update: function(workspace, projectJson, additionalDeps) {
    this.removePackageJson(workspace);
    this.writePackageJson(workspace, projectJson, additionalDeps);
    this.installPackageJson(workspace);
  }
};
