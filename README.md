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

When you require this module in your test files, it'll run the `isProd` check once and then cache that version of the module. This makes it difficult to test both behaviors. `require-again` allows you to get a freshly required version of the module.

Requiring the module normally after using requireAgain will return the original cached version of the module.

## Usage

Example using [Mocha](https://mochajs.org/)

```js
var requireAgain = require('require-again')
var pathToModule = './path/to/module'

describe('some test', function () {
  context('prod behavior', function () {
    before(function () {
      this.oldEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'

      this.module = requireAgain(pathToModule)
    })

    after(function () {
      process.env.NODE_ENV = this.oldEnv
    })

    it('does something in a production environment', function () {
      // tests
    })
  })

  context('non-prod behavior', function () {
    before(function () {
      this.oldEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'dev'

      this.module = requireAgain(pathToModule)
    })

    after(function () {
      process.env.NODE_ENV = this.oldEnv
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

## Changelog

See [releases](https://github.com/crookedneighbor/require-again/releases) for a detailed changelog.
