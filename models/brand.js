var db = require('../db')
var Brand = db.model('Brand', {
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    keywords: {
        type: Array,
        required: true
    }
})
module.exports = Brand
