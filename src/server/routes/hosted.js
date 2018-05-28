/**
 * @module server/routes/hosted
 */

const express = require('express')
const router = express.Router()
const ws = require('../../fs/user.js')().workspace()

/**
 * Show a list of all hosted websites
 *
 * @name Hosted
 * @route {GET} /
 */
router.get('/', function(req, res) {
  var deployed = ws.listDeployed().map(function(dir){
    return `/hosted/${dir}/`
  })
  res.render('project-list', { title: 'Project list', links: deployed})
})

/**
 * Catch all to serve statically hosted content
 *
 * @name Static Hosted
 * @route {GET} /*
 */
router.use('/', express.static(ws.deployPath))

module.exports = router
