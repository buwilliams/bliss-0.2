const path = require('path');
const fs = require('fs');
const deps = require('../core/dependencies.js');
const file = require('../core/file.js');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const env = require('./env.js');
const bliss = require('./server/bliss.js');
const compiler = require('./server/compiler.js');
const project = require('./server/project.js');
const user = require('./server/user.js');
const website = require('./server/website.js');
const workspace = require('./server/workspace.js');

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.redirect('/website/bliss_ui_website.html');
});

app.use('/user', user);
app.use('/compiler', compiler);
app.use('/project', project);
app.use('/website', website);
app.use('/workspace', workspace);
app.use('/bliss', bliss);

app.listen(env.port, function () {
  console.log(`Find your Bliss on port ${env.port}!`);
});
