var mongoose = require('../mongoose')
var Post = mongoose.model('Post', {
  username: { type: String, required: true },
  body:     { type: String, required: true },
  date:     { type: Date, required: true, default: Date.now }
})
module.exports = Post
