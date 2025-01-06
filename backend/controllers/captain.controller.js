const captainModel = require('../models/captain.model')
const { validationResult } = require('express-validator')
const captainService = require('../services/captain.service')
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.registerCaptain = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors: validationResult(req).array()})
    }
    const {fullName, email, password, vehicle} = req.body

    const captainExists = await captainModel.findOne({email})

    if(captainExists) return res.status(400).json({error: 'Captain already exists'})

    const hashedPassword = await captainModel.hashPassword(password)


    const captain = await captainService.createCaptain({
        firstName : fullName.firstName ,
        lastName : fullName.lastName ,
        email, 
        password : hashedPassword,  
        color : vehicle.color,
        vehicleType : vehicle.vehicleType,
        plate : vehicle.plate,
        capacity : vehicle.capacity,
    })

    const token = captain.generateAuthToken()

    res.status(201).json({token,captain})
}

module.exports.loginCaptain = async (req,res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors: validationResult(req).array()})
    }

    const {email, password} = req.body

    const captain = await captainModel.findOne({email}).select('+password')

    if(!captain) return res.status(400).json({error: 'Invalid email or password'})

    const validPassword = await captain.comparePassword(password)

    if(!validPassword) return res.status(400).json({error: 'Invalid email or password'})

    const token = captain.generateAuthToken()

    res.cookie('token', token)

    res.status(200).json({token, captain})
}

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json(req.captain)
}

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    await blacklistTokenModel.create({token})
    res.clearCookie('token')

    res.status(200).json({message: 'Logged out successfully'})
}