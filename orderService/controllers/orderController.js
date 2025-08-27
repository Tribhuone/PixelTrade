
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/orderModel.js");

const paymentGateway = async (req, res , next ) => {
    try {
        const products = req.body;
        // Convert cart items to Stripe line_items
        const lineItems = products.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                name: item.title,
                },
                unit_amount: item.price * 100, // Stripe uses paise, so multiply by 100
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],          // type of payment methods
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.json( { id: session.id } );
    } catch (error) {
        res.status(500).json("Internal server Error" , error);
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
            path,
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
        await Order.insertMany(orderedProduct);

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
        const userProduct = await Order.find({ purchasedBy : user_Id });

        return res.status(200).json({
            success : true,
            userProduct : userProduct,
        });
    }
    catch(err){
        res.status(500).json({message: err});
    }
}

module.exports = { paymentGateway , orderData , getPurchasedItem };
