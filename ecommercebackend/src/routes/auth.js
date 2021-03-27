const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controller/auth');
const {
    validateSignupRequest, isRequestValidated, validateSigninRequest 
} = require('../validator/auth');

router.post('/signin', validateSigninRequest, isRequestValidated ,signin);
router.post('/signup', validateSignupRequest, isRequestValidated ,signup);


module.exports = router;