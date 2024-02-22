const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    haveStar:{
      type:Boolean,
      required:true,
      default:false
    }
  },
  { timestamps: true }
);

const model = mongoose.model("Note", schema);

module.exports = model;
