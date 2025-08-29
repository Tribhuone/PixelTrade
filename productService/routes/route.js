
const express = require("express");

const { getImgData , getSingleImg , getUserProduct , deletePost , uploadImg } = require("../controllers/imgController.js");
const { isAuthenticate } = require("../middlewares/authMiddleware.js");
const upload = require("../middlewares/upload.js");
const router = express.Router();

router.post("/upload", isAuthenticate , upload.single("image") , uploadImg );
router.get("/", getImgData);
router.get("/img/:id", getSingleImg);
router.get("/uploaded", isAuthenticate , getUserProduct);
router.delete("/delete/post/:id", deletePost);

module.exports = router;

