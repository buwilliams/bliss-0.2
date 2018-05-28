/**
 * @module server/routes/project
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const env = require('../env.js');
const session = require('../session.js');
const user = require('../../fs/user.js');

/**
 * @name List Pages
 * @route {GET} /project/list
 * @queryparam {string} workspace - workspace name
 */
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

/**
 * @name Load Page
 * @route {GET} /project/load
 * @queryparam {string} workspace - workspace name
 * @queryparam {string} name - name of page to load
 */
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

/**
 * @name Save Page
 * @route {POST} /project/save
 * @queryparam {string} workspace - workspace name
 * @bodyparam {object} requestBody - projectJson contents
 */
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

/**
 * @name Delete Page
 * @route {POST} /project/delete
 * @queryparam {string} workspace - workspace name
 * @queryparam {string} project - page name
 */
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

/**
 * @name Import HTML
 * @route {POST} /project/html
 * @queryparam {string} workspace - workspace name
 * @queryparam {string} parentId - id of the parent component to add imported html
 * @bodyparam {object} project - projectJson
 * @bodyparam {string} html - string of html to import
 */
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
