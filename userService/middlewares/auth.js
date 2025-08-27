
// const User = require("../models/userModel.js");
const { ErrorHandler } = require("./error.js");
const { catchAsyncError } = require("./catchAsyncError.js");

const jwt = require("jsonwebtoken");

// Here check user is authenticate or not/ logged in or not ...
const isAuthenticate = catchAsyncError( async (req, res, next) => {

    const { token } = req.cookies;
    if(!token){
        req.user = null;
        return next( new ErrorHandler("User is not Authenticated", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (error) {
        req.user = null;
    }

    next();
});

module.exports = { isAuthenticate }
