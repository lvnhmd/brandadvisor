var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/', require('./controllers/static'))
//app.use(require('./controllers/api/posts'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/users', require('./controllers/api/users'))


app.listen(3000, function () {
  console.log('Server listening on', 3000)
})



//var express    = require('express')
//var bodyParser = require('body-parser')
//var logger     = require('morgan')
//
//var app = express()
//app.use(bodyParser.json())
//app.use(logger('dev'))
//app.use(require('./controllers'))
//
//var server = app.listen(3000, function () {
//  console.log('server listening on %d', server.address().port)
//})
