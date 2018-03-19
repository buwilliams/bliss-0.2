const expect = require('chai').expect;
const js = require('./js.js');
const projectJson = require('./project-json.js');

describe('js', function() {
  describe('aryToObj', function() {
    it('performs single conversion', function() {
      expect(js.aryToObj([{"name":"buddy", "value": "williams"}], "name", "value"))
        .to.have.property('buddy', 'williams');
    });
  });

  describe('namespace', function() {
    it('supports null', function() {
      expect(js.getNamespace(null)).to.equal("app.js");
    });

    it('supports null', function() {
      expect(js.getNamespace(undefined)).to.equal("app.js");
    });

    it('supports empty string', function() {
      expect(js.getNamespace('')).to.equal("app.js");
    });

    it('supports component names', function() {
      expect(js.getNamespace('foobar')).to.equal('app.methods["foobar"]');
    })
  });

  describe('functions', function() {
    it('should return function string', function() {
      var input = {
        "name": "someFn",
        "body": "function(){}"
      };
      var expected = "app.js['someFn'] = function(){}";
      expect(js.getFn(input)).to.equal(expected);
    });

    it('should return collection of function strings', function() {
      var proj = projectJson();
      var input = proj.js;
      var expected = 2;
      expect(js.getFns(input).length).to.equal(expected);
    });

    it('should return string', function() {
      var proj = projectJson();
      var input = proj.js;
      var expected = 2;
      expect(js.getFnsString(input).split("\n").length).to.equal(expected);
    });
  });
});
