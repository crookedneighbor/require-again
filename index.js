'use strict'

var path = require('path')
var parent = module.parent

// Remove require-again from cache so the parent context
// is recreated in every module that requires it
delete require.cache[module.id]

function requireAgain (file) {
  var freshModule
  var absolutePath = getFullFileName(file)
  var requiredName = require.resolve(absolutePath)
  var cachedModule = require.cache[requiredName]

  delete require.cache[requiredName]

  freshModule = parent.require(file)

  require.cache[requiredName] = cachedModule

  return freshModule
}

function getFullFileName (file) {
  var directory = path.dirname(parent.filename)
  var absolutePath = path.join(directory, file)

  return absolutePath
}

module.exports = requireAgain
