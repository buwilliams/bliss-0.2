/**
 * @module server/routes/website
 */

const path = require('path');
const express = require('express');
const router = express.Router();
const ws = require('../../fs/user.js')().workspace()

/**
 * @name Website
 * @route {get} /*
 */
router.use('/', express.static(ws.websitePath))

/**
 * @name Website Node Modules
 * @route {get} /node_modules/*
 */
router.use('/node_modules',
  express.static(path.join(ws.websitePath, 'node_modules')))

module.exports = router
