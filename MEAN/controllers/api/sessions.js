var router = require('express').Router()
var User    = require('../../models/user')
var bcrypt = require('bcrypt')
var jwt     = require('jwt-simple')
var config = require('../../config')

router.post('/', function (req, res, next) {
  var username = req.body.username
  User.findOne({username: username})
  .select('password')
  .exec(function (err, user) {
    if (err) { return next(err) }
    if (!user) { return res.sendStatus(401) }
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      if (err) { return next(err) }
      if (!valid) { return res.sendStatus(401) }
      var token = jwt.encode({username: username}, config.secret)
      res.json(token)
    })
  })
})

module.exports = router
