// createToken(parts[], expiriesInDays, secretKey)
// verifyToken(parts[], secretKey)
// pass in bits of string/numerical data
// the lib transform the data into a token
// creating a token:
//   data + timeout + secretkey -> dataparts_timeout_token
// reversing process:
//   data + timeout + secretkey = token && timeout isn't past
// timeout = yyyy/mm/dd/24hour

const moment = require('moment-timezone')
const metrohash64 = require('metrohash').metrohash64;

module.exports = {
  hoursTokenExpires: 24,
  dtFormat: 'YYYYMMDDHHmm', // https://momentjs.com/docs/#/displaying/format/

  getTimestamp: function() {
    var currentDT = moment().tz('America/New_York');
    var adjustedDT = currentDT.add(this.hoursTokenExpires, 'h');
    return adjustedDT.format(this.dtFormat);
  },

  isTimestampFresh: function(stringDT) {
    var tokenDT = moment(stringDT, this.dtFormat);
    var currentDT = moment().tz('America/New_York');
    return currentDT.isBefore(tokenDT);
  },

  createToken: function(parts, secretKey) {
    var ts = this.getTimestamp();
    var p = parts.join('_') + `_${ts}`;
    var secretToken = metrohash64(`${p}_${secretKey}`);
    return `${p}_${secretToken}`;
  },

  verifyToken: function(token, secretKey) {
    var parts = token.split('_');
    var p = parts.splice(0, parts.length - 2).join('_');
    var ts = parts[parts.length - 2];
    var hash = parts[parts.length - 1];

    // verify ts
    if(!this.isTimestampFresh(ts)) return false;

    // verify hash
    var secretToken = metrohash64(`${p}_${ts}_${secretKey}`);
    if(secretToken !== hash) return false;

    return true;
  },

  getTokenParts: function(token) {
    return token.split('_').slice(0, -2);
  }
}
