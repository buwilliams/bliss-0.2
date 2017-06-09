const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('./env.js');
const bliss = require('./routes/bliss.js');
const compiler = require('./routes/compiler.js');
const project = require('./routes/project.js');
const user = require('./routes/user.js');
const website = require('./routes/website.js');
const workspace = require('./routes/workspace.js');

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
