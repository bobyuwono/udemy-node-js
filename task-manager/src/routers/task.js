const express = require('express');
const { update } = require('../models/task');
const auth = require('../middleware/auth');
const Task = require('../models/task');
const router = new express.Router()

router.post('/tasks', auth, async function (req, res) {
    var task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//mendapatkan Task by ID
router.get('/tasks/:id',auth, async function (req, res) {
    var _id = req.params.id
    try {
        const task = await Task.findOne({_id}).populate('owner','-_id name age')
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send
    }

})

//menampilkan seluruh task milik seorang user
router.get('/tasks/me', auth, async function (req, res) {
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