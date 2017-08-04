const expect = require('chai').expect;
const js = require('./str.js');
const project = require('./project-json.js');

describe('str', function() {
  describe('getCamel', function() {
    it('supports single world', function() {
      expect(js.getCamel("bliss")).to.equal("bliss");
    });

    it('supports multiple words', function() {
      expect(js.getCamel("bliss is rad")).to.equal("blissIsRad");
    });

    it('supports funky characters', function() {
      expect(js.getCamel("!@#$%bliss_is_rad")).to.equal("blissIsRad");
    });

    it('supports strings that begin with numbers', function() {
      expect(js.getCamel("!@#$%43_bliss_is_rad")).to.equal("blissIsRad");
    });
  });

  describe('encode', function() {
    it('encodes email address', function() {
      var email = "buddywilliams@gmail.com"
      var expected = "bfe742f9a6616d734067da752eac6d"
      expect(js.encode(email)).to.equal(expected);
    });
  });

  describe('decode', function() {
    it('decodes email address', function() {
      var encoded = "bfe742f9a6616d734067da752eac6d"
      var expected = "buddywilliams@gmail.com"
      expect(js.decode(encoded)).to.equal(expected);
    });
  });
});
