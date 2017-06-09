const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../core/workspace.js');
const env = require('../env.js');
const session = require('../session.js');

// Application Routes
router.use('/designer', express.static(ws.workspace(env, session)));

router.use('/designer/bliss-tree',
  express.static(path.join(env.app, 'bliss-tree')));

router.use('/designer/bliss-properties',
  express.static(path.join(env.app, 'bliss-properties')));

router.use('/designer/bliss-javascript',
  express.static(path.join(env.app, 'bliss-javascript')));

router.use('/designer/bliss-utils',
  express.static(path.join(env.app, 'bliss-utils')));

router.use('/node_modules',
  express.static(env.node_modules));

router.use('/', express.static(env.app));

module.exports = router
