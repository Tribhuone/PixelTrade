require('@dotenvx/dotenvx').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')

const router = require("./routes/orderRoute.js");
const databaseConnection = require("./dbConnection.js");

const app = express();

const PORT = process.env.PORT || 3001;

// database...
databaseConnection();

// _________ MIDDLEWARES ________

// add midleware (cors) to connect with frontend...
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/order" , router);

app.listen(PORT , () => {
    console.log("Order server start on port : ", PORT);
})
