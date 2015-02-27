var express = require('express')
var bodyParser = require('body-parser')
var Brand = require('./models/brand')

var app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname));


app.get('/', function (req, res) {
  res.sendfile('index.html')
})

app.get('/api/brands', function (req, res, next) {
    Brand.find(function(err, brands) {
        if (err) { return next(err) }
        res.json(brands)
    })
})

app.listen(3000, function () {
  console.log('Server listening on', 3000)
})
