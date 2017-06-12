const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(__dirname));

app.listen(3001, function () {
  console.log(`Express started http://localhost:3001`);
});
