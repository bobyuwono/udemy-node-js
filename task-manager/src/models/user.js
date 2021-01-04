const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const saltRounds= 8;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true, 
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }
})

userSchema.statics.findByCredentials = async function (email,password) {
    const user = await User.findOne({email});
    //if there is no user
    if(!user){
        throw new Error ('Unable to login');
    }
    //if there is a user wiuth provided email
    const isMatch = await bcrypt.compare(password, user.password);
    //if it's not a match
    if(!isMatch){
        throw new Error('Unable to login');
    }
    //if it's a match
    return user;
}

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password  = await bcrypt.hash(this.password, saltRounds);
    }
    next();
})

const User = mongoose.model('User', userSchema)
module.exports = User