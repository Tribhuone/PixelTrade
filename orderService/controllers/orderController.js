
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
  try {
    let orderedProducts = req.body;
    const purchasedUser = req.user._id.toString();
    console.log(orderedProducts);
    let orderedProduct = orderedProducts.map(({
      _id,
      id,
      description,
      keywords,
      uploadAt,
      userId,
      userName,
      ...rest
    }) => ({
      ...rest,
      artistId: userId,
      artistName: userName,
      purchasedBy: purchasedUser,
    }));

    console.log("Saving Orders:", orderedProduct);

    await Order.insertMany(orderedProduct); // no ordered:false

    res.json({
      success: true,
      message: "Orders are saved!",
    });

  } catch (err) {
    console.log("Order Save Error:", err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getPurchasedItem = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const user_Id = req.user._id;

        const userProduct = await Order.find({ purchasedBy: user_Id })
            .select("title path price artistName")
            .sort({ createdAt: -1 })
            .limit(4)
            .lean();

        return res.status(200).json({
            success: true,
            userProduct
        });

    } catch (err) {
        console.log("Purchased Error:", err);

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};
module.exports = { paymentGateway , orderData , getPurchasedItem };
