const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');
const env = require('../../server/env.js');
const session = require('../../server/session.js');
const user = require('../../fs/user.js');
const compress = require('./compress.js');

describe('compress', function() {
  describe('zip', function() {
    it('should zip directory and create zip file', function() {
      var u = user(env, session).createUser();
      var ws = u.workspace(env.bliss_test_user_ws).createWorkspace();
      var proj = ws.project().saveProject();

      var toFile = path.join(u.fullpath, 'workspace.zip');
      compress.zip(ws.fullpath, toFile);

      expect(fs.existsSync(toFile)).to.equal(true);

      const stats = fs.statSync(toFile);
      const fileSizeInBytes = stats.size
      console.log('file size', fileSizeInBytes);
    });
  });
})
