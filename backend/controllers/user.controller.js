const userModel = require('../models/user.model')  
const { validationResult } = require('express-validator')
const userService = require('../services/user.service')
const blacklistTokenModel = require('../models/blacklistToken.model')


module.exports.registerUser = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors: validationResult(req).array()})
    }
    const {fullName, email, password} = req.body

    const userExists = await userModel.findOne({email})

    if(userExists) return res.status(400).json({error: 'User already exists'})

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

module.exports.loginUser = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors: validationResult(req).array()})
    }
    const {email, password} = req.body

    const user = await userModel.findOne({email}).select('+password')

    if(!user) return res.status(401).json({error: 'Invalid email or password'})

    const isPasswordValid = await user.comparePassword(password)

    if(!isPasswordValid) return res.status(401).json({error: 'Invalid email or password'})

    const token = user.generateAuthToken()

    res.cookie('token', token)

    res.status(200).json({token,user})

}

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]

    await blacklistTokenModel.create({token})

    res.clearCookie('token')

    res.status(200).json({message: 'Logged out successfully'})
}
