
const { ErrorHandler } = require("../middlewares/error.js");
const { catchAsyncError } = require("../middlewares/catchAsyncError.js");

const twilio = require("twilio");
const crypto = require("crypto");
const User = require("../models/userModel.js");

const { sendEmail } = require("../utils/sendEmail.js");
const { sendToken } = require("../utils/sendToken.js");


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// _____ function to get users REGISTRATION data and add to collections of DB ...

const register = catchAsyncError(async (req,res,next) => {
    try {
        const {name , password , email , phone , verificationMethod} = req.body;
        if(!name || !password || !email || !phone || !verificationMethod){
            return next(new ErrorHandler("All fields are required!", 400));
        }

        // phone number validation with country code...
        const validatePhone = (phone) => {
            const phoneRegex = /^\+91\d{10}$/ ;           // here we apply Regex validation for India numbers...
            return phoneRegex.test(phone);
        }

        if(!validatePhone(phone)){
            return next(new ErrorHandler("Invalid Phone Number" , 400));
        }

        // Here we check the existng email or phone must be have to only single document.
        const existingUser = await User.findOne({
            $or: [
                {
                    email,
                    accountVerified: true,
                },
                {
                    phone,
                    accountVerified: true,
                }
            ]
        });

        // if the user already registered...
        if(existingUser){
            return next(new ErrorHandler("Phone or Email Already Used!", 400));
        }

        // Here we make limits for access data of db by User...
        const registrationAttemptsByUser = await User.find({
            $or: [
                {
                    phone , accountVerified: false,
                },
                {
                    email,
                    accountVerified: false,
                }
            ]
        });

        if(registrationAttemptsByUser >= 3){
            return next(new ErrorHandler("You have exceeded the maximum number of attempts (3), Please try again after 5 minutes!", 400));
        }


        // Now create new user in DB...
        const user = new User({
            name,
            email,
            phone,
            password,
        });

        // Here generate Verification Code for each registerd User...
        const verificationCode = await user.generateVerificationCode();

        await user.save();  
        
        // Now send the verification code to each User...  (verification method can be email/phone);
        sendVerificationCode(verificationMethod, verificationCode, email, phone, name,  res);

    } catch (error) {
        next(error);
    }
});

// function to send verification code (OTP) to user...
const sendVerificationCode = async (verificationMethod, verificationCode, email, phone, name, res) => {
    try {
        if(verificationMethod === "email"){
            const message = generateEmailTemplate(verificationCode);
            sendEmail({email, message, subject:"Verification Code" });
            res.status(200).json({
                success: true,
                message: `Verification code successfuly sent to ${name}`,
            });
        }
        else if(verificationMethod === "phone"){
            // split() split each characters of string into array form, then we join them with spaces.
            const verifyCodeSpace = verificationCode.toString().split("").join(" ");

            // Using the twilio, we send messages to verified phone number...
            const message = await client.messages.create({
                body: `Hello from Alwa-Jalwa, Your OTP is ${verifyCodeSpace}`,
                from: process.env.TWILIO_PHONE,
                to: phone,
            });

            res.status(200).json({
                success: true,
                message:"OTP sent successfully",
            });
        }

        else{
            return res.status(500).json({
                message: false,
                message:"Invalid verification method!",
            });
        }
    } 
    catch (error) {
        return res.status(500).json({
                message: false,
                message:"Failed to send verification code!",
            });
    }
}

