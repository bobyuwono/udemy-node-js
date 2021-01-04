const express = require('express');
const { update } = require('../models/task');
const Task = require('../models/task');
const router = new express.Router()

router.post('/tasks', async function (req, res) {
    var task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    // task.save().then( ()=>{
    //     res.status(201).send(task)
    // }).catch((e) =>{
    //     res.status(400).send(e)
    // } )
})

//mendapatkan Task by ID
router.get('/tasks/:id', async function (req, res) {
    var _id = req.params.id
    try {
        const task = await Task.findById(_id)
        res.send(task)
    } catch (e) {
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
router.get('/tasks', async function (req, res) {
    try {
        tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/tasks/:id', async function (req, res) {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        
        const task  = await Task.findById(req.params.id);
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        
        //if no task found
        if (!task) {
            return res.status(404).send({ error: 'task id unavailable' })
        }
        //if update went well
        res.send(task)
    } catch (e) {
        //if update went poorly
        res.status(500).send(e)
    }
})

module.exports = router