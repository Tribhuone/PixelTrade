
const { catchAsyncError } = require("../middlewares/catchAsyncError.js");
const Photo = require("../models/imgModel.js");

// get all image data route for home page ...
const getImgData = catchAsyncError( async (req,res,next) => {

    try{
        // get All data...
        const imageData = await Photo.find();
        
        const dataWithPaths = imageData.map(img => {
            return {
                ...img._doc,
                imagePath: `http://localhost:8079/${img.path}`
            };
        });

        res.json( dataWithPaths );
    }
    catch(er){
        res.status(500).json({message: er});
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
        console.log(userProduct);

        const dataWithPaths = userProduct.map(img => {
            return {
                ...img._doc,
                imagePath: `http://localhost:8079/${img.path}`
            };
        });

        return res.status(200).json({
                success : true,
                userProduct : dataWithPaths,
            });
    }
    catch(err){
        res.status(500).json({message: err});
    }
});

const deletePost = catchAsyncError( async (req, res , next) => {
    try {
        const { id } = req.params; // extract id
        await Photo.findOneAndDelete({ _id: id });
        res.json({ message: "Post deleted!" });
    } 
    catch (error) {
        res.json({
            message : error,
        });
    }
});

module.exports = { getImgData , getSingleImg , getUserProduct , deletePost };
