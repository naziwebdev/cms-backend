const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        required:true,
        default:false
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    haveStar:{
        type:Boolean,
        required:true,
        default:false
      }

},{timestamps:true})

const model = mongoose.model('Todo',schema)

module.exports = model