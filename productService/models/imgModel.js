
const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
    path:{
        type: String,
        required: true,
    },

    fileName:{
        type: String,
        required: true,
        unique: true,
    },

    title:{
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },

    keywords:[{
        type:String, 
        required: true
    }],

    price:{
        type:Number,
        required: true,
    },

    uploadAt: {
        type: Date,
        default: Date.now(),
    },

    userId : {
        type : String,
        required : true,
    },

    userName : {
        type : String,
        required : true,
    },
})

const Photo = mongoose.model("Photo", imgSchema );
module.exports = Photo;