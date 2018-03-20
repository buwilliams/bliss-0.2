const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const env = require('../env.js');
const session = require('../session.js');
const user = require('../../fs/user.js');

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

  if(req.query.ignorePackages !== 'true') {
    project.updateDependencies();
  }

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
    .saveProject();

  res.send({ success: true });
});

router.post('/delete', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  if (!req.query.project) {
    res.status(400).send('missing project param');
    return;
  }

  user(env, req.session)
    .workspace(req.query.workspace)
    .project()
    .deleteProject(req.query.project);

  res.send({ success: true });
});

router.post('/html', function(req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  if (!req.query.parentId) {
    res.status(400).send('missing parentId param');
    return;
  }

  var project = user(env, req.session)
    .workspace(req.query.workspace)
    .project(req.body.project)
    .importHtml(req.body.html, req.query.parentId)
    .saveProject()
    .compile();

  res.send({ success: true, project: project.projectJson });
});

module.exports = router
