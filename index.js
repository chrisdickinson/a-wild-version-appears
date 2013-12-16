module.exports = wild_version

var hasinternet = require('hasinternet')
  , concat = require('concat-stream')
  , semver = require('semver')
  , https = require('https')
  , url = require('url')

function wild_version(pkg, ready) {
  var version = pkg.version
    , name = pkg.name
    , opts
    , req

  try {
    return hasinternet(function(err, online) {
      if(err) {
        // we're not on the internet, there are
        // no new versions (from our perspective).
        return ready(null, false)
      }

      opts = url.parse('https://registry.npmjs.org/' + name)
      opts.rejectUnauthorized = false

      try {
        req = https.get(
            opts
          , onresponsestart
        )
        req.on('error', onerror)
        req.end()
      } catch(err) {
        return onerror(err)
      }
    })
  } catch(err) {
    return onerror(err)
  }

  function onresponsestart(resp) {
    resp
      .on('error', onerror)
      .pipe(concat(onresponse))
      .on('error', onerror)
  }

  function onerror(err) {
    return ready(err)
  }

  function onresponse(resp) {
    try {
      return ready(
          null
        , Object.keys(JSON.parse(resp + '').versions).some(check)
      )
    } catch(err) {
      return ready(err)
    }
  }

  function check(ver) {
    return semver.lt(version, ver)
  }
}
