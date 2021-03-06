const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds= 8;
const jwt= require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks_list', {
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})


userSchema.methods.generateAuthToken = async function() {
    //1. generate new token
    //2. store in database,
    //3. return from function
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'hshshs')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

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



//hiding private data
userSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password  = await bcrypt.hash(user.password, saltRounds);
    }
    next();
})

const User = mongoose.model('User', userSchema)
module.exports = User