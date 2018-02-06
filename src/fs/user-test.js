const expect = require('chai').expect
const fs = require('fs-extra')
const path = require('path')
const env = require('../server/env.js')
const session = require('../server/session.js')
const user = require('./user.js')

describe('user', function() {
  after(function() {
    var dir = path.join(env.workspace, session.user.username)
    fs.removeSync(dir)
  });

  describe('invoked', function() {
    it('should create user if not exists', function () {
      var dir = path.join(env.workspace, session.user.username)
      expect(fs.existsSync(dir)).to.equal(false)
      var u = user(env, session)
      expect(fs.existsSync(dir)).to.equal(true)
    });
  });
});
