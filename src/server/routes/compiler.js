/**
 * @module server/routes/compiler
 */

const path = require('path')
const express = require('express')
const router = express.Router()
const env = require('../env.js')
const user = require('../../fs/user.js')

/**
 * Compile projectJson into web app
 *
 * @name Build
 * @route {POST} /compiler/build
 * @queryparam {string} workspace - name of the current workspace
 * @bodyparam {object} requestBody - projectJson contents
 */
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

/**
 * Export web app to components directory
 *
 * @name Export
 * @route {POST} /compiler/export
 * @queryparam {string} workspace - name of the current workspace
 * @bodyparam {object} requestBody - projectJson contents
 */
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

/**
 * Deployed web app to public hosted directory
 *
 * @name Distribute
 * @route {POST} /compiler/dist
 * @queryparam {string} workspace - name of the current workspace
 * @bodyparam {object} requestBody - projectJson contents
 */
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

/**
 * Deploy web app to public shared directory so that others may reuse
 *
 * @name Share
 * @route {POST} /compiler/share
 * @queryparam {string} workspace - name of the current workspace
 * @bodyparam {object} requestBody - projectJson contents
 */
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

/**
 * Import a shared workspace
 *
 * @name Import
 * @route {POST} /compiler/import
 * @queryparam {string} workspace - name of the current workspace
 * @queryparam {string} fromUser - name of the user to import
 * @queryparam {string} fromWorkspace - name of workspace to import
 */
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
