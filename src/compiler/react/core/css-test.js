var _ = require('lodash');
var css = require('./css.js');
var project = require('./project.js');

describe('css', function() {
  it('should read project json', function() {
    expect(project.css[0].selector).toEqual("body");
    expect(project.css[0].properties[0].name).toEqual("font-family");
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
    expect(css.getSelector(selector)).toEqual(expected);
  });

  it('merge selector and rules', function() {
    var cssDef = project.css[0];
    var expected = ['body {',
                    '  font-family: courier;',
                    '  font-size: 12px;',
                    '  background-color: #fff;',
                    "}\n\n"];
    expect(css.getCssDef(cssDef, project.cssVars)).toEqual(expected);
  });

  it('merge css def to string', function() {
    var cssDef = project.css[0];
    var expected = "body {\n" +
                   "  font-family: courier;\n" +
                   "  font-size: 12px;\n" +
                   "  background-color: #fff;\n" +
                   "}";
    var defStr = css.cssDefToStr(cssDef, project.cssVars);
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
    expect(css.getCss(project.css, project.cssVars)).toEqual(expected);
  });
});
