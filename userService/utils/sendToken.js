
const jwt = require("jsonwebtoken"); 

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET_KEY || "defaultSecret",
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );
}

// Send token in response (cookie + json)
function sendToken(user, statusCode, message, res) {
  const token = generateToken(user);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      user,
      message,
      token, // optional (only if you also want frontend to store manually)
    });
}

module.exports = { sendToken };
