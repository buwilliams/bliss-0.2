const path = require('path');
const express = require('express');
const router = express.Router();
const cssProp = require('../../compilers/core/css-properties.js');

router.get('/css', function(req, res) {
  var properties
  if(req.query.filter) {
    properties = cssProp.fuzzyFind(req.query.filter)
  } else {
    properties = cssProp.properties
  }
  res.send(properties)
});

router.get('/css/:name', function(req, res) {
  var property = cssProp.find(req.params.name)
  res.send(property)
});

module.exports = router
