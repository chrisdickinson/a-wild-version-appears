var version = require('./index')

version({name: 'scoped', version:'0.0.3'}, function(err, data) {
  console.log(err, data)
})
