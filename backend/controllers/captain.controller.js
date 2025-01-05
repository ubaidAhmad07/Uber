const captainModel = require('../models/captain.model')
const { validationResult } = require('express-validator')
const captainService = require('../services/captain.service')

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
