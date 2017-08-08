const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../compilers/core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

router.get('/list', function(req, res) {
  res.send({"success": true})
})

// create workspace
//  create workspace folder under the user
//  create dirs
//  create workspace.json
//    set root project
//    empty sharing list

// delete workspace
//  delete all subdirectories

// list workspaces
//  return list of workspaces

module.exports = router
