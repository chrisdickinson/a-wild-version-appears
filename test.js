var hasinternet = require('hasinternet')
  , test = require('tape')

var version = require('./index')

hasinternet(function(err, connected) {
  connected ? tests_online() : tests_offline()
})

function tests_online() {
  test(
      'package with newer version alerts new version is available'
    , test_pkg_with_new_version
  )

  test(
      'package without newer version alerts version is not available'
    , test_pkg_without_newer_version
  )

  function test_pkg_with_new_version(assert) {
    version({name: 'scoped', version: '0.0.3'}, function(err, data) {
      assert.ok(!err)
      assert.ok(data)
      assert.end()
    })
  }

  function test_pkg_without_newer_version(assert) {
    version(require('./package.json'), function(err, data) {
      assert.ok(!err)
      assert.ok(!data)
      assert.end()
    })
  }
}

function tests_offline() {
  test(
      'if offline, new package is not available'
    , offline_test
  )

  function offline_test(assert) {
    version({name: 'scoped', version: '0.0.3'}, function(err, data) {
      assert.ok(!err)
      assert.ok(!data)
      assert.end()
    })
  }
}
