var express = require('express')
var jwt     = require('jwt-simple')
var _ = require('lodash')
var bcrypt = require('bcrypt')
var User    = require('../models/user')

var app     = express()
app.use(require('body-parser').json())

var users = [{username: 'dickeyxxx', password: '$2a$10$Jmo/n32ofSM9JvzfH0z6Me6TMyn6C/U9JhzDG8xhQC4ExHMG1jXz2'}]
var secretKey = 'supersecretkey'

function findUserByUsername(username) {
  return _.find(users, {username: username})
}

//var bcrypt = require('bcrypt')
//function validateUser(user, password) {
//  return bcrypt.compareSync(password, user.password)
//}

//app.post('/session', function (req, res) {
//  var user = findUserByUsername(req.body.username)
//  if (!validateUser(user, req.body.password)) {
//    return res.send(401) // Unauthorized
//  }
//  var token = jwt.encode({username: user.username}, secretKey)
//  res.json(token)
//})


//rewrite above with callback

function validateUser(user, password, cb) {
  bcrypt.compare(password, user.password, cb)
}

//app.post('/session', function (req, res) {
//  var user = findUserByUsername(req.body.username)
//  validateUser(user, req.body.password, function (err, valid) {
//    if (err || !valid) { return res.send(401) }
//    var token = jwt.encode({username: user.username}, secretKey)
//    res.json(token)
//  })
//})

//app.get('/user', function (req, res) {
//  var token = req.headers['x-auth']
//  var user = jwt.decode(token, secretKey)
//  // TODO: pull user info from database
//  res.json(user)
//})

app.post('/session', function (req, res, next) {
  var username = req.body.username
  User.findOne({username: username})
  .select('password')
  .exec(function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      if (err) { return next(err) }
      if (!valid) { return res.sendStatus(401) }
      var token = jwt.encode({username: username}, secretKey)
      res.json(token)
    })
  })
})

app.get('/user', function (req, res, next) {
  var token = req.headers['x-auth']
  var auth  = jwt.decode(token, secretKey)
  User.findOne({username: auth.username}, function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    res.json(user)
  })
})

app.post('/user', function (req, res, next) {
  var user = new User({username: req.body.username})
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    user.password = hash
    user.save(function (err) {
      if (err) { next(err) }
      res.send(201)
    })
  })
})

app.listen(3000)
