const express = require('express')
const router = express.Router()
const env = require('../env.js')
const session = require('../session.js')
const user = require('../../fs/user.js')
const ws = user(env, session).workspace()

router.get('/', function(req, res) {
  var deployed = ws.listDeployed().map(function(dir){
    return `/hosted/${dir}/`
  })
  res.render('project-list', { title: 'Project list', links: deployed})
})

router.use('/', express.static(ws.deployPath))

module.exports = router
