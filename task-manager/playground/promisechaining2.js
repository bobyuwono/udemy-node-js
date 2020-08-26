const mongoose = require('mongoose')
// require ('../src/db/mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')

// remove task by given id
// get and print total number of incomplete task

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser:true,
    useUnifiedTopology: true})


Task.findByIdAndDelete('5eff033af4a46a3dcc1f021d').then( (query_deleted)=>{
    console.log('deleted')
    return Task.countDocuments( {completed:true})
}).then((count_result)=>{
    console.log(count_result)

} ).catch( (e) =>{
    console.log(e)
})

mongoose.connection.close()