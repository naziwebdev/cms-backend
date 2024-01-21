const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['پرداخت شده', 'در انتظار پرداخت', 'لغو شده'],
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('Cost', schema)

module.exports = model