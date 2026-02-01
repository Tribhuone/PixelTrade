
const Order = require("../models/orderModel.js");

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentGateway = async (req, res , next ) => {
    try {
        const products = req.body;

        const totalAmount = products.reduce(
            (sum, item) => sum + item.price,
            0
        );
        const order = await razorpay.orders.create({
            amount: totalAmount * 100, // rupees → paise
            currency: "INR",
            receipt: "pixeltrade_" + Date.now(),
        });

        res.json(order);

    } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message
        });
    }
}

const orderData = async (req, res) => {
    try{
        let orderedProducts = req.body;
        const purchasedUser = req.user._id;

        // remove `_id` (or `id`) , description, keywords, fileName field from each object
        let orderedProduct = orderedProducts.map(({ 
            _id, 
            id, 
            description, 
            keywords,
            uploadAt,
            userId,
            userName,
            ...rest 
        }) => {
            return {
                ...rest,
                artistId : userId,
                artistName : userName,
                purchasedBy : purchasedUser,
            }
        });
        
        // Save all orders in parallel
        await Order.insertMany(orderedProduct, { ordered: false });

        res.json({
            success: true,
            message: "Orders are saved!",
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}

const getPurchasedItem = async (req, res) => {
    try{
        const user_Id = req.user._id;
        const userProduct = await Order.find({ purchasedBy : user_Id })
                    .select("title path price artistName")
                    .limit(4)
                    .lean();

        return res.status(200).json({
            success : true,
            userProduct : userProduct,
        });
    }
    catch(err){
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message
        });
;
    }
}

module.exports = { paymentGateway , orderData , getPurchasedItem };
