const expect = require('chai').expect
const request = require('request')
const server = require('../server.js')
const env = require('../env.js')
const session = require('../session.js')
const user = require('../../fs/user.js')

describe('workspace', function() {
  describe('list', function() {
    after(function() { user(env, session).deleteUser() })

    it('should return 200', function (done) {
      user(env, session).createUser().workspace('foo').createWorkspace()
      request.get('http://localhost:3000/workspace/list', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should return one workspace', function (done) {
      user(env, session).createUser().workspace('foo').createWorkspace()

      request.get('http://localhost:3000/workspace/list',
                  {"json":true},
                  function (err, res, body) {
        expect(body.workspaces.length).to.equal(1);
        done();
      });
    });

    it('should return the list of projects', function (done) {
      user(env, session)
        .createUser()
        .workspace('foo')
        .createWorkspace()
        .createFile('projects/foo.json', '{}')
        .createFile('projects/foo2.json', '{}')

      request.get('http://localhost:3000/workspace/list',
                  {"json":true},
                  function (err, res, body) {
        expect(body.workspaces[0].projects.length).to.equal(2);
        expect(body.workspaces[0].projects[0].name).to.equal('foo');
        done();
      });
    });
  });

  describe('new', function() {
    after(function() { user(env, session).deleteUser() })

    it('should require workspace name', function (done) {
      request.post('http://localhost:3000/workspace',
                  {"json":true},
                  function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should make new workspace', function (done) {
      request.post({
        'url': 'http://localhost:3000/workspace',
        'json': true,
        'body': { 'name': 'foo' }
      }, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should delete workspace', function (done) {
      user(env, session)
        .createUser()
        .workspace('foo')
        .createWorkspace()

      request.delete({
        'url': 'http://localhost:3000/workspace/foo',
        'json': true
      }, function (err, res, body) {
        expect(res.statusCode).to.equal(200)
        done()
      })
    })
  })
})
