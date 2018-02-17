const path = require('path')
const fs = require('fs-extra')
const env = require('../server/env.js')

module.exports = function(username, override) {
  var pub = {}

  override = (typeof(override) === 'boolean') ? override : false

  // throw an exception if there are any
  // special chars in username or if username
  // is empty or undefined
  if(typeof(username) !== 'string' || username === '') {
    throw('Username must be supplied.')
  }

  var allowedUsernameRegEx = RegExp('^[a-z0-9]+$');
  if(allowedUsernameRegEx.test(username) === false) {
    throw('Username format not allowed.')
  }

  // populate allowed dirs
  // a user can only write to their user
  // directory at the base
  // or to _shared and _hosted once
  // but only for their user directory
  var allowedDirs = []
  allowedDirs.push(path.normalize(path.join(env.workspace, username)))
  allowedDirs.push(path.normalize(path.join(env.workspace, '_deployed', username)))
  allowedDirs.push(path.normalize(path.join(env.workspace, '_shared')))

  var isAllowed = function(dir) {
    // support override functions
    if(override) {
      var overrideDir = path.normalize(env.workspace)
      dir = path.normalize(dir)
      if(dir.startsWith(overrideDir) === false) {
        throw('You do not have permission to access this directory.')
      }
      return
    }

    // if path goes outside an allowed path
    // then throw a security exception
    var pass = false
    dir = path.normalize(dir)

    allowedDirs.forEach(function(allowedDir) {
      if(dir.startsWith(allowedDir) === true) {
        pass = true
      }
    })

    if(pass === false) {
      throw('You do not have permission to access this directory.')
    }
  }

  pub.ensureDirSync = function(dir) {
    isAllowed(dir)
    return fs.ensureDirSync(dir)
  }

  pub.removeSync = function(dir) {
    isAllowed(dir)
    return fs.removeSync(dir)
  }

  pub.readdirSync = function(dir) {
    isAllowed(dir)
    return fs.readdirSync(dir)
  }

  pub.writeFileSync = function(dir, contents) {
    isAllowed(dir)
    return fs.writeFileSync(dir, contents)
  }

  pub.existsSync = function(dir) {
    isAllowed(dir)
    return fs.existsSync(dir)
  }

  pub.copySync = function(dirFrom, dirTo, options) {
    isAllowed(dirFrom)
    isAllowed(dirTo)
    return fs.copySync(dirFrom, dirTo, options)
  }

  pub.moveSync = function(dirFrom, dirTo, options) {
    isAllowed(dirFrom)
    isAllowed(dirTo)
    return fs.moveSync(dirFrom, dirTo, options)
  }

  return pub
}
