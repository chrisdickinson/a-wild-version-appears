# a-wild-version-appears

sometimes you want to tell users of your CLI script that there's a new version available.

this lets you do that!

```javascript
var version = require('a-wild-version-appears')
  , pkg = require('./package.json')

version(pkg, function(err, newer_available) {
  if(newer_available) {
    console.error('there\'s a newer version of '+pkg.name+' available! `npm install -g '+pkg.name+'` to upgrade.')
  }

  // keep on doing stuff.
})

```

# API

## version(package_json_contents, ready(err, newer_available)) -> undefined

returns whether or not there's a newer version available or not. if an err is encountered
in the attempt it'll be passed as `err` to the `ready` callback.

# license

MIT
