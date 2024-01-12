const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'processing',
        enum: ['processing', 'posted', 'cancel', 'returned']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })


const model = mongoose.model('Order', schema)

module.exports = model