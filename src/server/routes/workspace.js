const path = require('path');
const express = require('express');
const router = express.Router();
const env = require('../env.js');
const user = require('../../fs/user.js');

router.get('/list', function(req, res) {
  var w = user(env, req.session).workspace()

  var workspaces = w.listWorkspaces().map(function(workspace) {
    return { 'name': workspace, 'projects': [] }
  })

  workspaces.forEach(function(work) {
    var projects = user(env, req.session).workspace(work.name).listFiles('projects')
    projects = projects.map(function(project) {
      return { 'name': project }
    })
    work.projects = work.projects.concat(projects);
  });

  res.send({ "workspaces": workspaces })
})

router.post('/', function(req, res) {
  if (!req.body.name) {
    res.status(400).send('name param required');
    return;
  }

  user(env, req.session)
    .createUser()
    .workspace(req.body.name)
    .createWorkspace()

  res.send({ "success": true })
})

router.delete('/:workspaceName', function(req, res) {
  user(env, req.session)
    .workspace(req.params.workspaceName)
    .deleteWorkspace()

  res.send({ "success": true })
})

module.exports = router
