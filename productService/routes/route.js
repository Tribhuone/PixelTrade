
const express = require("express");

const { getImgData , getSingleImg , getUserProduct , deletePost } = require("../controllers/imgController.js");
const { isAuthenticate } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.get("/", getImgData);
router.get("/img/:id", getSingleImg);
router.get("/uploaded", isAuthenticate , getUserProduct);
router.delete("/delete/post/:id", deletePost);

module.exports = router;

