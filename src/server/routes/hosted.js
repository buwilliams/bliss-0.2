const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const ws = require('../../compilers/core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

router.get('/', function(req, res) {
  var deployedDir = path.join(env.workspace, '_deployed');
  var links = [];
  var users = fs.readdirSync(deployedDir);
  users.forEach(function(user) {
    var workspaces = fs.readdirSync(path.join(deployedDir, user));
    workspaces.forEach(function(workspace) {
      links.push(`/hosted/${user}/${workspace}/`);
    });
  });

  res.render('project-list', { title: 'Project list', links: links})
});

router.get('/:user', function(req, res) {
  var deployedDir = path.join(env.workspace, '_deployed');
  var links = [];
  var user = req.params.user
  var workspaces = fs.readdirSync(path.join(deployedDir, user));
  workspaces.forEach(function(workspace) {
    links.push(`/hosted/${user}/${workspace}/`);
  });

  res.render('project-list', { title: 'Project list', links: links})
});

router.use('/',
  express.static(ws.deployed(env)));

module.exports = router
