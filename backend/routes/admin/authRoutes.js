const express = require('express');
const router = express.Router();
const authController = require('../../controllers/admin/authController');  

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/forgot_password', authController.requestPasswordReset);

router.post('/verify_otp', authController.verifyOTP);

router.post('/reset_password', authController.resetPassword);

router.get('/logout', authController.logout);

router.get('/me', authController.me);

module.exports = router;

