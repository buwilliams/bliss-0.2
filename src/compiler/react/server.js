const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const file = require('./core/file.js');
const low = require('lowdb');
const app = express();

module.exports = function(options) {
  var getBlissPath = function() {
    return path.join(__dirname, '..', '..', '..', 'build');
  };

  var getCompiler = function(projectJson) {
    var version = projectJson.version || "v0.1";
    var compilerPath = path.join(__dirname, "react.js");
    return require(compilerPath);
  };

  app.use(bodyParser.json());

  app.post('/build', function (req, res) {
    var projectJson = req.body;
    var compiler = getCompiler(projectJson);
    compiler.compile(options.workspace, projectJson, null);
    console.log(`Build ${projectJson.name} finished.`);
    res.send({success: true});
  });

  app.post('/export', function (req, res) {
    var projectJson = req.body;
    var compiler = getCompiler(projectJson);
    compiler.export(options.workspace, projectJson, null);
    console.log(`Component '${projectJson.name}' build finished.`);
    res.send({success: true});
  });

  app.post('/save', function (req, res) {
    var project = req.body;
    file.writeProject(options.workspace, project);
    res.send({success: true});
  });

  app.get('/load', function (req, res) {
    var name = req.query.name;
    var json = file.readProject(options.workspace, name);
    res.send({success: true, project: json});
  });

  app.use('/designer', express.static(options.workspace));
  app.use('/', express.static(options.app));
  app.use('/node_modules', express.static(options.node_modules));

  app.listen(options.port, function () {
    console.log(`Find your bliss on port ${options.port}!`);
  });
}
