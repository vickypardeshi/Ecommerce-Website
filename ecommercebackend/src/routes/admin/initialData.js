const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../../common-middleware/middleware');
const { initialData } = require('../../controller/admin/initialData');

router.post('/initialdata', requireSignin, adminMiddleware, initialData);

module.exports = router;