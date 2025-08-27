
class ErrorHandler extends Error {               // Error is built in class in JS, here we inherit that class
    
    // constructor...
    constructor(message, statusCode){
        super(message);                         // super() represent to super class...
        this.statusCode = statusCode;
    }
}

// middleware .....

const errorMiddleware = (err, req, res, next) => {

    // These error are involk from ErrorHandler class...
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    if(err.name === "CastError"){
        const message = `Invalid ${err.path}!`;
        err = new ErrorHandler(message , 400);
    }

    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token Invalid, Try again!`;
        err = new ErrorHandler(message , 400);
    }

    if(err.name === "TokeExpiredError"){
        const message = `Json Web Token expired, Try again!`;
        err = new ErrorHandler(message , 400);
    }

    if(err.name === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Enterd!`;
        err = new ErrorHandler(message , 400);
    }

    return res.status(err.statusCode).json({
        success : false,
        message : err.message,
    });
}



module.exports = { ErrorHandler , errorMiddleware }