// Here we create template of email.
function generateEmailTemplate(verificationCode){
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin:  0 auto; padding: 20px; 
            border: 1px solid #ddd; border-radius: 8px; background-color:aliceblue;">
            <h2>Verificatin Code</h2>
            <p style="font-size:16px; color: #333" >Dear User</p>
            <p style="font-size:16px; color: #333" >Your verification Code is</p>
            <div style="text-align:center; margin: 20px 0;">
                <span style="display:inline-block; font-size: 24px; font-weight:bold; padding:10px 20px;
                    border: 1px solid rgb(90, 201, 90); color: rgb(90,201,90); " >
                    ${verificationCode}
                </span>
            </div>
            <p style="font-size:16px; color: #333" >Please use this code to verify your email address. The code will expire in 10 minutes.</p>
            <p style="font-size:16px; color: #333" >If you did not request this, please ignore this email.</p>

            <footer style="margin-top:20px; text-align:center; font-size:14px; color:#999" >
                <p> Thank you, <br>
                    Your Company Team
                </p>

                <p style="font-size:12px; color: #aaa;">This is an automated message. Please do not reply this email.</p>
            </footer>
        </div>`
}


// __________________________________________ Method to Verify OTP  ______________________________________________ ...

const verifyOTP = catchAsyncError( async (req, res, next) => {

    const { email,  otp , phone} = req.body;           // get the users data
    const newPhone = `+91${phone}`;
    // First we have to verify the users phone number...
    const validatePhone = (phone) => {
        const phoneRegex = /^\+91\d{10}$/ ;           // here we apply Regex validation for India numbers...
        return phoneRegex.test(phone);
    }

    if(!validatePhone(newPhone)){
        return next(new ErrorHandler("Invalid Phone Number" , 400));
    }

    // Check users all entries in DB...
    try{
        const userAllEntries = await User.find({
            $or: [
                { email , accountVerified: false},
                { phone , accountVerified: false},
            ], 
        })
        .sort({ createdAt : -1 });        // sort method used to sort the users data decending order based on users latest entries in DB...

        // if user already requsted
        if(!userAllEntries){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Here we delete users all entries except the latest requests...
        let user;
        if(userAllEntries.length > 1){
            user = userAllEntries[0];

            await User.deleteMany({
                _id: {$ne: user._id},
                $or: [
                    { email , accountVerified: false},
                    { phone , accountVerified: false},
                ]
            });
        }
        else{
            user = userAllEntries[0];
        }

        let curntUser = await User.findOne({email : email});

        // check the otp is same or not...
        if(curntUser.verificationCode !== Number(otp)){
            return next(new ErrorHandler("Invalid OTP!", 400));
        }
        
        // Here we check the OTP time validation.
        // OTP is expire if, entered time is greater than expiry time...
        const currentTime = Date.now();
        const verificationCodeExpire = new Date(curntUser.verificationCodeExpiry)
            .getTime();
        
        if(currentTime > verificationCodeExpire){
            return next(new ErrorHandler("OTP Expired!", 400));
        }

        curntUser.accountVerified = true;
        curntUser.verificationCode = null;
        curntUser.verificationCodeExpiry = null;
        await curntUser.save({ validateModifiedOnly : true });

        // __ Here we create function to send security token to user for giving access of verified things...
        sendToken(user, 200 , "Account Verified" , res);

    }
    catch(err){
        return next(new ErrorHandler("Internal Server Error", 500));
    }
});


// _____________________________ Login Method ... __________________________________

const userLogin = catchAsyncError( async (req, res, next) => {

    // first we have to get the data...
    const { email , password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Email and Password are required!"));
    }

    // here we check email and password in DB...
    const user = await User.findOne({ email , accountVerified: true }).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    
    // compare password...
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid password", 400));
    }

    sendToken(user , 200 , "User successfully logged in!", res);
});


// _________________________________  LogOut Method _________________________________

const userLogOut = catchAsyncError( async (req,res) => {
    // to logout we have to remove the cookie from application...
    try{
        res.status(200).cookie("token", null , {
            expires : new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "Logged out successfully",
        });
    }
    catch(er){
        res.status(500).json({
            message: er,
        });
    }
});

// _______________________ Now Get the User...
const getUser = catchAsyncError( async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({_id: id});
    res.status(200).json({
        success: true,
        user : user,
    });
});


// ___________________________ forgot Password __________________
const forgotPassword = catchAsyncError( async (req, res, next) => {
    const user = await User.findOne( { email: req.body.email , accountVerified: true } );
    if(!user){
        return next(new ErrorHandler("User not found", 400));
    }

    // Here we generate new token to reset that...
    const resetTokn = user.generateRestPasswordToken();
    await user.save({ validateBeforeSave : false });
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetTokn}`;
    const message = `Your reset Password Token is : \n\n ${resetPasswordUrl} \n\n . If you have not request this email, then please ignore it`;

    // send email...
    try {
        sendEmail({ email: user.email, subject: "Reset Password", message, });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.name} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave : false});
        return next(new ErrorHandler(error.message ? error.message : "Cannot send reset password token", 500));
    }
});


// ________________________________ Reset Password ___________________
const resetPassword = catchAsyncError( async (req,res, next) => {
    const { token } = req.params;
    const resetPasswordTokn = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordTokn,
        resetPasswordExpire : { $gt : Date.now() },
    });
    if(!user){
        return next(new ErrorHandler("Reset password is invalid or has been expired!", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match!", 400));
    }
    else if(req.body.password === req.body.confirmPassword){
        console.log("Password Matched");
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
    
        sendToken(user,200, "Reset Password Successfully", res);
    }

});

module.exports = { register , verifyOTP , userLogin , userLogOut , getUser , forgotPassword , resetPassword};

