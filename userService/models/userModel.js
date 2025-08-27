
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Schema of database ...
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
    },

    phone : {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        maxLength: [8, "Password mut have atleast 8 characters"],
        required: true,
        select: false,                  // used to hide from client-side...
    }, 

    accountVerified: {
        type:Boolean,
        default: false,
    },

    verificationCode: {
        type: Number,
    },

    verificationCodeExpiry: Date,

    resetPasswordToken: String,

    resetPasswordExpire : Date,

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});


// convert password into hash form to store on database...
// pre() method used to perform action before the updation of saving data...

userSchema.pre("save", async function(next){
    // if password doesn't modified then...
    if(!this.isModified("password")){
        next();
    }
    else{
        this.password = await bcrypt.hash(this.password, 10);       // if password modified, then decrypt that password into hash form.
    }
})

// _______________________________ Here we create methods for User Model ___________________________________

// Now CREATE METHOD TO compare entered password with stored dcrypted password.
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);           // bcrypt.compare() takes currently entered data and dcrypted data.
}

// create Method to generate verification code...
userSchema.methods.generateVerificationCode = function(){
    function genratRandDigits(){
        const firstDigit = Math.floor(Math.random() * 9) + 1;
        const remainDigits = Math.floor(Math.random() * 10000).toString().padStart(4,0);

        return parseInt(firstDigit + remainDigits);
    }

    const verificationCode = genratRandDigits();
    this.verificationCode = verificationCode;
    this.verificationCodeExpiry = Date.now() + 5 * 60 * 1000;       // here we give 5 mint for expire the code...

    return verificationCode;
}

// function to generate token for login users ...
userSchema.methods.generateToken = async function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn : process.env.JWT_EXPIRE,
    });
}


// function to reset token ...
userSchema.methods.generateRestPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

// Model...
const User = mongoose.model("User", userSchema);

module.exports = User;
