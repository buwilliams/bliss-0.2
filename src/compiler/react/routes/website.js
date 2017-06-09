const express = require('express');
const router = express.Router();

router.use('/',
  express.static(path.join(session.workspace_root,
                           'blissui',
                           'website',
                           'dist',
                           'bliss_ui_website',
                           'app')));

router.use('/node_modules',
  express.static(path.join(session.workspace_root,
                           'blissui',
                           'website',
                           'dist',
                           'bliss_ui_website',
                           'node_modules')));

module.exports = router
