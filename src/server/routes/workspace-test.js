const expect = require('chai').expect
const request = require('request')
const server = require('../server.js')

describe('workspace', function() {
  describe('listWorkspaces', function() {
    it('should return 200', function (done) {
      request.get('http://localhost:3000/workspace/list', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should return six workspaces', function (done) {
      request.get('http://localhost:3000/workspace/list',
                  {"json":true},
                  function (err, res, body) {
        expect(body.workspaces.length).to.equal(6);
        done();
      });
    });
  });
});
