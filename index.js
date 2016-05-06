'use strict'

var parent = module.parent

// Remove require-again from cache so the parent context
// is recreated in every module that requires it
delete require.cache[module.id]

function requireAgain (path) {
  var sanitizedPath = removeDotsAndSlashes(path)
  var requiredModules = Object.keys(require.cache)
  var matches = requiredModules.filter(function (key) {
    var sanitizedKey = removeDotsAndSlashes(key)
    if (sanitizedKey.indexOf(sanitizedPath) > -1) {
      return key
    }
  })

  matches.forEach(function (match) {
    delete require.cache[match]
  })

  return parent.require(path)
}

function removeDotsAndSlashes (string) {
  return string.replace(/[.\/]/g, '')
}

module.exports = requireAgain
