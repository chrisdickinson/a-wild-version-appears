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
