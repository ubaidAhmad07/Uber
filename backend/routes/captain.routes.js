const express = require("express")
const router = express.Router()
const captainController = require('../controllers/captain.controller')
const { body } = require('express-validator')
const middleware = require('../middlewares/auth.middleware')


router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastName').isLength({min: 3}).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
] ,
    captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
    captainController.loginCaptain
)

router.get('/profile', 
    middleware.authCaptain, captainController.getCaptainProfile
)

router.get('/logout', 
    middleware.authCaptain, captainController.logoutCaptain
)

module.exports = router;