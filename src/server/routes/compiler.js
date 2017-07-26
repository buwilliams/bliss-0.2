const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../compilers/core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

var getCompiler = function(projectJson) {
  var compilerPath = path.join(__dirname,
                               "..",
                               "..",
                               projectJson.compiler,
                               `${projectJson.compiler}.js`);
  return require(compilerPath);
};

var getDeployer = function(projectJson) {
  var deployerPath = path.join(__dirname,
                               "..",
                               "..",
                               projectJson.compiler,
                               "exports",
                               'deploy.js');
  return require(deployerPath);
};

router.post('/build', function (req, res) {
  var projectJson = req.body;
  var compiler = getCompiler(projectJson);
  compiler.compile(ws.workspace(env, req.session), projectJson, null);
  res.send({success: true});
  console.log(`Built '${projectJson.name}'`);
});

router.post('/export', function (req, res) {
  var projectJson = req.body;
  var compiler = getCompiler(projectJson);
  compiler.export(ws.workspace(env, req.session), projectJson, null);
  res.send({success: true});
  console.log(`Exported component '${projectJson.name}'`);
});

router.post('/dist', function (req, res) {
  var projectJson = req.body;
  var deployer = getDeployer(projectJson);
  deployer.write(projectJson, ws.workspace(env, req.session), ws.deploy(env, req.session));
  res.send({success: true});
  console.log(`Deployed '${projectJson.name}'`);
});

module.exports = router
