const userModel = require('../models/user.model')  
const { validationResult } = require('express-validator')
const userService = require('../services/user.service')


module.exports.registerUser = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors: validationResult(req).array()})
    }
    const {fullName, email, password} = req.body

    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstName : fullName.firstName ,
        lastName : fullName.lastName ,
        email, 
        password: hashedPassword
    })

    const token = user.generateAuthToken()

    res.status(201).json({token,user})
}