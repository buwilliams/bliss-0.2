const expect = require('chai').expect
const path = require('path')
const fs = require('fs-extra')
const env = require('../../server/env.js');
const session = require('../../server/session.js');
const ws = require('./workspace.js');

/*
describe('workspace', function() {
  after(function() {
    var dir = path.join(env.workspace, session.user.username)
    fs.removeSync(dir)
  });

  describe('list', function() {
    it('should have one workspace', function () {
      ws.newWs(env, session, 'ghost')
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
    it('should throw error when fromUser does not exist', function() {
      expect(function() {
        ws.copyWs(env,
                  'bogusFromUser',
                  'bogusFromWs',
                  'bogusToUser',
                  'bogusToWs')
      }).to.throw('fromUser does not exist')
    })

    it('should throw error when fromWs does not exist', function() {
      expect(function() {
        ws.copyWs(env,
                  env.bliss_test_user,
                  'bogusFromWs',
                  'bogusToUser',
                  'bogusToWs')
      }).to.throw('fromWs does not exist')
    })

    it('should throw error when toUser does not exist', function() {
      expect(function() {
        ws.copyWs(env,
                  env.bliss_test_user,
                  env.bliss_test_user_ws,
                  'bogusToUser',
                  'bogusToWs')
      }).to.throw('toUser does not exist')
    })

    it('should copy a workspace if one does not exist', function() {
      expect(ws.list(env, session).length).to.equal(1)
      ws.copyWs(env,
                env.bliss_test_user,
                env.bliss_test_user_ws,
                env.bliss_test_user,
                `${env.bliss_test_user_ws}_copy`)
      expect(ws.list(env, session).length).to.equal(2)
      ws.deleteWs(env, session, `${env.bliss_test_user_ws}_copy`)
      expect(ws.list(env, session).length).to.equal(1)
    })
  });
});
*/
