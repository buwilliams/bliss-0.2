const expect = require('chai').expect;
const tree = require('./tree.js');
const projectJson = require('./project-json.js');

describe('tree', function() {
  describe('hasChild', function() {
    it('should return true', function() {
      var component = projectJson().components["1"];
      expect(tree.hasChild(component)).to.equal(true);
    });

    it('should return false', function() {
      var component = projectJson().components["2"];
      expect(tree.hasChild(component)).to.equal(false);
    })
  });

  describe('hasNext', function() {
    it('should return true', function() {
      var component = projectJson().components["2"];
      expect(tree.hasNext(component)).to.equal(true);
    });

    it('should return false', function() {
      var component = projectJson().components["3"];
      expect(tree.hasNext(component)).to.equal(false);
    });
  });

  describe('traverse', function() {
    it('should traverse 3 times on root node', function() {
      var inputFn = function() {
        var counter = 0;
        var proj = projectJson();
        tree.traverse(proj, proj.rootId, function() {
          counter++;
        });
        return counter;
      };
      var expected = 3;
      expect(inputFn()).to.equal(expected);
    });

    it('should traverse 1 times on non-root node', function() {
      var inputFn = function() {
        var counter = 0;
        tree.traverse(projectJson(), "2", function() {
          counter++;
        });
        return counter;
      };
      var expected = 1;
      expect(inputFn()).to.equal(expected);
    });
  });

  describe('merge', function() {
    it('should sum nextIds together', function() {
      var source = projectJson();
      var dest = projectJson();
      var expected = dest.nextId + Object.keys(source.components).length
      var actual = tree.merge(source, dest);
      expect(actual.nextId).to.equal(expected);
    });

    it('should have the correct number of components', function() {
      var source = projectJson();
      var dest = projectJson();
      var expected = Object.keys(source.components).length + Object.keys(dest.components).length;
      var actual = Object.keys(tree.merge(source, dest).components).length;
      expect(actual).to.equal(expected);
    });
  });
});
