module.exports = {
  hasKey: function(array, key) {
    for(var i=0; i < array.length; i++) {
      var item = array[i];
      if(item.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  },

  findKey: function(array, key) {
    for(var i=0; i < array.length; i++) {
      var item = array[i];
      if(item.hasOwnProperty(key)) {
        return item;
      }
    }
    return null;
  },
};
