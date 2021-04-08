const express = require('express');
const router = express.Router();
const { initialData } = require('../../controller/admin/initialData');

router.post('/initialdata', initialData);

module.exports = router;