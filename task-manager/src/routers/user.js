const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async function (req, res) {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//login using custom scheme method
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e);
    }
})

//untuk logout current token (simulasi logout current account)
router.post('/users/logout', auth, async (req, res) => {
    //yang diperlukan: token dari specific session
    //cara kerjanya: buang token yang saat ini dipake dari list token keseluruhan
    //menggunakan fitur array.filter untuk membuang token yang lengthnya < 0
    try {
        req.user.tokens = req.user.tokens.filter((tokens) => {
            return tokens.token !== req.token
        })
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500)
    }
})

//untuk logout semua token (simulasi logout semua account)
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokens) => { tokens.token.length < 0 })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500)
    }
})

//get user itself data
router.get('/users/me', auth, async function (req, res) {
    res.send(req.user);
})


router.patch('/users/:id', async function (req, res) {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['age', 'name', 'email', 'password']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(404).send({ error: 'Updates invalid' })
        }
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    } catch (e) {
        res.status(500).send({ error: 'No updates' })
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        
        res.send(req.user)
    } catch (error) {
        res.status(500)
    }
})

module.exports = router