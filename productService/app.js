
require('@dotenvx/dotenvx').config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const databaseConnection = require("./dbConnection.js");
const router = require("./routes/route.js");

const PORT = process.env.PORT || 8081;

// DB connection...
databaseConnection();

// _________ MIDDLEWARES ________

// add midleware (cors) to connect with frontend...
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",  // your frontend origin
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/product", router);

app.listen(PORT , () => {
    console.log("Product service running on port : ", PORT);
});

