const expect = require('chai').expect;
const htmlParser = require('./html-parser.js');
const projectJson = require('./project-json.js');

describe('htmlParser', function() {
  describe('parseFragment()', function() {
    it('should parse simple hello, world div', function() {
      var html = `<div id="foo">hello, world</div>`;
      var frag = htmlParser.parseFragment(html)

      console.log(frag.childNodes[0].attrs);

      expect(frag.childNodes[0].tagName).to.equal("div");
      expect(frag.childNodes[0].childNodes[0].value)
        .to.equal("hello, world");
    });
  });

  describe('toProject()', function() {
    // create component:
    //   - fill out properties
    //   - fill out attributes
    //   - text if exists
    it('should append simple hello, world div to projectJson', function() {
      var html = '<div>hello, world</div>';
      var proj = htmlParser.toProject(html, projectJson, "3");
      expect(proj.nextId).to.equal(5);
    });
  });
});
