const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../common-middleware/middleware');
const { addCategory, getCategories } = require('../controller/category');

router.post('/category/create', requireSignin, adminMiddleware, addCategory);
router.get('/category/getcategories', getCategories);

module.exports = router;