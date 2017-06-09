const path = require('path');
const express = require('express');
const router = express.Router();
const session = require('../session.js');

// Application Routes
router.use('/designer', express.static(options.workspace));

router.use('/designer/bliss-tree',
  express.static(path.join(options.app, 'bliss-tree')));

router.use('/designer/bliss-properties',
  express.static(path.join(options.app, 'bliss-properties')));

router.use('/designer/bliss-javascript',
  express.static(path.join(options.app, 'bliss-javascript')));

router.use('/node_modules',
  express.static(options.node_modules));

router.use('/', express.static(options.app));

module.exports = router
