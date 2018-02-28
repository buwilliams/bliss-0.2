const path = require('path');
const express = require('express');
const router = express.Router();
const designerMiddleware = require('../designer-middleware.js')
const env = require('../env.js');

// Application Routes
// TODO: Option 1, use middleware, add optional parameter
//       return back the static file at that loc
//       ignore authorization for the request since
//       no real harm can come by doing it that way
//       the only potential harm is that someone
//       will be able to view another's project
//       but they will not be able to modify it
//       Option 2, create a temporary key that only
//       lasts for a 48-hour period
// TODO: route.get('/designer/:directory_code/:token/*')
//router.use('/designer', express.static(ws.workspace(env, session)));
router.use('/designer/:token/:workspace/*', designerMiddleware);

router.use('/designer/bliss-tree',
  express.static(path.join(env.app, 'bliss-tree')));

router.use('/designer/bliss-properties',
  express.static(path.join(env.app, 'bliss-properties')));

router.use('/designer/bliss-javascript',
  express.static(path.join(env.app, 'bliss-javascript')));

router.use('/designer/bliss-utils',
  express.static(path.join(env.app, 'bliss-utils')));

router.use('/node_modules',
  express.static(env.node_modules));

router.use('/', express.static(env.app));

module.exports = router
