const queue = require('./queue.js');

describe('queue', function() {
  it('should display single log statement', function() {
    var got = [];
    var expected = [1, 2, 3, 4, 5];
    queue.process(function() {
      queue.process(function() { got.push(2); });
      queue.process(function() {
        queue.process(function() { got.push(4); }, function() { got.push(5); });
        got.push(3);
      });
      got.push(1);
    });
    expect(got).toEqual(expected);
  });

  it('should display single log statement', function() {
    var got = [];
    var expected = [3, 2, 1];
    queue.oldProcess(function() {
      queue.oldProcess(function() {
        queue.oldProcess(function() {
          got.push(3);
        });
        got.push(2);
      });
      got.push(1);
    });
    expect(got).toEqual(expected);
  });
})
