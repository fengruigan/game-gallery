const mongoose = require('mongoose')

let workSchema = mongoose.Schema({
    _id: String,
    title: String,
    authors: [],
    description: String,
    imgCount: Number,
    category: [],
    event: String,
    download: {
        "link": String,
        "key": String
    },
    sections: [],
    password: String
})

module.exports = mongoose.model('Work', workSchema)