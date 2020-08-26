const express = require('express')
require('./db/mongoose')
const app = express()
const User = require('./models/user')
const Task = require('./models/task')
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async function (req,res) {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})


// function untuk get semua user
app.get('/users', async function (req,res) {
    
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }

})

//function untuk get Users by Id
app.get('/users/:id', async function(req,res){
    var _id = req.params.id
    
    try{
        const user = await User.findById(_id)
        res.send(user)
    }catch(e) {
        res.status(500).send()
    }

})

app.post('/tasks', async function (req,res) {
    var task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    // task.save().then( ()=>{
    //     res.status(201).send(task)
    // }).catch((e) =>{
    //     res.status(400).send(e)
    // } )
})

//mendapatkan Task by ID
app.get('/tasks/:id' ,async function (req,res) {
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        res.send(task)
    }catch(e){
        res.status(500).send
    }
    // id = req.params.id
    // Task.findById(id).then((task)=>{
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

//menampilkan seluruh Task
app.get('/tasks', async function(req,res){
    try{
        tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})


app.patch('/tasks')
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))