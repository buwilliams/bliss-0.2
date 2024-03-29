/**
 * @module server/server
 */

require('dotenv').config();
const path = require('path')
const https = require('https')
const fs = require('fs')
const express = require('express')
const app = express()
const _ = require('lodash');
const bodyParser = require('body-parser')
// const authorization = require('./server-authorization.js')
const env = require('./env.js')
const bliss = require('./routes/bliss.js')
const compiler = require('./routes/compiler.js')
const project = require('./routes/project.js')
const user = require('./routes/user.js')
const website = require('./routes/website.js')
const workspace = require('./routes/workspace.js')
const hosted = require('./routes/hosted.js')
const reference = require('./routes/reference.js')
const tokens = require('./core/tokens.js')
const defaultSession = require('./session_default.js')
const testSession = require('./session.js')

app.use(bodyParser.json({limit: '50mb'}))

/*
var secure = app.use(
  authorization(
    { protected_urls: ['/user',
                       '/compiler',
                       '/project',
                       '/website',
                       '/workspace',
                       '/session']}));
*/

app.use(function(req, res, next) {
  if(process.env.BLISS_ENV === 'test') {
    req.session = Object.assign({}, req.session, testSession);
  } else {
    req.session = Object.assign({}, req.session, defaultSession);
  }
  next();
});

/**
 * Redirect to website workspace
 *
 * @name Website Redirect
 * @route {GET} /
 */
app.get('/', function(req, res) {
  res.redirect(`/hosted/${env.bliss_user}/website/`);
});

/**
 * Source code documentation
 *
 * @name Docs
 * @route {GET} /docs
 */
app.use('/docs', express.static(path.join(env.workspace, 'docs')));

app.use('/user', user);
app.use('/compiler', compiler);
app.use('/project', project);
app.use('/website', website);
app.use('/workspace', workspace);
app.use('/bliss', bliss);
app.use('/hosted', hosted);
app.use('/reference', reference);

/**
 * Returns the current user's session.
 *
 * @name Session
 * @route {GET} /session
 */
app.get('/session', function(req, res) {
  /*
  var token = tokens.createToken([req.session.user.username], env.secret_key);
  res.send({
    'token': token,
    'email': req.session.user.email,
    'username': req.session.user.username
  });
  */
  res.send({
    'token': 'foo',
    'email': 'bliss@blissui.com',
    'username': 'BlissUI'
  });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

/**
 * Used to renew SSL certs
 *
 * @name Well-Known
 * @route {GET} /.well-known/*
 */
app.use('/.well-known',
  express.static(path.join(__dirname, '..', '..', '.well-known'),
  {dotfiles:'allow'}));

// Environment specific servers
if(env.bliss_env === "development" || env.bliss_env === "test") {
  app.listen(env.port, function () {
    console.log(`Find your Bliss on port ${env.port}!`);
  });
} else if(env.bliss_env === "production") {
  // Redirect http traffic to https
  var http = express();
  http.get('*', function(req,res) {
    res.redirect('https://blissui.com'+req.url)
  });
  http.listen(env.port);

  const options = {
    key: fs.readFileSync(path.join(__dirname, '../../tls/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../tls/cert.pem'))
  };

  https.createServer(options, app).listen(env.port_ssl);
} else {
  console.log('Unable to start web server because BLISS_ENV not set.');
}
