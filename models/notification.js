const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seen:{
        type:Number,
        default:0
    }
}, { timestamps: true })

const model = mongoose.model('Note', schema)

module.exports = model