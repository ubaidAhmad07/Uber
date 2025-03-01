const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { body } = require('express-validator');
const middleware  = require('../middlewares/auth.middleware');

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
    userController.registerUser
);
router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
    userController.loginUser
);
router.get('/profile', middleware.authUser , userController.getUserProfile);

router.get('/logout', middleware.authUser, userController.logoutUser);

module.exports = router;    