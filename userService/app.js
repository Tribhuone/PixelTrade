
const express = require("express");
const cookieParser = require("cookie-parser");
require('@dotenvx/dotenvx').config();
const path = require("path");
const cors = require("cors");

const router = require("./routes/userRouter.js");
const databaseConnection = require("./dbConnection.js");
const { errorMiddleware } = require("./middlewares/error.js");
const { removeUnverifyAccounts } = require("./automations/removeUnverifiedAcc.js");

const PORT = process.env.PORT || 8082;
const app = express();

// DB connection...
databaseConnection();

// ____________ remove Unverified Accounts every 30 minutes after users entry ...
removeUnverifyAccounts();


// ______________ Middlewares... ________________
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",  // your frontend origin
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));

app.use(cookieParser());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// __________ Routes ___________ ...
app.use("/api/user", router);

// ______ Error Middleware ______
app.use(errorMiddleware);


app.listen( PORT , () => {
    console.log(`User Service start on port : ${PORT}`);
});
