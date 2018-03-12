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
    fs.removeSync(path.join(env.workspace, '_deployed', session.user.username))
    fs.removeSync(path.join(env.workspace, '_shared', session.user.username))
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

  it('should create a file and list it', function () {
    var u = user(env, session).createUser()
    var ws = workspace(u, 'test')
    expect(ws.listFiles('projects/testdir')).not.to.be.containing('test.txt')
    ws.createWorkspace()
    ws.createFile('projects/testdir/test.txt')
    expect(ws.listFiles('projects/testdir')).to.be.containing('test.txt')
  });

  it('should delete a file', function () {
    var u = user(env, session).createUser()
    var ws = workspace(u, 'test')
    ws.createWorkspace()
    ws.createFile('projects/testdir/test.txt')
    expect(ws.listFiles('projects/testdir')).to.be.containing('test.txt')
    ws.deleteFile('projects/testdir/test.txt')
    expect(ws.listFiles('projects/testdir')).not.to.be.containing('test.txt')
  });

  it('should list files that are created', function () {
    var u = user(env, session).createUser()
    var ws = workspace(u, 'test')
    ws.createWorkspace()
    ws.createFile('projects/testdir/test.txt')
    ws.createFile('projects/testdir/test2.txt')
    ws.createFile('projects/testdir/test3.txt')
    expect(ws.listFiles('projects/testdir').length).to.equal(3)
    expect(ws.listFiles('projects/testdir')).to.be.containing('test.txt')
    expect(ws.listFiles('projects/testdir')).to.be.containing('test2.txt')
    expect(ws.listFiles('projects/testdir')).to.be.containing('test3.txt')
  });

  it('should deploy workspace', function () {
    var u = user(env, session).createUser()
    var ws = workspace(u, 'test')
    ws.createWorkspace()
    ws.createFile('projects/test.txt')
    expect(ws.listDeployed()).not.to.be.containing(`${u.name}/${ws.name}`)
    ws.deployWorkspace()
    expect(ws.listDeployed()).to.be.containing(`${u.name}/${ws.name}`)
  });

  it('should share workspace', function () {
    var u = user(env, session).createUser()
    var ws = workspace(u, 'test')
    ws.createWorkspace()
    ws.createFile('projects/test.txt')
    expect(ws.listShared()).not.to.be.containing(`${u.name}/${ws.name}`)
    ws.shareWorkspace()
    expect(ws.listShared()).to.be.containing(`${u.name}/${ws.name}`)
  });

  it('should import workspace as component', function () {
    var u = user(env, session).createUser()
    var ws = workspace(u, 'test')
    ws.createWorkspace()
    ws.createFile('projects/test.txt')
    ws.shareWorkspace()

    var shared = ws.listShared()
    var fromUser = shared[0].split('/')[0]
    var fromWorkspace = shared[0].split('/')[1]

    var ws2 = workspace(u, 'test2')
    ws2.createWorkspace()
    ws2.importWorkspace(fromUser, fromWorkspace)

    expect(ws2.listComponents()).to.be.containing(fromWorkspace)
  });

  it('should delete component', function () {
    var u = user(env, session).createUser()
    var ws = workspace(u, 'test')
    ws.createWorkspace()
    ws.createFile('projects/test.txt')
    ws.shareWorkspace()

    var shared = ws.listShared()
    var fromUser = shared[0].split('/')[0]
    var fromWorkspace = shared[0].split('/')[1]

    var ws2 = workspace(u, 'test2')
    ws2.createWorkspace()
    ws2.importWorkspace(fromUser, fromWorkspace)
    expect(ws2.listComponents()).to.be.containing(fromWorkspace)
    
    ws2.deleteComponent(fromWorkspace)
    expect(ws2.listComponents()).not.to.be.containing(fromWorkspace)
  });
});
