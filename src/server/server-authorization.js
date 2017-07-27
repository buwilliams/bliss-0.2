const path = require('path')
const _ = require('lodash')
const admin = require("firebase-admin");
const fbJson = path.join(__dirname, '..', '..', 'blissui-firebase.json')
const serviceAccount = require(fbJson)
const str = require('../compilers/core/str.js')
const staticSession = require('./session.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://blissui-f09be.firebaseio.com'
});

module.exports = function(options) {
  return function(req, res, next) {
    var matches = _.reduce(options.protected_urls, function(result, item) {
      if(result) return result;
      if(req.url.startsWith(item)) return true;
      return false;
    }, false);

    if(matches) {
      //console.log('[secured] ', req.url)
      var user_token = req.get('X-User-Token');
      //console.log('[secured] ', user_token, req.url);
      if(!user_token) {
        console.log('[secured]', 'No token supplied in request');
        res.status(401).send('No token supplied in request');
        return
      }

      admin.auth().verifyIdToken(user_token)
      .then(function(decodedToken) {
        var uid = decodedToken.uid;
        console.log('[secured]', 'uid:', uid, 'url:', req.url);
        admin.auth().getUser(uid)
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          userRecord = userRecord.toJSON()

          // update the request with info
          req.session = {
            user: {
              username: str.token(userRecord.email),
              workspace: staticSession.user.workspace
            }
          };

          //console.log('username', req.session.user.username);

          //console.log('bliss session', req.blissSession)

          next(); // user verified
        })
        .catch(function(error) {
          console.log('[secured]', 'Error fetching user data:', error, req.url);
          res.status(401).send('error retrieving user data');
          return
        });
      }).catch(function(error) {
        console.log('[secured]', 'Invalid Token:', error, req.url);
        res.status(401).send('invalid user token');
        return
      });
    } else {
      //console.log('[public] ', req.url)
      next();
    }
  }
}