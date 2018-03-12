const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const env = require('../env.js');
const session = require('../session.js');
const user = require('../../fs/user.js');
const deps = require('../../fs/dependencies.js');

router.get('/list', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  var projects = user(env, req.session)
    .workspace(req.query.workspace)
    .project()
    .listProjects()

  res.send({success: true, projects: projects});
});

router.get('/load', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  if (!req.query.name) {
    res.status(400).send('missing name param');
    return;
  }

  var name = req.query.name;

  var project = user(env, req.session)
    .workspace(req.query.workspace)
    .project()
    .loadProject(name)

  deps.update(project.workspace.fullpath, project.projectJson);

  res.send({success: true, project: project.projectJson});
});

router.post('/save', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  user(env, req.session)
    .workspace(req.query.workspace)
    .project(req.body)
    .saveProject()

  res.send({ success: true });
});

// TODO: delete project

/*
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
*/

module.exports = router
