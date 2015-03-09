var router = require('express').Router()
var User    = require('../../models/user')
var bcrypt = require('bcrypt')
var jwt     = require('jwt-simple')
var config = require('../../config')


router.get('/', function (req, res, next) {
  console.log(req.headers)
  console.log(req.headers['host'])
  var token = req.headers["x-auth"]
  console.log('get api/users token :' + token)
  var auth  = jwt.decode(token, config.secret)
  User.findOne({username: auth.username}, function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    res.json(user)
  })
})

router.post('/', function (req, res, next) {
  var user = new User({username: req.body.username})
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    user.password = hash
    user.save(function (err) {
      if (err) { next(err) }
      res.send(201)
    })
  })
})

module.exports = router
