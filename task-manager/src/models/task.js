const mongoose = require('mongoose')
const validator = require('validator')

const taskScheme = new mongoose.Schema({
    description: {
        type: String,
        required:true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please fill the description')
            }
        } 
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

taskScheme.pre('save', function(next){
    console.log("task pre succeed")
    next()
} )

const Task = mongoose.model('Task', taskScheme)
module.exports = Task