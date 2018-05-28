/**
 * @module server/routes/user
 */

const path = require('path');
const express = require('express');
const router = express.Router();
const env = require('../env.js');
const session = require('../session.js');

module.exports = router
