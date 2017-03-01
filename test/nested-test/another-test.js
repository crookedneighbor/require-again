'use strict'

var requireAgain = require('../../')
var expect = require('chai').expect

describe('require-again', function () {
  it('works when already required from another module (must run test/index.js first)', function () {
    var fake = require('../support/fake-module')

    expect(fake.setting).to.eql('default')

    process.env.FAKE_MODULE_SETTING = 'not default'

    expect(fake.setting).to.eql('default')

    fake = require('../support/fake-module')

    expect(fake.setting).to.eql('default')

    fake = requireAgain('../support/fake-module')

    expect(fake.setting).to.eql('not default')

    delete process.env.FAKE_MODULE_SETTING
  })
})
