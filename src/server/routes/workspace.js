/**
 * @module server/routes/workspace
 */

const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const env = require('../env.js');
const user = require('../../fs/user.js');

/**
 * @name List Workspaces
 * @route {GET} /workspace/list
 */
router.get('/list', function(req, res) {
  var w = user(env, req.session).workspace()

  var workspaces = w.listWorkspaces().map(function(workspace) {
    return { 'name': workspace, 'projects': [] }
  })

  workspaces.forEach(function(work) {
    var projects = user(env, req.session).workspace(work.name).listFiles('projects')
    projects = projects.map(function(project) {
      var projectName = path.basename(project, '.json');
      return { 'name': projectName }
    })
    work.projects = work.projects.concat(projects);
  });

  res.send({ "workspaces": workspaces })
});

/**
 * @name Download Workspace
 * @route {GET} /workspace/download
 * @queryparam {string} workspace - name of the workspace
 */
router.get('/download', function(req, res, next) {
  if (!req.query.workspace) {
    res.status(400).send('workspace param required');
    return;
  }

  user(env, req.session)
    .workspace(req.query.workspace)
    .createZip()
    .then((zipFile) => {
      res.download(zipFile);
    })
    .catch(next);
});

/**
 * @name Create Workspace
 * @route {post} /workspace
 * @queryparam {string} name - name of the workspace to create
 */
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
});

/**
 * @name Delete Workspace
 * @route {delete} /workspace/:workspaceName
 * @routeparam {string} workspaceName - name of the workspace to delete
 */
router.delete('/:workspaceName', function(req, res) {
  user(env, req.session)
    .workspace(req.params.workspaceName)
    .deleteWorkspace()

  res.send({ "success": true })
});

/**
 * @name File Explorer
 * @route {get} /workspace/file_explorer
 * @queryparam {string} workspace - name of the workspace
 * @queryparam {string} path - list the contents of this path
 */
router.get('/file_explorer', function(req, res) {
  if (!req.query.workspace) {
    res.status(400).send('workspace param required');
    return;
  }

  if (!req.query.path) {
    res.status(400).send('path param required');
    return;
  }

  var entries = user(env, req.session)
    .workspace(req.query.workspace)
    .listFiles(req.query.path);

  res.send(entries);
});

module.exports = router
