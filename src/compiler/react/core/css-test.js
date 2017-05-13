const _ = require('lodash');
const css = require('./css.js');
const project = require('./project.js');

describe('css', function() {
  describe('isVariable', function() {
    it('returns false doesn\t begin with dollar sign', function() {
      expect(css.isVariable('foo')).toEqual(false);
    });

    it('return false contains dollar signs', function() {
      expect(css.isVariable('fo$o$')).toEqual(false);
    });

    it('return true begins with dollar signs', function() {
      expect(css.isVariable('$foo')).toEqual(true);
    });

    it('returns false begins with dollar signs but no length', function() {
      expect(css.isVariable('$')).toEqual(false);
    });
  });

  it('should read project json', function() {
    expect(project.css[0].selector).toEqual("body");
    expect(project.css[0].properties[0].name).toEqual("font-family");
  });

  describe('getVarFromValue', function() {
    it('returns foo', function() {
      expect(css.getVarFromValue('$foo')).toEqual('foo');
    });

    it('returns empty string', function() {
      expect(css.getVarFromValue('$')).toEqual('');
    });

    it('returns empty string when given an empty string', function() {
      expect(css.getVarFromValue('')).toEqual('');
    });
  });

  it('standard css rule', function() {
    var cssRule = project.css[0].properties[0];
    var expected = "font-family: courier;";
    expect(css.getStandardRule(cssRule)).toEqual(expected);
  });

  it('css rule with variable', function() {
    var cssRule = project.css[0].properties[2];
    var expected = "background-color: #fff;";
    expect(css.getVariableRule(cssRule, project.cssVars)).toEqual(expected);
  });

  it('handle missing data on standard css rules', function() {
    var cssRule = { name: '', value: '' };
    var expected = "";
    expect(css.getStandardRule(cssRule)).toEqual(expected);
  });

  it('handle missing variable in css rules', function() {
    var cssRule = { name: 'background-color', value: '#fff', variable: 'background' };
    var expected = "";
    expect(css.getVariableRule(cssRule, [])).toEqual(expected);
  });

  it('standard css rule from generic fn', function() {
    var cssRule = project.css[0].properties[0];
    var expected = "font-family: courier;";
    expect(css.getRule(cssRule, project.cssVars)).toEqual(expected);
  });

  it('variable css rule from generic fn', function() {
    var cssRule = project.css[0].properties[2];
    var expected = "background-color: #fff;";
    expect(css.getRule(cssRule, project.cssVars)).toEqual(expected);
  });

  it('should return a list of strings', function() {
    var cssRules = project.css[0].properties;
    var expected = ['font-family: courier;',
                    'font-size: 12px;',
                    'background-color: #fff;'];
    expect(css.getRules(cssRules, project.cssVars)).toEqual(expected);
  });

  it('should return the selector', function() {
    var selector = project.css[0].selector;
    var expected = 'body';
    expect(css.getSelector(null, selector)).toEqual(expected);
  });

  it('merge selector and rules', function() {
    var cssDef = project.css[0];
    var expected = ['body {',
                    '  font-family: courier;',
                    '  font-size: 12px;',
                    '  background-color: #fff;',
                    "}\n\n"];
    expect(css.getCssDef(null, cssDef, project.cssVars)).toEqual(expected);
  });

  it('merge css def to string', function() {
    var cssDef = project.css[0];
    var expected = "body {\n" +
                   "  font-family: courier;\n" +
                   "  font-size: 12px;\n" +
                   "  background-color: #fff;\n" +
                   "}";
    var defStr = css.cssDefToStr(null, cssDef, project.cssVars);
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
    expect(css.getCss(null, project.css, project.cssVars)).toEqual(expected);
  });
});
