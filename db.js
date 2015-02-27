var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/brandadvisor', function () {
  console.log('mongodb connected')
})
module.exports = mongoose
