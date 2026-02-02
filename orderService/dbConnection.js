
const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    mongoose.set("bufferCommands", false); // 🔥 important

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB Connected");

  } catch (err) {
    console.log("Mongo Connection Error:", err);
    process.exit(1);
  }
};

module.exports = databaseConnection;
