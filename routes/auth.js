const express = require('express');
const authSignup = require('../controllers/auth');
const validator = require('../validator');
const router = express.Router();

router.post('/signup', validator.userSignupValidator ,authSignup.signup);


module.exports = router;
