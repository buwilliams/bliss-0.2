const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

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
