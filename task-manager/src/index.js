const express = require('express')
require('./db/mongoose')
const app = express()
const User = require('./models/user')
const Task = require('./models/task')
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req,res) => {
    const user = new User(req.body)

    user.save().then( ()=>{
        res.status(201).send(user)
    }).catch((e) =>{
        res.status(400)
        res.send(e)
    })
})

app.post('/task', (req,res) => {
    const task = new Task(req.body)

    task.save().then( ()=>{
        res.status(201).send(task)
    }).catch((e) =>{
        res.status(400).send(e)
    } )
})

// function untuk get semua user
app.get('/users', function (req,res) {
    User.find({}).then((users) => {
        res.send(users)
    } ).catch(e => {} )

})

//function untuk get Users by Id
app.get('/users/:id', function(req,res){
    var id = req.params.id
    User.findById(id).then((users) =>{
        res.send(users)
    } ).catch((e)=>{
        res.status(500).send(e)
    })

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))