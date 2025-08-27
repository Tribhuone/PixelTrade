
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
        imagePath:{
            type: String,
            required: true,
        },

        fileName : {
            type: String,
            required : true,
        },

        title:{
            type: String,
            required: true,
        },

        price:{
            type:Number,
            required: true,
        },

        artistId : {
            type : String,
            required : true,
        },

        artistName : {
            type : String,
            required : true,
        },


        purchasedBy : {
            type : String,
            required : true,
        },

        purchsedAt : {
            type : Date,
            defualt : Date.now(),
        }
});

const Order = mongoose.model("order" , orderSchema);
module.exports = Order;
