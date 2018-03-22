const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');
const env = require('../../server/env.js');
const session = require('../../server/session.js');
const user = require('../../fs/user.js');
const compress = require('./compress.js');

describe('compress', function() {
  describe('zip', function() {
    it('should zip directory and create zip file', async () => {
      var u = user(env, session).createUser();
      var ws = u.workspace(env.bliss_test_user_ws).createWorkspace();
      var proj = ws.project().saveProject();

      var toFile = path.join(u.fullpath, 'website.zip');
      await compress.zip(ws.fullpath, toFile);

      expect(fs.existsSync(toFile)).to.equal(true);

      var stats = fs.statSync(toFile);
      var fileSizeInBytes = stats.size

      expect(fileSizeInBytes).to.be.above(0);
    });
  });
})
