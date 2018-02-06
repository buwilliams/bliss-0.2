const expect = require('chai').expect
const request = require('request')
const server = require('../server.js')
const ws = require('../../compilers/core/workspace.js')
const env = require('../env.js')
const session = require('../session.js')

/*
describe('workspace', function() {
  describe('list', function() {
    it('should return 200', function (done) {
      request.get('http://localhost:3000/workspace/list', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should return one workspace', function (done) {
      request.get('http://localhost:3000/workspace/list',
                  {"json":true},
                  function (err, res, body) {
        expect(body.workspaces.length).to.equal(1);
        done();
      });
    });

    it('should return the list of projects', function (done) {
      request.get('http://localhost:3000/workspace/list',
                  {"json":true},
                  function (err, res, body) {
        expect(body.workspaces[0].projects.length).to.equal(2);
        expect(body.workspaces[0].projects[0].name).to.equal('ghost.json');
        done();
      });
    });
  });

  describe('new', function() {
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
        'body': {
          'name': 'internal_test_ws'
        }
      }, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should delete workspace', function (done) {
      request.delete({
        'url': 'http://localhost:3000/workspace/internal_test_ws',
        'json': true
      }, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('rename', function() {
    it('should require workspace name', function (done) {
      request.post({
        'url': 'http://localhost:3000/workspace/rename',
        'json': true,
        'body': {
          'newName': 'some_new_name'
        }
      }, function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should require workspace newName', function (done) {
      request.post({
        'url': 'http://localhost:3000/workspace/rename',
        'json': true,
        'body': {
          'name': 'some_name'
        }
      }, function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        done();
      });
    });

    it('should rename workspace', function (done) {
      ws.newWs(env, session, 'internal_test_ws');

      request.post({
        'url': 'http://localhost:3000/workspace/rename',
        'json': true,
        'body': {
          'name': 'internal_test_ws',
          'newName': 'internal_test_ws_renamed'
        }
      }, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.name).to.equal('internal_test_ws_renamed');
        ws.deleteWs(env, session, 'internal_test_ws_renamed');
        expect(ws.list(env, session).length).to.equal(1);
        done();
      });

    });
  });

  describe('copy', function() {
    it('should return 400 if invalid toWs and fromWs params are missing', function(done) {
      request.post({
        'url': 'http://localhost:3000/workspace/copy',
        'json': true,
        'body': {}
      }, function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        done();
      });
    })

    it('should return 500 if toWs or fromWs path does not exist', function(done) {
      request.post({
        'url': 'http://localhost:3000/workspace/copy',
        'json': true,
        'body': {
          'fromWs': 'internal_test_ws',
          'toWs': 'internal_test_ws_copy'
        }
      }, function (err, res, body) {
        expect(res.statusCode).to.equal(500);
        done();
      });
    })

    it('should return 200', function(done) {
      var config = {
        'url': 'http://localhost:3000/workspace/copy',
        'json': true,
        'body': {
          'fromWs': env.bliss_test_user_ws,
          'toWs': `${env.bliss_test_user_ws}_copy`
        }
      }
      request.post(config, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        ws.deleteWs(env, session, config.body.toWs);
        done();
      });
    })
  })
});
*/
