var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var file = require('./compiler/react/v0.1/core/file.js');
var app = express();

module.exports = function(port, workspace) {
  var getCompiler = function(projectJson) {
    var version = projectJson.version || "v0.1";
    var compilerPath = path.join(__dirname, "compiler", projectJson.compiler, version, `${projectJson.compiler}.js`);
    return require(compilerPath);
  };

  app.use(bodyParser.json());

  app.get('/bliss', function(req, res) {
    res.sendFile(path.join(__dirname, 'bliss', 'bliss.html'));
  });

  app.post('/build', function (req, res) {
    var projectJson = req.body;
    var compiler = getCompiler(projectJson);
    compiler.compile(workspace, projectJson, null);
    console.log(`Build ${projectJson.name} finished.`);
    res.send({success: true});
  });

  app.post('/export', function (req, res) {
    var projectJson = req.body;
    var compiler = getCompiler(projectJson);
    compiler.export(workspace, projectJson, null);
    console.log(`Component '${projectJson.name}' build finished.`);
    res.send({success: true});
  });

  app.post('/save', function (req, res) {
    var project = req.body;
    file.writeProject(workspace, project);
    res.send({success: true});
  });

  app.get('/load', function (req, res) {
    var name = req.query.name;
    var json = file.readProject(workspace, name);
    res.send({success: true, project: json});
  });

  app.use('/bliss', express.static(path.join(__dirname, 'bliss')));
  app.use('/designer', express.static(workspace));

  app.listen(port, function () {
    console.log(`Find your bliss on port ${port}!`);
  });
}
