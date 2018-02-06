const chai = require('chai')
const expect = chai.expect
const assertArrays = require('chai-arrays')
const fs = require('fs-extra')
const path = require('path')
const env = require('../server/env.js')
const session = require('../server/session.js')
const user = require('./user.js')
const workspace = require('./workspace.js')

describe('workspace', function() {
  after(function() {
    fs.removeSync(path.join(env.workspace, session.user.username))
  });

  it('should list and create workspace', function() {
    var u = user(env, session).createUser()
    var ws = workspace(u, 'test')
    expect(ws.listWorkspaces().length).to.equal(0)
    ws.createWorkspace()
    expect(ws.listWorkspaces()).to.be.containing(ws.name)
  })

  it('should delete workspace', function () {
    var u = user(env, session).createUser()
    var ws = workspace(u, 'test')
    ws.createWorkspace()
    expect(ws.listWorkspaces()).to.be.containing(ws.name)
    ws.deleteWorkspace()
    expect(ws.listWorkspaces()).not.to.be.containing(ws.name)
  });
});
