const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../fs/user.js')().workspace()

router.use('/', express.static(ws.websitePath))

router.use('/node_modules',
  express.static(path.join(ws.websitePath, 'node_modules')))

module.exports = router
