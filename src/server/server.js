const path = require('path')
const https = require('https')
const fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authorization = require('./server-authorization.js')
const env = require('./env.js')
const ws = require('../compilers/core/workspace.js')
const bliss = require('./routes/bliss.js')
const compiler = require('./routes/compiler.js')
const project = require('./routes/project.js')
const user = require('./routes/user.js')
const website = require('./routes/website.js')
const workspace = require('./routes/workspace.js')
const hosted = require('./routes/hosted.js')
const tokens = require('./core/tokens.js')

app.use(bodyParser.json())

var secure = app.use(authorization({ protected_urls: ['/user',
                                                      '/compiler',
                                                      '/project',
                                                      '/website',
                                                      '/workspace',
                                                      '/session']}));

app.get('/', function(req, res) {
  res.redirect(`/hosted/${env.bliss_user}/website/`);
});

app.use('/user', user);
app.use('/compiler', compiler);
app.use('/project', project);
app.use('/website', website);
app.use('/workspace', workspace);
app.use('/bliss', bliss);
app.use('/hosted', hosted);

app.get('/session', function(req, res) {
  var token = tokens.createToken([req.session.user.username], env.secret_key);
  res.send({ 'token': token });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Route to renew https
app.use('/.well-known',
  express.static(path.join(__dirname, '..', '..', '.well-known'),
  {dotfiles:'allow'}));

// Environment specific servers
if(env.bliss_env === "development") {
  app.listen(env.port, function () {
    console.log(`Find your Bliss on port ${env.port}!`);
  });
} else if(env.bliss_env === "production") {
  // Redirect http traffic to https
  var http = express();
  http.get('*', function(req,res) {
    res.redirect('https://blissui.com'+req.url)
  });
  http.listen(80);

  const options = {
    key: fs.readFileSync(path.join(__dirname, '../../tls/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../tls/cert.pem'))
  };

  https.createServer(options, app).listen(env.port);
} else {
  console.log('Unable to start web server because BLISS_ENV not set.');
}