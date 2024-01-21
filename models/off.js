const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    expireDay: {
        type: Number,
        required: true,
        default:7
    },
    maxUsage:{
        type: Number,
        required: true,
        default: 1
    },
    countUsaged: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: false
    }

}, { timestamps: true })


const model = mongoose.model('Off', schema)

module.exports = model