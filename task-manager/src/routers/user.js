const express =require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async function (req, res) {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
 
//login using custom scheme method
router.post('/users/login', async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send(e);
    }  
})  

// function untuk get semua user
router.get('/users', async function (req, res) {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }

})

//function untuk get Users by Id
router.get('/users/:id', async function (req, res) {
    var _id = req.params.id

    try {
        const user = await User.findById(_id)
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

})


router.patch('/users/:id', async function(req,res){
    try{
        const updates = Object.keys(req.body)
        const allowedUpdates = ['age', 'name', 'email','password' ]
        const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

        if(!isValidOperation){
            return res.status(404).send({error: 'Updates invalid'})
        }
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update]=req.body[update])
        await user.save()

        if(!user){
            res.status(404).send()
        }else{
            res.send(user)
        }
    }catch(e){
        res.status(500).send({error: 'No updates'})
    }
})

module.exports = router