const expect = require('chai').expect
const fs = require('fs-extra')
const path = require('path')
const env = require('../server/env.js')
const session = require('../server/session.js')
const user = require('./user.js')
const workspace = require('./workspace.js')

/*
describe('workspace', function() {
  var user
  before(function() {
    user = user(env, session)
  })

  after(function() {
    var dir = path.join(env.workspace, session.user.username)
    fs.removeSync(dir)
  });

  it('should delete workspace', function () {
    var u = user(env, session)
    u.createWorkspace('test')
    u.createWorkspace('test2')
    expect(u.listWorkspaces().length).to.equal(2)
    u.deleteWorkspace('test')
    expect(u.listWorkspaces().length).to.equal(1)
    expect(u.listWorkspaces()[0]).to.equal('test2')
  });

  describe('init', function() {
    it('should create user if not exists', function () {
      var dir = path.join(env.workspace, session.user.username)
      expect(fs.existsSync(dir)).to.equal(false)
      var u = user(env, session)
      expect(fs.existsSync(dir)).to.equal(true)
    });
  });
});
*/
