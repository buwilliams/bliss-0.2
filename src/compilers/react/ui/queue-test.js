const expect = require('chai').expect;
const queue = require('./queue.js');

describe('queue', function() {
  // setState is a queue (not a stack) data structure
  it('should process the enture fn body of setState ' +
     'before processing the next fn body of setState', function() {
    var got = [];
    var expected = [1, 2, 3, 4, 5];
    queue.setState(function() {
      queue.setState(function() { got.push(2); });
      queue.setState(function() {
        queue.setState(function() { got.push(4); }, function() { got.push(5); });
        got.push(3);
      });
      got.push(1);
    });
    expect(got).to.eql(expected);
  });

  it('example of a stack data structure', function() {
    var got = [];
    var expected = [3, 2, 1];
    queue.stack(function() {
      queue.stack(function() {
        queue.stack(function() {
          got.push(3);
        });
        got.push(2);
      });
      got.push(1);
    });
    expect(got).to.eql(expected);
  });
})
