const chai = require('chai')
const expect = chai.expect
const assertArrays = require('chai-arrays')
const fs = require('fs-extra')
const path = require('path')
const env = require('../server/env.js')
const session = require('../server/session.js')
const user = require('./user.js')
chai.use(assertArrays)

describe('user', function() {
  after(function() {
    var dir = path.join(env.workspace, session.user.username)
    fs.removeSync(dir)
  });

  it('should create user', function () {
    var dir = path.join(env.workspace, session.user.username)
    expect(fs.existsSync(dir)).to.equal(false)
    var u = user(env, session).createUser()
    expect(fs.existsSync(dir)).to.equal(true)
  });

  it('should list users', function () {
    var u = user(env, session)
    u.createUser()
    expect(u.listUsers()).to.be.containing(u.name)
  })

  it('should delete user', function () {
    var u = user(env, session)
    u.createUser()
    u.deleteUser()
    expect(u.listUsers()).not.to.be.containing(u.name)
  });

  it('should give back the correct path', function () {
    expect(user(env, session).fullpath).to.equal(
      path.join(env.workspace, session.user.username))
  });
});
