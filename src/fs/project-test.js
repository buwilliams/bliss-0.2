const chai = require('chai')
const expect = chai.expect
const assertArrays = require('chai-arrays')
const fs = require('fs-extra')
const path = require('path')
const env = require('../server/env.js')
const session = require('../server/session.js')
const user = require('./user.js')
const proj = require('./project.js')

describe('project', function() {
  after(function() {
    fs.removeSync(path.join(env.workspace, session.user.username))
  });

  it('should return new project when none passed in', function() {
    var project = user(env, session)
      .createUser()
      .workspace('test')
      .createWorkspace()
      .project()
    expect(project.filename).to.equal('new_project.json')
  })

  it('should use name if projectJson passed in', function() {
    var project = user(env, session)
      .createUser()
      .workspace('test')
      .createWorkspace()
      .project({ name: 'Foo Man Choo' })
    expect(project.filename).to.equal('foo_man_choo.json')
  })

  it('should save a new project', function() {
    var project = user(env, session)
      .createUser()
      .workspace('test')
      .createWorkspace()
      .project({ name: 'testproj' })
      .saveProject()

    expect(project.listProjects())
      .to.be.containing('testproj.json')
  })

  it('should load existing project', function() {
    user(env, session)
      .createUser()
      .workspace('test')
      .createWorkspace()
      .project({ name: 'testproj' })
      .saveProject()

    var project = user(env, session)
      .createUser()
      .workspace('test')
      .createWorkspace()
      .project({ name: 'testproj2' })
      .saveProject()

    expect(project.listProjects())
      .to.be.containing('testproj.json')

    expect(project.listProjects())
      .to.be.containing('testproj2.json')

    project.loadProject('testproj.json')

    expect(project.projectJson.name).to.equal('testproj')
  })

  it('should delete existing project', function() {
    var project = user(env, session)
      .createUser()
      .workspace('test')
      .createWorkspace()
      .project({ name: 'testproj' })
      .saveProject()

    expect(project.listProjects())
      .to.be.containing('testproj.json')

    project.deleteProject('testproj.json')

    expect(project.listProjects())
      .not.to.be.containing('testproj.json')
  })
})
