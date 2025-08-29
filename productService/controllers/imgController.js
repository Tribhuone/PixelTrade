
const { catchAsyncError } = require("../middlewares/catchAsyncError.js");
const Photo = require("../models/imgModel.js");
const cloudinary = require("cloudinary").v2;


// function to upload Image files ...
const uploadImg = catchAsyncError( async (req, res, next ) => {
    try{
        const userId = req.user._id;
        const userName = req.user.name;

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "product-images", // optional: organize images
        });

        const image = new Photo({ 
            path : result.secure_url,
            fileName : req.file.originalname,
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
                message: er.message,
            });
        });
    }
    catch(er){
        console.log(er);
        return res.status(500).json({
            success: false,
            message: er.message,
        });
    }
});

// get all image data route for home page ...
const getImgData = catchAsyncError( async (req,res,next) => {
try{
        // get All data...
        const imageData = await Photo.find();

        res.json( imageData );
    }
    catch(er){
        res.status(500).json({ message: er.message });
    }
});

// get single Image route ...
const getSingleImg = catchAsyncError( async (req,res,next) => {
    try{
        const { id } = req.params;
    }
    catch(er){
        res.status(500).json({message: er});
    }
});

// get that image which was uploaded by a single user ...
const getUserProduct = catchAsyncError( async (req, res, next) => {
    try{
        const user_Id = req.user._id;
        const userProduct = await Photo.find({ userId : user_Id });

        return res.status(200).json({
                success : true,
                userProduct : userProduct,
            });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

const deletePost = catchAsyncError( async (req, res , next) => {
    try {
        const { id } = req.params; // extract id

        const photo = await Photo.findById({_id: id});
        await Photo.findOneAndDelete({ _id: id });
        res.json({ message: "Post deleted!" });

        // delete from cloudinary...
        await cloudinary.uploader.destroy(photo.publicId);
    } 
    catch (error) {
        res.json({
            message : error,
        });
    }
});

module.exports = { getImgData , getSingleImg , getUserProduct , deletePost , uploadImg };
