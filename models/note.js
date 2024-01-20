const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('Note', schema)

module.exports = model