module.exports = {
  hasKey: function(array, key, value) {
    for(var i=0; i < array.length; i++) {
      var item = array[i];
      if(item.hasOwnProperty(key)) {
        if(item[key] === value) return true;
      }
    }
    return false;
  },

  findObj: function(array, key, value) {
    for(var i=0; i < array.length; i++) {
      var item = array[i];
      if(item.hasOwnProperty(key)) {
        if(item[key] === value) return item;
      }
    }
    return null;
  },
};
