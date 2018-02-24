const express = require('express')
const router = express.Router()
const ws = require('../../fs/user.js')().workspace()

router.get('/', function(req, res) {
  var deployed = ws.listDeployed().map(function(dir){
    return `/hosted/${dir}/`
  })
  res.render('project-list', { title: 'Project list', links: deployed})
})

router.use('/', express.static(ws.deployPath))

module.exports = router
