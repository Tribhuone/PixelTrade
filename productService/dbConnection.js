
const mongoose = require("mongoose");

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser:true,
        userCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then( () => {
        console.log("Database connected");
    })
    .catch( (err) => {
        console.log(err);
    });
}

module.exports = databaseConnection;
