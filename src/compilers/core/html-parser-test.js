const expect = require('chai').expect;
const htmlParser = require('./html-parser.js');
const projectJson = require('./project-json.js');

describe('htmlParser', function() {
  describe('parseFragment()', function() {
    it('should parse simple hello, world div', function() {
      var html = `<div id="foo">hello, world</div>`;
      var frag = htmlParser.parseFragment(html)

      expect(frag.childNodes[0].tagName).to.equal("div");
      expect(frag.childNodes[0].childNodes[0].value)
        .to.equal("hello, world");
    });
  });

  describe('toProject()', function() {
    it('should append simple hello, world div to projectJson', function() {
      var html = '<div class="btn btn-class" data-foo="bar">hello, world</div>';
      var proj = htmlParser.toProject(html, projectJson(), "3");
      var comp = proj.components[proj.nextId - 1];
      expect(proj.nextId).to.equal(5);
      expect(comp.name).to.equal("div");
      expect(comp.attributes[0].name).to.equal("class");
      expect(comp.attributes[0].value).to.equal("btn btn-class");
      expect(comp.attributes[1].name).to.equal("data-foo");
      expect(comp.attributes[1].value).to.equal("bar");
      expect(comp.text).to.equal("hello, world");
    });

    it('should append deep html', function() {
      var html = `<div class="btn btn-class" data-foo="bar">
                    hello, world
                    <div class="one">
                      <div class="two"></div>
                    </div>
                    <div class="three"></div>
                  </div>`;

      var proj = projectJson();
      var startingId = proj.nextId;
      proj = htmlParser.toProject(html, proj, "3");
      var comp = proj.components[startingId];

      expect(proj.nextId).to.equal(startingId + 4);
      expect(comp.name).to.equal("div");
      expect(comp.attributes[0].name).to.equal("class");
      expect(comp.attributes[0].value).to.equal("btn btn-class");
      expect(comp.attributes[1].name).to.equal("data-foo");
      expect(comp.attributes[1].value).to.equal("bar");
      expect(comp.text).to.equal("hello, world");

      var e1 = proj.components[startingId]; // container
      var e2 = proj.components[startingId + 1]; // one
      var e3 = proj.components[startingId + 2]; // two
      var e4 = proj.components[startingId + 3]; // three

      // Check e2 refs
      expect(e2.parent).to.equal(e1.id);
      expect(e2.next).to.equal(e4.id);
      expect(e2.previous).to.equal(null);
      expect(e2.child).to.equal(e3.id);

    });
  });
});
