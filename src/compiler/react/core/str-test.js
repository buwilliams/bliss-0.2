
var js = require('./str.js');
var project = require('./project.js');

describe('str', function() {
  describe('getCamel', function() {
    it('supports single world', function() {
      expect(js.getCamel("bliss")).toEqual("bliss");
    });

    it('supports multiple words', function() {
      expect(js.getCamel("bliss is rad")).toEqual("blissIsRad");
    });

    it('supports funky characters', function() {
      expect(js.getCamel("!@#$%bliss_is_rad")).toEqual("blissIsRad");
    });

    it('supports strings that begin with numbers', function() {
      expect(js.getCamel("!@#$%43_bliss_is_rad")).toEqual("blissIsRad");
    });
  });
});
