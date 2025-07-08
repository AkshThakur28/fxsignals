const express = require('express');
const router = express.Router();
const authController = require('../../controllers/admin/authController');  

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/forgot-password', authController.requestPasswordReset);

router.post('/verify-otp', authController.verifyOTP);

router.post('/reset-password', authController.resetPassword);

router.get('/logout', authController.logout);

router.get('/me', authController.me);

module.exports = router;

