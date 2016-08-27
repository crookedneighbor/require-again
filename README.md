# require-again
A simple module that makes ignoring the node require cache easy.

## Why?

Say you have a file that has slightly different behavior when running in a production environment. Like so:

```js
var isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  // do special prod stuff
} else {
  // do non-prod stuff
}

module.exports = myModule
```

When you require this module in your test files, it'll run the `isProd` check once and then cache that version of the module. This makes it difficult to test both behaviors. `require-again` deletes the module from Node's require cache and returns the re-required module.

## Usage

```js
var requireAgain = require('require-again')

describe('some test', function () {
  context('prod behavior', function () {
    var myModule, oldEnv

    before(function () {
      oldEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      myModule = requireAgain('./path/to/module')
    })

    after(function () {
      process.env.NODE_ENV = oldEnv
    })

    it('does something in a production environment', function () {
      // tests
    })
  })

  context('non-prod behavior', function () {
    var myModule, oldEnv

    before(function () {
      oldEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'dev'
      myModule = requireAgain('./path/to/module')
    })

    after(function () {
      process.env.NODE_ENV = oldEnv
    })

    it('does something in a development environment', function () {
      // tests
    })
  })
})
```

## Testing

This module is tested in Node versions:

* 4.x.x
* 5.x.x
* 6.x.x
