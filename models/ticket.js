const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: false
    },
    answer: {
        type: Number,
        required: true,
        default: 0
    },
    isAnswer: {
        type: Number,
        required: true,
        default: 0
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'Ticket'
    }


}, { timestamps: true })


const model = mongoose.model('Ticket', schema)

module.exports = model