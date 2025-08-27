
const express = require("express");
const { paymentGateway , orderData , getPurchasedItem } = require("../controllers/orderController.js");
const { isAuthenticate } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/payment-checkout" , isAuthenticate , paymentGateway);
router.get("/purchased", isAuthenticate , getPurchasedItem );
router.post("/ordered-products" , isAuthenticate , orderData );

module.exports = router;