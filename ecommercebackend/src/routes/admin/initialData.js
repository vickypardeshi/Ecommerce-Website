const express = require('express');
const { requireSignin, adminMiddleware } = require('../../common-middleware/middleware');
const router = express.Router();
const { initialData } = require('../../controller/admin/initialData');

router.post('/initialdata', requireSignin, adminMiddleware, initialData);

module.exports = router;