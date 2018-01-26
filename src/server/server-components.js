const path = require('path');
const express = require('express');
const app = express();

app.use('node_modules',
  express.static(
    path.join(__dirname, '..', '..', 'node_modules')
  )
)

app.use('/',
  express.static(
    path.join(__dirname, '..', 'workspaces', 'blissui', 'bliss', 'components')
  )
)

app.listen(3001, function () {
  console.log(`Started components server http://localhost:3001`);
});
