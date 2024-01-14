const mongoose = require('mongoose')


const schema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 5
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    Answer: {
        type: Number,
        required: true,
        default: 0
    },
    isAnswer: {
        type: Number,
        required: true,
        default: 0
    },
    mainCommentID: {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
        required: false
    }

}, { timestamps: true })



const model = mongoose.model('Comment', schema)

module.exports = model