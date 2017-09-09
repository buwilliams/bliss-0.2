const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const ws = require('../../compilers/core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');
const project = require('../../compilers/core/project.js');
const deps = require('../../compilers/core/dependencies.js');

router.get('/list', function (req, res) {
  if (!req.body.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  var json = project.listProjects(
    ws.workspace(env, req.session, req.body.workspace));
  res.send({success: true, projects: json});
  console.log(`Listed projects for '${session.user.username}/${session.user.workspace}'`);
});

router.get('/load', function (req, res) {
  var name = req.query.name;
  var json = project.readProject(ws.workspace(env, req.session), name);
  deps.update(ws.workspace(env, req.session), json);
  res.send({success: true, project: json});
  console.log(`Loaded '${json.name}'`);
});

router.post('/save', function (req, res) {
  var projectJson = req.body;
  project.writeProject(ws.workspace(env, req.session), projectJson);
  res.send({success: true});
  console.log(`Saved '${projectJson.name}'`);
});

router.get('/explore', function(req, res) {
  var pathName = req.query.path;
  var list = fs.readdirSync(path.join(ws.workspace(env, req.session), pathName));
  list = list.map(function(entry) {
    return {
      file: fs.statSync(path.join(ws.workspace(env, req.session), pathName, entry)).isFile(),
      path: path.join(pathName),
      name: entry
    };
  });
  res.send({success: true, entries: list});
});

// TODO: delete project

module.exports = router
