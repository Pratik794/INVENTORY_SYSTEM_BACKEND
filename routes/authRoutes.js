const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Registration Route
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('confirmPassword').notEmpty().withMessage('Confirm password is required'),
    body('phone')
      .isMobilePhone()
      .withMessage('Invalid phone number'),
    body('agreedToTerms').equals('true').withMessage('You must agree to the terms'),
  ],
  register
);

// Login Route
router.post(
  '/login',
  [
    body('emailOrUsername').notEmpty().withMessage('Email or Username is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  login
);

module.exports = router;
