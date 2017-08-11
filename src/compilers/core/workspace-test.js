const expect = require('chai').expect
const env = require('../../server/env.js');
const session = require('../../server/session.js');
const ws = require('./workspace.js');

describe('workspace', function() {
  describe('list', function() {
    it('should have one workspace', function () {
      var wsList = ws.list(env, session)
      expect(wsList.length).to.equal(1)
    });
  });

  describe('listProjects', function() {
    it('should returns the correct number of projects', function() {
      var wsList = ws.list(env, session)
      var projList = ws.listProjects(env, session, wsList[0].name)
      expect(projList.length).to.equal(2)
    });
  });

  describe('newWs & deleteWs', function() {
    it('should add and remove new workspace', function() {
      ws.newWs(env, session, 'new_ws')
      var wsList = ws.list(env, session)
      expect(wsList.length).to.equal(2)
      ws.deleteWs(env, session, 'new_ws')
      wsList = ws.list(env, session)
      expect(wsList.length).to.equal(1)
    });
  });

  describe('copyWs', function() {
  });
});
