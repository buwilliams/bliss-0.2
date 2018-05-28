/**
 * @module server/routes/reference
 */

const path = require('path');
const express = require('express');
const router = express.Router();
const cssProp = require('../../compilers/core/css-properties.js');

/**
 * @name Find CSS
 * @route {GET} /reference/css
 * @queryparam {string} filter - fuzzy find of css property
 */
router.get('/css', function(req, res) {
  var properties
  if(req.query.filter) {
    properties = cssProp.fuzzyFind(req.query.filter)
  } else {
    properties = cssProp.properties
  }
  res.send(properties)
});

/**
 * @name CSS Property
 * @route {GET} /reference/css/:name
 * @routeparam {string} name - actual css name
 */
router.get('/css/:name', function(req, res) {
  var property = cssProp.find(req.params.name)
  res.send(property)
});

module.exports = router
