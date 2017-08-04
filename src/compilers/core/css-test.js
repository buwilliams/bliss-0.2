const expect = require('chai').expect;
const _ = require('lodash');
const css = require('./css.js');
const project = require('./project-json.js');

describe('css', function() {
  describe('isVariable', function() {
    it('returns false doesn\t begin with dollar sign', function() {
      expect(css.isVariable('foo')).to.equal(false);
    });

    it('return false contains dollar signs', function() {
      expect(css.isVariable('fo$o$')).to.equal(false);
    });

    it('return true begins with dollar signs', function() {
      expect(css.isVariable('$foo')).to.equal(true);
    });

    it('returns false begins with dollar signs but no length', function() {
      expect(css.isVariable('$')).to.equal(false);
    });
  });

  it('should read project json', function() {
    expect(project.css[0].selector).to.equal("body");
    expect(project.css[0].properties[0].name).to.equal("font-family");
  });

  describe('getVarFromValue', function() {
    it('returns foo', function() {
      expect(css.getVarFromValue('$foo')).to.equal('foo');
    });

    it('returns empty string', function() {
      expect(css.getVarFromValue('$')).to.equal('');
    });

    it('returns empty string when given an empty string', function() {
      expect(css.getVarFromValue('')).to.equal('');
    });
  });

  it('standard css rule', function() {
    var cssRule = project.css[0].properties[0];
    var expected = "font-family: courier;";
    expect(css.getStandardRule(cssRule)).to.equal(expected);
  });

  it('css rule with variable', function() {
    var cssRule = project.css[0].properties[2];
    var expected = "background-color: #fff;";
    expect(css.getVariableRule(cssRule, project.cssVars)).to.equal(expected);
  });

  it('handle missing data on standard css rules', function() {
    var cssRule = { name: '', value: '' };
    var expected = "";
    expect(css.getStandardRule(cssRule)).to.equal(expected);
  });

  it('handle missing variable in css rules', function() {
    var cssRule = { name: 'background-color', value: '#fff', variable: 'background' };
    var expected = "";
    expect(css.getVariableRule(cssRule, [])).to.equal(expected);
  });

  it('standard css rule from generic fn', function() {
    var cssRule = project.css[0].properties[0];
    var expected = "font-family: courier;";
    expect(css.getRule(cssRule, project.cssVars)).to.equal(expected);
  });

  it('variable css rule from generic fn', function() {
    var cssRule = project.css[0].properties[2];
    var expected = "background-color: #fff;";
    expect(css.getRule(cssRule, project.cssVars)).to.equal(expected);
  });

  it('should return a list of strings', function() {
    var cssRules = project.css[0].properties;
    var expected = ['font-family: courier;',
                    'font-size: 12px;',
                    'background-color: #fff;'];
    expect(css.getRules(cssRules, project.cssVars)).to.eql(expected);
  });

  describe('getSelector', function() {
    it('should return the selector', function() {
      var selector = project.css[0].selector;
      var expected = 'body';
      expect(css.getSelector(null, selector)).to.equal(expected);
    });

    it('should return dynamic id', function() {
      var component = {
        "id": "5",
        "name": "my component",
        "attributes": []
      };
      var selector = "$id";
      var expected = "#myComponent_5";
      expect(css.getSelector(component, selector)).to.equal(expected);
    });

    it('should return user-defined id', function() {
      var component = {
        "id": "5",
        "name": "my component",
        "attributes": [
          {"name": "id", "value": "myComponent"}
        ]
      };
      var selector = "$id";
      var expected = "#myComponent";
      expect(css.getSelector(component, selector)).to.equal(expected);
    });

    it('should return dynamic id with additional data', function() {
      var component = {
        "id": "5",
        "name": "my component",
        "attributes": []
      };
      var selector = ".foo $id:hover";
      var expected = ".foo #myComponent_5:hover";
      expect(css.getSelector(component, selector)).to.equal(expected);
    });
  });

  it('merge selector and rules', function() {
    var cssDef = project.css[0];
    var expected = ['body {',
                    '  font-family: courier;',
                    '  font-size: 12px;',
                    '  background-color: #fff;',
                    "}\n\n"];
    expect(css.getCssDef(null, cssDef, project.cssVars)).to.eql(expected);
  });

  it('merge css def to string', function() {
    var cssDef = project.css[0];
    var expected = "body {\n" +
                   "  font-family: courier;\n" +
                   "  font-size: 12px;\n" +
                   "  background-color: #fff;\n" +
                   "}";
    var defStr = css.cssDefToStr(null, cssDef, project.cssVars);
    expect(defStr).to.equal(defStr);
  });

  it('get css', function() {
    var cssDef = project.css;
    var expected = "body {\n" +
                   "  font-family: courier;\n" +
                   "  font-size: 12px;\n" +
                   "  background-color: #fff;\n" +
                   "}\n" +
                   "\n" +
                   "a:hover {\n" +
                   "  background-color: #ccc;\n" +
                   "}\n\n";
    expect(css.getCss(null, project.css, project.cssVars)).to.equal(expected);
  });
});
