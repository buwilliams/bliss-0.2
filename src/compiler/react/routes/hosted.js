const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

router.use('/',
  express.static(ws.hosted(env)));

module.exports = router
