const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signin', authController.signin);

router.post('/postGetSignup', authController.postGetSignup);

router.post('/signup', authController.signupAdmin);

module.exports = router;