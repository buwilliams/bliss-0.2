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
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  var json = project.listProjects(
    ws.workspace(env, req.session, req.query.workspace));
  res.send({success: true, projects: json});
  console.log(`Listed projects for '` +
    `${session.user.username}/${session.user.workspace}'`);
});

router.get('/load', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  if (!req.query.name) {
    res.status(400).send('missing name param ');
    return;
  }

  var name = req.query.name;
  var json = project.readProject(
    ws.workspace(env, req.session, req.query.workspace), name);
  deps.update(
    ws.workspace(env, req.session, req.query.workspace), json);
  res.send({success: true, project: json});
  console.log(`Loaded '${json.name}'`);
});

router.post('/save', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  var projectJson = req.body;
  project.writeProject(
    ws.workspace(env, req.session, req.query.workspace), projectJson);
  res.send({success: true});
  console.log(`Saved '${projectJson.name}'`);
});

router.get('/explore', function(req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  if (!req.query.path) {
    res.status(400).send('missing path param');
    return;
  }

  var pathName = req.query.path;
  var list = fs.readdirSync(path.join(
    ws.workspace(env, req.session, req.query.workspace), pathName));
  list = list.map(function(entry) {
    return {
      file: fs.statSync(path.join(
        ws.workspace(env, req.session, req.query.workspace),
        pathName,
        entry)).isFile(),
      path: path.join(pathName),
      name: entry
    };
  });
  res.send({success: true, entries: list});
});

// TODO: delete project

module.exports = router
