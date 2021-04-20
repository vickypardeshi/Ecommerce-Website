const express = require('express');
const router = express.Router();
const {
    upload, requireSignin, 
    adminMiddleware,
} = require('../../common-middleware/middleware');
const {
    createPage, getPage,
} = require('../../controller/admin/page');

router.post('/page/create', requireSignin, adminMiddleware, upload.fields([
    { name: 'banners'},
    { name: 'products'}
]), createPage)

router.get('/page/:category/:type', getPage);

module.exports = router;
