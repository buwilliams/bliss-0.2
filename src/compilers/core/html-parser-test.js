const expect = require('chai').expect;
const htmlParser = require('./html-parser.js');

describe('htmlParser', function() {
  describe('parseFragment', function() {
    it('should parse simple hello, world div', function() {
      var html = "<div>hello, world</div>";
      var frag = htmlParser.parseFragment(html)

      expect(frag.childNodes[0].tagName).to.equal("div");
      expect(frag.childNodes[0].childNodes[0].value)
        .to.equal("hello, world");
    });
  });
});
