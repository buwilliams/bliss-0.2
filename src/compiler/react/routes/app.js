const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

router.use('/', function(req, res, next) {
  console.log('url    ', req.url);
  var urlSplit = req.url.split('/');
  console.log(urlSplit);
  var user = urlSplit[1];
  var workspace = urlSplit[2];
  var project = urlSplit[2];

  var distPath = path.join(env.workspace,
                           user,
                           workspace,
                           'dist',
                           project,
                           'app');

  console.log('serving', distPath);

  return express.static(distPath)(req, res, next);
});

/*
router.use('/:username/:workspace/:project', function(req, res) {
  var distPath = path.join(env.workspace,
                           req.params.username,
                           req.params.workspace,
                           'dist',
                           req.params.project,
                           'app');
  console.log('hi', distPath);
  return express.static(distPath);
});

router.use('/:username/:workspace/:project/node_modules', function(req, res) {
  var nodePath = path.join(env.workspace,
                       req.params.username,
                       req.params.workspace,
                       'dist',
                       req.params.project,
                       'node_modules');
  express.static(nodePath);
});
*/

module.exports = router
