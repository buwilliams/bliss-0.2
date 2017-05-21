var app = {};

app.stateQueue = [];
app.stateProcessing = false;
app.setState = function(fn, callback) {
  app.stateQueue.push({ fn: fn, callback: callback });
  var _process = function() {
    app.stateProcessing = true;
    var _item = app.stateQueue.shift();
    _item.fn();
    // TODO: render the app
    if(typeof _item.callback !== "undefined") _item.callback();
    if(app.stateQueue.length === 0) {
      app.stateProcessing = false;
    } else { _process(); }
  };
  if(!app.stateProcessing) _process();
};

app.stack = function(fn) { fn(); };

module.exports = app;
