const expect = require('chai').expect;
const tokens = require('./tokens.js');

describe('tokens', function() {
  describe('verifyToken', function() {
    it('should work for valid tokens', function() {
      var validToken = tokens.createToken(['hey'], 'secret');
      expect(tokens.verifyToken(validToken, 'secret')).to.equal(true);
    });

    it('should not verify tampered tokens', function() {
      var validToken = tokens.createToken(['hey'], 'secret');
      validToken = `a${validToken}`;
      expect(tokens.verifyToken(validToken, 'secret')).to.equal(false);
    });
  });
});
