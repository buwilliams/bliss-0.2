const expect = require('chai').expect
const request = require('request')
const server = require('../server.js')

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
});
