const express = require('express');
const router = express.Router();
const { signup, signin, requireSignin } = require('../../controller/admin/auth');

router.post('/admin/signin', signin);
router.post('/admin/signup', signup);



module.exports = router;