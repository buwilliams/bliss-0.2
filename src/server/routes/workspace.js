const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../compilers/core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

router.get('/list', function(req, res) {
  var workspaces = ws.list(env, req.session)
  workspaces.forEach(function(w) {
    w.projects = w.projects.concat(ws.listProjects(env, req.session, w.name));
  });

  res.send({
    "workspaces": workspaces
  })
})

router.post('/', function(req, res) {
  if (!req.body.name) {
    res.status(400).send('name param required');
    return;
  }

  ws.newWs(env, req.session, req.body.name)
  res.send({ "success": true })
})

router.delete('/:workspaceName', function(req, res) {
  console.log('workspace name', req.params.workspaceName)
  ws.deleteWs(env, req.session, req.params.workspaceName)
  res.send({ "success": true })
})

module.exports = router
