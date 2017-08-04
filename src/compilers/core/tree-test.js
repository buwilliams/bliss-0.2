const expect = require('chai').expect;
const tree = require('./tree.js');
const project = require('./project-json.js');

describe('tree', function() {
  describe('hasChild', function() {
    it('should return true', function() {
      var component = project.components["1"];
      expect(tree.hasChild(component)).to.equal(true);
    });

    it('should return false', function() {
      var component = project.components["2"];
      expect(tree.hasChild(component)).to.equal(false);
    })
  });

  describe('hasNext', function() {
    it('should return true', function() {
      var component = project.components["2"];
      expect(tree.hasNext(component)).to.equal(true);
    });

    it('should return false', function() {
      var component = project.components["3"];
      expect(tree.hasNext(component)).to.equal(false);
    });
  });

  describe('traverse', function() {
    it('should traverse 3 times on root node', function() {
      var inputFn = function() {
        var counter = 0;
        tree.traverse(project, project.rootId, function() {
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
        tree.traverse(project, "2", function() {
          counter++;
        });
        return counter;
      };
      var expected = 1;
      expect(inputFn()).to.equal(expected);
    });
  });
});
