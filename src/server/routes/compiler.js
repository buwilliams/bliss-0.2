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
                               "compilers",
                               projectJson.compiler,
                               `${projectJson.compiler}.js`);
  return require(compilerPath);
};

var getDeployer = function(projectJson) {
  var deployerPath = path.join(__dirname,
                               "..",
                               "..",
                               "compilers",
                               projectJson.compiler,
                               "exports",
                               'deploy.js');
  return require(deployerPath);
};

router.post('/build', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  var projectJson = req.body;
  var compiler = getCompiler(projectJson);
  compiler.compile(
    ws.workspace(env, req.session, req.query.workspace),
    projectJson,
    null);
  res.send({success: true});
  console.log(`Built '${projectJson.name}'`);
});

router.post('/export', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  var projectJson = req.body;
  var compiler = getCompiler(projectJson);
  compiler.export(
    ws.workspace(env, req.session, req.query.workspace),
    projectJson,
    null);
  res.send({success: true});
  console.log(`Exported component '${projectJson.name}'`);
});

router.post('/dist', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  var projectJson = req.body;
  var deployer = getDeployer(projectJson);

  deployer.write(projectJson,
    ws.workspace(env, req.session, req.query.workspace),
    ws.deploy(env, req.session, req.query.workspace));

  res.send({success: true});

  console.log(`Deployed '${projectJson.name}'`);
});

router.post('/share', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  var projectJson = req.body;
  var deployer = getDeployer(projectJson);

  deployer.write(projectJson,
    ws.workspace(env, req.session, req.query.workspace),
    ws.share(env, req.session, req.query.workspace));

  res.send({success: true});

  console.log(`Deployed '${projectJson.name}'`);
});

router.post('/import', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  // copy build/_shared/(userFrom)/(workspaceFrom)
  //   to build/(userTo)/(workspaceTo)/components/(workspaceFrom)
  // copy build/(userTo)/(workspaceTo)/components/(workspaceFrom)/(project.json)
  //   to build/(userTo)/(workspaceTo)/projects/(project.json)
});

module.exports = router
