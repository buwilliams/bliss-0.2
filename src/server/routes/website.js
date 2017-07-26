const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

router.use('/',
  express.static(path.join(ws.website(env), 'app')));

router.use('/node_modules',
  express.static(path.join(ws.website(env), 'node_modules')));

module.exports = router
