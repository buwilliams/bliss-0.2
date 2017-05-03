var path = require('path');
var express = require('express');
var app = express();

app.use(express.static('src'));
app.use('/node_modules', express.static('node_modules'))

app.listen(3003, function () {
  console.log('Listening on port 3003!')
})
