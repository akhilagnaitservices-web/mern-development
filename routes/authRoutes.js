const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth/register
router.post('/register', authController.register);

// POST /auth/signin
router.post('/signin', authController.signin);

// POST /auth/logout
router.post('/logout', authController.logout);

// POST /auth/forgot-password
router.post('/forgot-password', authController.forgotPassword);

// GET  /auth/reset-password?token=xxx  (email link lands here)
router.get('/reset-password', authController.validateResetToken);

// POST /auth/reset-password
router.post('/reset-password', authController.resetPassword);

// GET  /auth/session  (check if logged in)
router.get('/session', authController.checkSession);

module.exports = router;
