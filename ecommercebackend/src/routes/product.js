const express = require('express');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { requireSignin, adminMiddleware } = require('../common-middleware/middleware');
const { createProduct } = require('../controller/product');

//the disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
//router.get('/category/getcategories', getCategories);

module.exports = router;