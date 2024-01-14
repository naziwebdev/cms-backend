const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true })


schema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'product'
})


const model = mongoose.model('Product', schema)

module.exports = model