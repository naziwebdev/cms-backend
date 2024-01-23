const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }

}, { timestamps: true })

const model = mongoose.model('Event', schema)

module.exports = model