const expect = require('chai').expect
const request = require('request')
const server = require('../server.js')
const fs = require('fs-extra')
const path = require('path')
const env = require('../env.js')
const session = require('../session.js')
const user = require('../../fs/user.js')
const projectJson = require('../../compilers/core/project-json.js');

describe('project', function() {
  after(function() {
    fs.removeSync(path.join(env.workspace, session.user.username))
  });

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
        'qs': { 'workspace': 'test' }
      }

      var project = user(env, session)
        .createUser()
        .workspace('test')
        .createWorkspace()
        .project()
        .saveProject()

      request.get(config, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(body.projects).to.eql(['new_project']);
        done();
      });
    });
  });

  describe('load', function() {
    it('should return 400 when missing workspace param', function (done) {
      var config = {
        'url': 'http://localhost:3000/project/load',
        'json': true,
        'qs': { 'name': 'test' }
      }
      request.get(config, function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        expect(body).to.equal('missing workspace param');
        done();
      });
    });

    it('should return 400 when missing name param', function (done) {
      var config = {
        'url': 'http://localhost:3000/project/load',
        'json': true,
        'qs': { 'workspace': 'test' }
      }
      request.get(config, function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        expect(body).to.equal('missing name param');
        done();
      });
    });

    it('should return existing projectJson', function (done) {
      var config = {
        'url': 'http://localhost:3000/project/load',
        'json': true,
        'qs': { 'workspace': 'test', 'name': 'test', 'ignorePackages': true }
      }

      var proj = projectJson();
      var project = user(env, session)
        .createUser()
        .workspace('test')
        .createWorkspace()
        .project(proj)
        .saveProject()

      request.get(config, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(body.project.name).to.eql('test');
        done();
      });
    });
  });

  describe('save', function() {
    it('should return 400 when missing workspace param', function (done) {
      var config = {
        'url': 'http://localhost:3000/project/save',
        'json': true,
        'qs': {}
      }
      request.post(config, function (err, res, body) {
        expect(res.statusCode).to.equal(400);
        expect(body).to.equal('missing workspace param');
        done();
      });
    });

    it('should save project json', function (done) {
      var ws = user(env, session)
        .createUser()
        .workspace('test')
        .createWorkspace()

      var proj = projectJson();
      var project = ws.project(proj).saveProject()

      var newTestProjectJson = Object.assign({}, proj)
      newTestProjectJson.name = 'test2'

      var config = {
        'url': 'http://localhost:3000/project/save',
        'json': true,
        'qs': { 'workspace': 'test' },
        'body': newTestProjectJson
      }

      request.post(config, function (err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(
          fs.existsSync(path.join(ws.fullpath, 'projects/test2.json'))
        ).to.equal(true);
        done();
      });
    });
  });
});
