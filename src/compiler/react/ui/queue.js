module.exports = {
  queue: [],
  processing: false,
  process: function(fn, callback) {
    var that = this;
    this.queue.push({ fn: fn, callback: callback });

    var _process = function() {
      that.processing = true;
      // pull item off the queue
      var _item = that.queue.shift();

      // run the method
      _item.fn();

      // render the app
      // console.log('rendering');

      // invoke callback
      if(typeof _item.callback !== "undefined") _item.callback();

      if(that.queue.length === 0) {
        that.processing = false;
      } else {
        _process();
      }
    };

    if(!this.processing) _process();
  },

  oldProcess: function(fn) {
    fn();
  }
}
