'use strict'

var requireAgain = require('../')
var expect = require('chai').expect

describe('require-again', function () {
  it('allows you to re-run module operations that happen on load', function () {
    var fake = require('./support/fake-module')

    expect(fake.setting).to.eql('default')

    process.env.FAKE_MODULE_SETTING = 'not default'

    expect(fake.setting).to.eql('default')

    fake = require('./support/fake-module')

    expect(fake.setting).to.eql('default')

    fake = requireAgain('./support/fake-module')

    expect(fake.setting).to.eql('not default')

    delete process.env.FAKE_MODULE_SETTING
  })

  it('does not error if module has not been required before', function () {
    expect(function () {
      requireAgain('./support/single-required-module')
    }).to.not.throw()
  })

  it('does not error if more than one module is deleted from the cache', function () {
    require('./support/another-fake-module')

    expect(function () {
      requireAgain('./support/fake-module')
    }).to.not.throw()
  })
})
