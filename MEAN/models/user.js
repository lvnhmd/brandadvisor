var mongoose = require('../mongoose')
var user = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
})
module.exports = mongoose.model('User', user)
