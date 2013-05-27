module.exports = wild_version

var https = require('https')
  , concat = require('concat-stream')
  , semver = require('semver')

function wild_version(pkg, ready) {
  var name = pkg.name
    , version = pkg.version

  try { 
    var req = https.get('https://registry.npmjs.org/'+name, function(resp) {
      resp
        .on('error', onerror)
        .pipe(concat(onresponse))
        .on('error', onerror)
    })
    req.on('error', onerror)
    return req.end()
  } catch(err) {
    return onerror(err)
  }

  function onerror(err) {
    return ready(err)
  }

  function onresponse(resp) {
    try { 
      return ready(null, Object.keys(JSON.parse(resp+'').versions).some(function(ver) {
        return semver.lt(version, ver)
      }))
    } catch(err) {
      return ready(err)
    }
  }
}
