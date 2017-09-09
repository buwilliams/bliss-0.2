const expect = require('chai').expect
const request = require('request')
const server = require('../server.js')
const ws = require('../../compilers/core/workspace.js')
const env = require('../env.js')
const session = require('../session.js')

describe('project', function() {
  describe('list', function() {
    it('should return 400 when missing params', function (done) {
      var config = {
        'url': 'http://localhost:3000/project/list',
        'json': true,
        'body': {}
      }
      request.get(config, function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        expect(body).to.equal('missing workspace param');
        done();
      });
    });

    it('should return 200 and list projects', function (done) {
      var config = {
        'url': 'http://localhost:3000/project/list',
        'json': true,
        'qs': {
          'workspace': 'bliss_test'
        }
      }

      request.get(config, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(body.projects).to.eql(['ghost','many_ghosts']);
        done();
      });
    });
  });
});
