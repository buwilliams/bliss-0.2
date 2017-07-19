const path = require('path')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('./env.js');
const ws = require('../core/workspace.js');
const bliss = require('./routes/bliss.js');
const compiler = require('./routes/compiler.js');
const project = require('./routes/project.js');
const user = require('./routes/user.js');
const website = require('./routes/website.js');
const workspace = require('./routes/workspace.js');
const hosted = require('./routes/hosted.js');

/* start: Firebase Service Account */
const admin = require("firebase-admin");
const fbJson = path.join(__dirname, '..', '..', '..', 'blissui-firebase.json')
const serviceAccount = require(fbJson);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://blissui-f09be.firebaseio.com'
});
/* end: Firebase Service Account */

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.redirect('/hosted/blissui/website/');
});

app.use('/user', user);
app.use('/compiler', compiler);
app.use('/project', project);
app.use('/website', website);
app.use('/workspace', workspace);
app.use('/bliss', bliss);
app.use('/hosted', hosted);

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.listen(env.port, function () {
  console.log(`Find your Bliss on port ${env.port}!`);
});
