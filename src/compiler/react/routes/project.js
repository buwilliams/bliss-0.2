const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');
const project = require('../../core/project.js');
const deps = require('../../core/dependencies.js');

router.get('/list', function (req, res) {
  var json = project.listProjects(options.workspace);
  res.send({success: true, projects: json});
  console.log(`Listed projects`);
});

router.get('/load', function (req, res) {
  var name = req.query.name;
  var json = project.readProject(options.workspace, name);
  deps.update(options.workspace, json);
  res.send({success: true, project: json});
  console.log(`Loaded '${json.name}'`);
});

router.post('/save', function (req, res) {
  var project = req.body;
  project.writeProject(options.workspace, project);
  res.send({success: true});
  console.log(`Saved '${project.name}'`);
});

router.get('/explore', function(req, res) {
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

// TODO: delete project

module.exports = router
