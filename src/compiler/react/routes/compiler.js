const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

var getCompiler = function(projectJson) {
  var compilerPath = path.join(__dirname, "..", "react.js");
  return require(compilerPath);
};

router.post('/build', function (req, res) {
  var projectJson = req.body;
  var compiler = getCompiler(projectJson);
  compiler.compile(ws.workspace(env, session), projectJson, null);
  res.send({success: true});
  console.log(`Built '${projectJson.name}'`);
});

router.post('/export', function (req, res) {
  var projectJson = req.body;
  var compiler = getCompiler(projectJson);
  compiler.export(ws.workspace(env, session), projectJson, null);
  res.send({success: true});
  console.log(`Exported component '${projectJson.name}'`);
});

router.post('/dist', function (req, res) {
  var projectJson = req.body;
  var compiler = getCompiler(projectJson);
  compiler.dist(ws.workspace(env, session), projectJson, null);
  res.send({success: true});
  console.log(`Created dist '${projectJson.name}'`);
});

module.exports = router
