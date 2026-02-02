
const mongoose = require("mongoose");

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then( () => {
        console.log("Database connected");
    })
    .catch( (err) => {
        console.log(err);
    });
}

module.exports = databaseConnection;
