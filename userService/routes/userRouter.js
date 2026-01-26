

const express = require("express");

const { register , verifyOTP , 
        userLogin , userLogOut , 
        getUser , forgotPassword , 
        resetPassword, updateUserProfile 
    } = require("../controllers/userController.js");

const { isAuthenticate } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/otp", verifyOTP);
router.post("/login", userLogin);
router.get("/logout" , userLogOut);
router.get("/:id", isAuthenticate , getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.patch("/update-profile", updateUserProfile);

module.exports = router;
