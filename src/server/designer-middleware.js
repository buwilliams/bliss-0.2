const tokens = require('./core/tokens.js')

module.exports = function(req, res, next) {
  console.log('Designer', req.url)
  next()
}
