const path = require('path')
const express = require('express')
const router = express.Router()
const env = require('../env.js')
const user = require('../../fs/user.js')

router.post('/build', function (req, res) {
  if (!req.query.workspace) {
    return res.status(400).send('missing workspace param')
  }

  var projectJson = req.body

  user(env, req.session)
    .workspace(req.query.workspace)
    .project(projectJson)
    .compile()

  console.log(`Built '${projectJson.name}'`)
  res.send({success: true})
});

router.post('/export', function (req, res) {
  if (!req.query.workspace) {
    return res.status(400).send('missing workspace param')
  }

  var projectJson = req.body

  user(env, req.session)
    .workspace(req.query.workspace)
    .project(projectJson)
    .export()

  res.send({success: true})
  console.log(`Exported component '${projectJson.name}'`)
});

router.post('/dist', function (req, res) {
  if (!req.query.workspace) {
    return res.status(400).send('missing workspace param')
  }

  var projectJson = req.body

  user(env, req.session)
    .workspace(req.query.workspace)
    .deployWorkspace()

  res.send({success: true});
  console.log(`Deployed '${projectJson.name}'`);
});

router.post('/share', function (req, res) {
  if (!req.query.workspace) {
    res.status(400).send('missing workspace param');
    return;
  }

  var projectJson = req.body

  user(env, req.session)
    .workspace(req.query.workspace)
    .shareWorkspace()

  res.send({success: true});

  console.log(`Shared '${projectJson.name}'`);
});

router.post('/import', function (req, res) {
  if (!req.query.workspace || !req.query.fromUser || !req.query.fromWorkspace) {
    return res
      .status(400)
      .send('missing workspace, fromUser, or fromWorkspace params')
  }

  var fromUser = req.query.fromUser
  var fromWorkspace = req.query.fromWorkspace

  user(env, req.session)
    .workspace(req.query.workspace)
    .importWorkspace(fromUser, fromWorkspace)

  res.send({success: true});

  console.log(`Imported '${fromUser}/${fromWorkspace}'`);
});

module.exports = router
