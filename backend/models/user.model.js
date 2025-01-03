const mongoose = require('mongoose')
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength : [3, 'Minimum length is 3 characters']
        },
        lastName: {
            type: String,
            minlength : [3, 'Minimum length is 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength : [5, 'Minimum length is 5 characters']
    },
    password: {
        type: String,
        required: true,
        select : false,
    },
    socketId: {
        type: String
    },
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    return token
}

userSchema.methods.comparePassword = async function(enteredPassword){  
    return await bycrpt.compare(enteredPassword, this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bycrpt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel

