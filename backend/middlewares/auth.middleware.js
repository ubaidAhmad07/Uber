const userModel = require('../models/user.model')
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model')

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if(!token) return res.status(401).json({error: 'Unauthorized'})

    const blacklistToken = await blacklistTokenModel.findOne({token: token})

    if(blacklistToken) return res.status(401).json({error: 'Unauthorized'})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel.findById(decoded._id)

        return next()

    } catch (error) {
        return res.status(401).json({error: 'Unauthorized'})
    }
}

module.exports.authCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if(!token) return res.status(401).json({error: 'Unauthorized'})

    const blacklistToken = await blacklistTokenModel.findOne({token: token})

    if(blacklistToken) return res.status(401).json({error: 'Unauthorized'})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.captain = await captainModel.findById(decoded._id)

        return next()

    } catch (error) {
        return res.status(401).json({error: 'Unauthorized'})
    }
}