var js = require('./js.js');
var project = require('./project-json.js');

describe('js', function() {
  describe('aryToObj', function() {
    it('performs single conversion', function() {
      expect(js.aryToObj([{"name":"buddy", "value": "williams"}], "name", "value"))
        .toEqual({"buddy":"williams"});
    });
  });

  describe('namespace', function() {
    it('supports null', function() {
      expect(js.getNamespace(null)).toEqual("app.js");
    });

    it('supports null', function() {
      expect(js.getNamespace(undefined)).toEqual("app.js");
    });

    it('supports empty string', function() {
      expect(js.getNamespace('')).toEqual("app.js");
    });

    it('supports component names', function() {
      expect(js.getNamespace('foobar')).toEqual('app.methods["foobar"]');
    })
  });

  describe('functions', function() {
    it('should return function string', function() {
      var input = {
        "name": "someFn",
        "body": "function(){}"
      };
      var expected = "app.js.someFn = function(){}";
      expect(js.getFn(input)).toEqual(expected);
    });

    it('should return collection of function strings', function() {
      var input = project.js;
      var expected = 2;
      expect(js.getFns(input).length).toEqual(expected);
    });

    it('should return string', function() {
      var input = project.js;
      var expected = 2;
      expect(js.getFnsString(input).split("\n").length).toEqual(expected);
    });
  });
});
