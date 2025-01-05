const captainModel = require('../models/captain.model')


module.exports.createCaptain = async (
    {firstName,lastName, email, password, color, vehicleType, plate, capacity}
) => {
    if(!firstName || !email || !password || !color || !vehicleType || !plate || !capacity){
        throw new Error('All fields are required')
    }
    const captain = captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email, 
        password,
        vehicle: {
            color,
            vehicleType,
            plate,
            capacity
        }
    })

    return captain
}