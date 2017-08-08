const expect = require('chai').expect
const request = require('request')
const server = require('../server.js')

describe('workspace', function() {
  describe('listWorkspaces', function() {
    it('should return 400', function (done) {
      request.get('http://localhost:3000/workspace/list', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('success').to.equal(true);
        done();
      });
    });
  });
});
