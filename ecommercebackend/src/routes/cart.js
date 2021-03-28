const express = require('express');
const router = express.Router();
const { requireSignin, userMiddleware } = require('../common-middleware/middleware');
const { addToCart } = require('../controller/cart');

router.post('/user/addtocart', requireSignin, userMiddleware, addToCart);

module.exports = router;