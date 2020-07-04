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
    }
})

const Task = mongoose.model('Task', taskScheme)
module.exports = Task