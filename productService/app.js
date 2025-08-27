
const express = require("express");
const app = express();
require('@dotenvx/dotenvx').config();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require('cors');
const path = require("path");

const { isAuthenticate } = require("./middlewares/authMiddleware.js");

// Picture model
const Photo = require("./models/imgModel.js");

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/product", router);

// _________________  MULTER Route _______________________
const storage = multer.diskStorage({
    // Here give destination to store the file...
    destination: function(req, file, cb){
        return cb(null, "./uploads")
    },
    // Here give file name...
    filename : function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})
// Here we pass the storage object used to be in "upload" middleware ...
const upload = multer({ storage : storage});

app.post(
    "/api/product/upload" ,
    isAuthenticate,
    upload.single("image"),
    async (req,res) => {
        try{
            const userId = req.user._id;
            const userName = req.user.name;

            const image = new Photo({ 
                path : req.file.path,
                fileName : req.file.filename,
                title : req.body.title,
                description : req.body.description,
                keywords : req.body.keywords,
                price : req.body.price,
                userId : userId,
                userName : userName,
            });

            image.save()
            .then( () => {
                res.json({
                    success: true,
                    message: "Image Uploaded",
                });
            })
            .catch( (er) => {
                res.json({
                  success: false,
                  message: er,  
                });
            });
        }
        catch(er){
            return res.status(500).json({
                success: false,
                message: er,
            });
        }
});


app.listen(PORT , () => {
    console.log("Product service running on port : ", PORT);
});

