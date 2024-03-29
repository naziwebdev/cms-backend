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
        type:Date,
        required: true,
        default: Date.now, 
    },
    price: {
        type:string,
        required: true
    }
}, { timestamps: true })

const model = mongoose.model('Cost', schema)

module.exports = model