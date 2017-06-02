const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const npm = require('./core/npm.js');
const file = require('./core/file.js');
const low = require('lowdb');
const app = express();

module.exports = function(options) {
  var getCompiler = function(projectJson) {
    var compilerPath = path.join(__dirname, "react.js");
    return require(compilerPath);
  };

  app.use(bodyParser.json());

  app.post('/build', function (req, res) {
    var projectJson = req.body;
    var compiler = getCompiler(projectJson);
    compiler.compile(options.workspace, projectJson, null);
    res.send({success: true});
    console.log(`Built '${projectJson.name}'`);
  });

  app.post('/export', function (req, res) {
    var projectJson = req.body;
    var compiler = getCompiler(projectJson);
    compiler.export(options.workspace, projectJson, null);
    res.send({success: true});
    console.log(`Exported component '${projectJson.name}'`);
  });

  app.post('/dist', function (req, res) {
    var projectJson = req.body;
    var compiler = getCompiler(projectJson);
    compiler.dist(options.workspace, projectJson, null);
    res.send({success: true});
    console.log(`Created dist '${projectJson.name}'`);
  });

  app.post('/save', function (req, res) {
    var project = req.body;
    file.writeProject(options.workspace, project);
    res.send({success: true});
    console.log(`Saved '${project.name}'`);
  });

  app.get('/load', function (req, res) {
    var name = req.query.name;
    var json = file.readProject(options.workspace, name);
    npm.update(options.workspace, json);
    res.send({success: true, project: json});
    console.log(`Loaded '${json.name}'`);
  });

  app.get('/list', function (req, res) {
    var json = file.listProjects(options.workspace);
    res.send({success: true, projects: json});
    console.log(`Listed projects`);
  });

  app.get('/explore', function(req, res) {
    var pathName = req.query.path;
    var list = fs.readdirSync(path.join(options.workspace, pathName));
    list = list.map(function(entry) {
      return {
        file: fs.statSync(path.join(options.workspace, pathName, entry)).isFile(),
        path: path.join(pathName),
        name: entry
      };
    });
    res.send({success: true, entries: list});
  });

  // Website Routes
  app.get('/', function(req, res) { res.redirect('/website/bliss_ui_website.html'); });
  app.get('/website', function(req, res) { res.redirect('/website/bliss_ui_website.html'); });
  app.use('/website', express.static(path.join(options.workspace, 'dist', 'bliss_ui_website', 'app')));
  app.use('/website/node_modules', express.static(path.join(options.workspace, 'dist', 'bliss_ui_website', 'node_modules')));

  // Application Routes
  app.use('/designer', express.static(options.workspace));
  app.use('/designer/bliss-tree', express.static(path.join(options.app, 'bliss-tree')));
  app.use('/designer/bliss-properties', express.static(path.join(options.app, 'bliss-properties')));
  app.use('/designer/bliss-javascript', express.static(path.join(options.app, 'bliss-javascript')));
  app.use('/node_modules', express.static(options.node_modules));
  app.use('/', express.static(options.app));

  app.listen(options.port, function () {
    console.log(`Find your Bliss on port ${options.port}!`);
  });
}
