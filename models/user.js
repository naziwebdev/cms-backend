const mongoose = require('mongoose')


const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        min: 11,
        max: 11
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ['female', 'male']
    },
    role: {
        type: String,
        required: true,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }

}, { timestamps: true })


const model = mongoose.model('User', schema)

module.exports = model