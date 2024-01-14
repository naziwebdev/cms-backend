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
        default: 5,
        min:0,
        max:5
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
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
    },
    isAccept:{
        type: Number,
        required: true,
        default: 0
    }

}, { timestamps: true })



const model = mongoose.model('Comment', schema)

module.exports = model